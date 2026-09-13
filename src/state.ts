import {
  DEFAULT_CONTRACTORS,
  DEFAULT_DEPARTMENTS,
  DEFAULT_DESIGNATIONS,
  MANUFACTURING_UNITS,
} from './constants';
import {
  DUMMY_CONTRACTORS,
  DUMMY_DEPARTMENTS,
  DUMMY_DESIGNATIONS,
  generateDummyDailyAllocations,
  generateDummyRoster,
} from './dummyData';
import {
  loadCollapsedSections,
  loadContractors,
  loadDailyRecord,
  loadDepartments,
  loadDesignations,
  loadRoster,
  saveCollapsedSections,
  saveContractors,
  saveDailyRecord,
  saveDepartments,
  saveDesignations,
  saveRoster,
} from './storage';
import type {
  AppState,
  AppTab,
  Category,
  DailyAllocation,
  ManufacturingUnit,
  Worker,
  WorkerStatus,
} from './types';
import { generateCsvString, parseSimpleCsv, shiftDate, todayStr, uid } from './utils';

type Listener = () => void;

class Store {
  private state: AppState = {
    roster: [],
    contractors: [...DEFAULT_CONTRACTORS],
    departments: [...DEFAULT_DEPARTMENTS],
    designations: [...DEFAULT_DESIGNATIONS],
    currentDate: todayStr(),
    tab: 'today',
    searchQuery: '',
    collapsedSections: {},
    rosterStatusFilter: 'active',
    dailyRecord: {
      date: todayStr(),
      allocations: {},
      verifiedBy: {},
    },
    editingWorker: null,
    quickAdjustWorkerId: null,
    activeModal: null,
  };

  private listeners: Set<Listener> = new Set();

  getState(): AppState {
    return this.state;
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  async init(): Promise<void> {
    const today = todayStr();
    this.state.currentDate = today;

    const [roster, contractors, departments, designations, collapsed, dailyRecord] =
      await Promise.all([
        loadRoster(),
        loadContractors(),
        loadDepartments(),
        loadDesignations(),
        loadCollapsedSections(),
        loadDailyRecord(today),
      ]);

    // If roster is completely empty (first launch / fresh app), auto-seed dummy data
    if (roster.length === 0) {
      await this.loadDemoData();
      return;
    }

    this.state.roster = roster;
    this.state.contractors = contractors;
    this.state.departments = departments;
    this.state.designations = designations;
    this.state.collapsedSections = collapsed;
    this.state.dailyRecord = dailyRecord;
    this.notify();
  }

  async loadDemoData(): Promise<void> {
    const dummyRoster = generateDummyRoster();
    const dummyAllocations = generateDummyDailyAllocations();
    const today = this.state.currentDate || todayStr();

    this.state.roster = dummyRoster;
    this.state.contractors = [...DUMMY_CONTRACTORS];
    this.state.departments = [...DUMMY_DEPARTMENTS];
    this.state.designations = [...DUMMY_DESIGNATIONS];
    this.state.dailyRecord = {
      date: today,
      allocations: dummyAllocations,
      verifiedBy: {
        Quality: 'Pooja Kulkarni',
        Welding: 'Rajesh Deshmukh',
      },
    };

    await Promise.all([
      saveRoster(this.state.roster),
      saveContractors(this.state.contractors),
      saveDepartments(this.state.departments),
      saveDesignations(this.state.designations),
      saveDailyRecord(today, this.state.dailyRecord),
    ]);

    this.notify();
  }


  setTab(tab: AppTab): void {
    this.state.tab = tab;
    this.state.editingWorker = null;
    this.state.quickAdjustWorkerId = null;
    this.state.activeModal = null;
    this.notify();
  }

  setSearchQuery(query: string): void {
    this.state.searchQuery = query;
    this.notify();
  }

  async changeDate(offsetDays: number): Promise<void> {
    const newDate = shiftDate(this.state.currentDate, offsetDays);
    await this.setDate(newDate);
  }

  async setDate(newDate: string): Promise<void> {
    this.state.currentDate = newDate;
    this.state.quickAdjustWorkerId = null;
    const dailyRecord = await loadDailyRecord(newDate);
    this.state.dailyRecord = dailyRecord;
    this.notify();
  }

  async toggleSectionCollapse(sectionKey: string): Promise<void> {
    const isCollapsed = Boolean(this.state.collapsedSections[sectionKey]);
    this.state.collapsedSections[sectionKey] = !isCollapsed;
    this.notify();
    await saveCollapsedSections(this.state.collapsedSections);
  }

  setRosterStatusFilter(status: WorkerStatus): void {
    this.state.rosterStatusFilter = status;
    this.notify();
  }

  // Attendance Toggle (Roll-Call)
  async togglePresent(workerId: string): Promise<{ allowed: boolean; message?: string }> {
    const worker = this.state.roster.find((w) => w.id === workerId);
    if (!worker) return { allowed: false, message: 'Worker not found' };

    if (worker.status === 'debarred') {
      return {
        allowed: false,
        message: `${worker.name} is DEBARRED and barred from factory floor!`,
      };
    }

    const currentAlloc = this.state.dailyRecord.allocations[workerId];
    const isCurrentlyPresent = currentAlloc ? currentAlloc.present : false;

    if (!currentAlloc) {
      // Create initial daily allocation
      this.state.dailyRecord.allocations[workerId] = {
        present: true,
        unit: worker.unit || 'UNIT I',
        department: worker.department || 'Welding',
        subCategory: worker.subCategory || (worker.category === 'labor' ? 'Helper' : undefined),
        shift: 'Day',
        supervisor: '',
      };
    } else {
      currentAlloc.present = !isCurrentlyPresent;
    }

    this.notify();
    await saveDailyRecord(this.state.currentDate, this.state.dailyRecord);
    return { allowed: true };
  }

  // Quick Adjust Drawer (On-Field)
  openQuickAdjust(workerId: string): void {
    const worker = this.state.roster.find((w) => w.id === workerId);
    if (!worker) return;

    // Ensure allocation entry exists so user can adjust before or after marking
    if (!this.state.dailyRecord.allocations[workerId]) {
      this.state.dailyRecord.allocations[workerId] = {
        present: false,
        unit: worker.unit || 'UNIT I',
        department: worker.department || 'Welding',
        subCategory: worker.subCategory || 'Helper',
        shift: 'Day',
        supervisor: '',
      };
    }

    this.state.quickAdjustWorkerId = workerId;
    this.notify();
  }

  closeQuickAdjust(): void {
    this.state.quickAdjustWorkerId = null;
    this.notify();
  }

  async saveQuickAdjust(
    workerId: string,
    updates: Partial<DailyAllocation>
  ): Promise<void> {
    const alloc = this.state.dailyRecord.allocations[workerId];
    if (alloc) {
      Object.assign(alloc, updates);
      this.state.quickAdjustWorkerId = null;
      this.notify();
      await saveDailyRecord(this.state.currentDate, this.state.dailyRecord);
    }
  }

  // Verification
  async verifyDepartment(department: string, staffName: string): Promise<void> {
    if (!this.state.dailyRecord.verifiedBy) {
      this.state.dailyRecord.verifiedBy = {};
    }
    this.state.dailyRecord.verifiedBy[department] = staffName;
    this.notify();
    await saveDailyRecord(this.state.currentDate, this.state.dailyRecord);
  }

  async unverifyDepartment(department: string): Promise<void> {
    if (this.state.dailyRecord.verifiedBy) {
      delete this.state.dailyRecord.verifiedBy[department];
      this.notify();
      await saveDailyRecord(this.state.currentDate, this.state.dailyRecord);
    }
  }

  // Modals
  openModal(modal: 'contractors' | 'departments' | 'designations' | 'bulk-import' | 'roster-export-import'): void {
    this.state.activeModal = modal;
    this.notify();
  }

  closeModal(): void {
    this.state.activeModal = null;
    this.notify();
  }

  // Contractor Management
  async addContractor(name: string): Promise<{ success: boolean; error?: string }> {
    const trimmed = name.trim();
    if (!trimmed) return { success: false, error: 'Contractor name cannot be empty' };
    if (this.state.contractors.includes(trimmed)) {
      return { success: false, error: `Contractor "${trimmed}" already exists` };
    }

    this.state.contractors.push(trimmed);
    this.notify();
    await saveContractors(this.state.contractors);
    return { success: true };
  }

  async editContractor(oldName: string, newName: string): Promise<{ success: boolean; error?: string }> {
    const trimmed = newName.trim();
    if (!trimmed) return { success: false, error: 'Contractor name cannot be empty' };
    if (trimmed === oldName) return { success: true };
    if (this.state.contractors.includes(trimmed)) {
      return { success: false, error: `Contractor "${trimmed}" already exists` };
    }

    const idx = this.state.contractors.indexOf(oldName);
    if (idx < 0) return { success: false, error: `Contractor "${oldName}" not found` };

    this.state.contractors[idx] = trimmed;

    // Cascade update all assigned workers
    let updatedWorkers = 0;
    for (const w of this.state.roster) {
      if (w.contractor === oldName) {
        w.contractor = trimmed;
        updatedWorkers++;
      }
    }

    this.notify();
    await Promise.all([
      saveContractors(this.state.contractors),
      saveRoster(this.state.roster),
    ]);
    return { success: true };
  }

  async deleteContractor(name: string): Promise<{ success: boolean; inUseCount: number }> {
    const inUseCount = this.state.roster.filter((w) => w.contractor === name).length;
    if (inUseCount > 0) {
      return { success: false, inUseCount };
    }
    this.state.contractors = this.state.contractors.filter((c) => c !== name);
    this.notify();
    await saveContractors(this.state.contractors);
    return { success: true, inUseCount: 0 };
  }

  // Department Management
  async addDepartment(name: string): Promise<{ success: boolean; error?: string }> {
    const trimmed = name.trim();
    if (!trimmed) return { success: false, error: 'Department name cannot be empty' };
    if (this.state.departments.includes(trimmed)) {
      return { success: false, error: `Department "${trimmed}" already exists` };
    }

    this.state.departments.push(trimmed);
    this.notify();
    await saveDepartments(this.state.departments);
    return { success: true };
  }

  async editDepartment(oldName: string, newName: string): Promise<{ success: boolean; error?: string }> {
    const trimmed = newName.trim();
    if (!trimmed) return { success: false, error: 'Department name cannot be empty' };
    if (trimmed === oldName) return { success: true };
    if (this.state.departments.includes(trimmed)) {
      return { success: false, error: `Department "${trimmed}" already exists` };
    }

    const idx = this.state.departments.indexOf(oldName);
    if (idx < 0) return { success: false, error: `Department "${oldName}" not found` };

    this.state.departments[idx] = trimmed;

    // Cascade update all assigned workers in library
    for (const w of this.state.roster) {
      if (w.department === oldName) {
        w.department = trimmed;
      }
    }

    // Cascade update daily allocations
    for (const alloc of Object.values(this.state.dailyRecord.allocations)) {
      if (alloc.department === oldName) alloc.department = trimmed;
      if (alloc.work === oldName) alloc.work = trimmed;
    }

    // Cascade update verification map
    if (this.state.dailyRecord.verifiedBy && this.state.dailyRecord.verifiedBy[oldName]) {
      this.state.dailyRecord.verifiedBy[trimmed] = this.state.dailyRecord.verifiedBy[oldName];
      delete this.state.dailyRecord.verifiedBy[oldName];
    }

    this.notify();
    await Promise.all([
      saveDepartments(this.state.departments),
      saveRoster(this.state.roster),
      saveDailyRecord(this.state.currentDate, this.state.dailyRecord),
    ]);
    return { success: true };
  }

  async deleteDepartment(name: string): Promise<{ success: boolean; inUseCount: number }> {
    const inUseCount = this.state.roster.filter((w) => w.department === name).length;
    if (inUseCount > 0) {
      return { success: false, inUseCount };
    }
    this.state.departments = this.state.departments.filter((d) => d !== name);
    this.notify();
    await saveDepartments(this.state.departments);
    return { success: true, inUseCount: 0 };
  }

  // Designation Management
  async addDesignation(name: string): Promise<{ success: boolean; error?: string }> {
    const trimmed = name.trim();
    if (!trimmed) return { success: false, error: 'Designation name cannot be empty' };
    if (this.state.designations.includes(trimmed)) {
      return { success: false, error: `Designation "${trimmed}" already exists` };
    }

    this.state.designations.push(trimmed);
    this.notify();
    await saveDesignations(this.state.designations);
    return { success: true };
  }

  async editDesignation(oldName: string, newName: string): Promise<{ success: boolean; error?: string }> {
    const trimmed = newName.trim();
    if (!trimmed) return { success: false, error: 'Designation name cannot be empty' };
    if (trimmed === oldName) return { success: true };
    if (this.state.designations.includes(trimmed)) {
      return { success: false, error: `Designation "${trimmed}" already exists` };
    }

    const idx = this.state.designations.indexOf(oldName);
    if (idx < 0) return { success: false, error: `Designation "${oldName}" not found` };

    this.state.designations[idx] = trimmed;

    // Cascade update all assigned staff workers
    for (const w of this.state.roster) {
      if (w.designation === oldName) {
        w.designation = trimmed;
      }
    }

    this.notify();
    await Promise.all([
      saveDesignations(this.state.designations),
      saveRoster(this.state.roster),
    ]);
    return { success: true };
  }

  async deleteDesignation(name: string): Promise<{ success: boolean; inUseCount: number }> {
    const inUseCount = this.state.roster.filter((w) => w.designation === name).length;
    if (inUseCount > 0) {
      return { success: false, inUseCount };
    }
    this.state.designations = this.state.designations.filter((d) => d !== name);
    this.notify();
    await saveDesignations(this.state.designations);
    return { success: true, inUseCount: 0 };
  }

  // Worker Form
  startAddWorker(category: Category): void {
    this.state.editingWorker = {
      name: '',
      category,
      contractor: category === 'labor' ? (this.state.contractors[0] || 'Default Contractor') : undefined,
      department: this.state.departments[0] || 'Welding',
      designation: category === 'staff' ? (this.state.designations[0] || 'Staff Member') : undefined,
      subCategory: category === 'labor' ? 'Helper' : undefined,
      unit: 'UNIT I',
      status: 'active',
      createdAt: todayStr(),
    };
    this.notify();
  }


  startEditWorker(worker: Worker): void {
    this.state.editingWorker = { ...worker };
    this.notify();
  }

  cancelWorkerForm(): void {
    this.state.editingWorker = null;
    this.notify();
  }

  async saveWorkerForm(data: Partial<Worker>): Promise<{ success: boolean; error?: string }> {
    const draft = this.state.editingWorker;
    if (!draft) return { success: false, error: 'No draft' };

    const name = (data.name !== undefined ? data.name : draft.name)?.trim();
    if (!name) {
      return { success: false, error: 'Name is required' };
    }

    const worker: Worker = {
      id: draft.id || uid(),
      name,
      category: draft.category || 'labor',
      contractor: draft.category === 'labor' ? data.contractor || draft.contractor || this.state.contractors[0] : undefined,
      department: data.department || draft.department || 'Welding',
      designation: draft.category === 'staff' ? data.designation || draft.designation || 'Staff Member' : undefined,
      subCategory: draft.category === 'labor' ? data.subCategory || draft.subCategory || 'Helper' : undefined,
      unit: data.unit || draft.unit || 'UNIT I',
      status: data.status || draft.status || 'active',
      createdAt: draft.createdAt || todayStr(),
    };

    if (draft.id) {
      const idx = this.state.roster.findIndex((w) => w.id === draft.id);
      if (idx >= 0) this.state.roster[idx] = worker;
    } else {
      this.state.roster.push(worker);
    }

    this.state.editingWorker = null;
    this.notify();
    await saveRoster(this.state.roster);
    return { success: true };
  }

  async deleteWorker(workerId: string): Promise<void> {
    this.state.roster = this.state.roster.filter((w) => w.id !== workerId);
    if (this.state.dailyRecord.allocations[workerId]) {
      delete this.state.dailyRecord.allocations[workerId];
      await saveDailyRecord(this.state.currentDate, this.state.dailyRecord);
    }
    this.notify();
    await saveRoster(this.state.roster);
  }

  // Bulk Import
  async bulkImportNames(
    rawText: string,
    category: Category,
    contractor?: string,
    unit: ManufacturingUnit = 'UNIT I',
    subCategory: string = 'Helper',
    department: string = 'Welding'
  ): Promise<number> {
    const names = rawText
      .split(/\r?\n/)
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    let count = 0;
    const now = todayStr();

    for (const name of names) {
      const newWorker: Worker = {
        id: uid(),
        name,
        category,
        contractor: category === 'labor' ? contractor || this.state.contractors[0] : undefined,
        department: category === 'staff' ? department : department,
        designation: category === 'staff' ? 'Staff Member' : undefined,
        subCategory: category === 'labor' ? subCategory : undefined,
        unit,
        status: 'active',
        createdAt: now,
      };
      this.state.roster.push(newWorker);
      count++;
    }

    if (count > 0) {
      this.notify();
      await saveRoster(this.state.roster);
    }
    return count;
  }

  // Roster CSV / JSON Export & Import
  exportRosterCsv(): string {
    const headers = [
      'ID',
      'Name',
      'Category',
      'Contractor',
      'Department',
      'Designation',
      'SubCategory',
      'Unit',
      'Status',
      'CreatedAt',
    ];
    const rows = this.state.roster.map((w) => [
      w.id,
      w.name,
      w.category,
      w.contractor || '',
      w.department || '',
      w.designation || '',
      w.subCategory || '',
      w.unit,
      w.status,
      w.createdAt,
    ]);
    return generateCsvString(headers, rows);
  }

  exportRosterJson(): string {
    return JSON.stringify(this.state.roster, null, 2);
  }

  async importRosterJson(jsonText: string): Promise<{ success: boolean; count: number; error?: string }> {
    try {
      const list = JSON.parse(jsonText);
      if (!Array.isArray(list)) return { success: false, count: 0, error: 'JSON is not an array' };

      let count = 0;
      for (const item of list) {
        if (!item.name) continue;
        const existingIdx = this.state.roster.findIndex((w) => w.id === item.id);
        const worker: Worker = {
          id: item.id || uid(),
          name: item.name,
          category: item.category || 'labor',
          contractor: item.contractor,
          department: item.department || 'Welding',
          designation: item.designation,
          subCategory: item.subCategory || 'Helper',
          unit: item.unit || 'UNIT I',
          status: item.status || 'active',
          createdAt: item.createdAt || todayStr(),
        };

        if (existingIdx >= 0) {
          this.state.roster[existingIdx] = worker;
        } else {
          this.state.roster.push(worker);
        }
        count++;
      }

      this.notify();
      await saveRoster(this.state.roster);
      return { success: true, count };
    } catch (e: any) {
      return { success: false, count: 0, error: e.message };
    }
  }

  async importRosterCsv(csvText: string): Promise<{ success: boolean; count: number; error?: string }> {
    try {
      const rows = parseSimpleCsv(csvText);
      if (rows.length < 2) return { success: false, count: 0, error: 'CSV has no data rows' };

      const headers = rows[0].map((h) => h.toLowerCase());
      const nameIdx = headers.indexOf('name');
      if (nameIdx < 0) return { success: false, count: 0, error: 'Missing "Name" column in CSV' };

      const catIdx = headers.indexOf('category');
      const contractorIdx = headers.indexOf('contractor');
      const deptIdx = headers.indexOf('department');
      const desigIdx = headers.indexOf('designation');
      const subCatIdx = headers.indexOf('subcategory');
      const unitIdx = headers.indexOf('unit');
      const statusIdx = headers.indexOf('status');

      let count = 0;
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const name = row[nameIdx];
        if (!name) continue;

        const category = (catIdx >= 0 && row[catIdx]?.toLowerCase() === 'staff') ? 'staff' : 'labor';
        const contractor = contractorIdx >= 0 ? row[contractorIdx] : undefined;
        const department = deptIdx >= 0 ? row[deptIdx] : 'Welding';
        const designation = desigIdx >= 0 ? row[desigIdx] : undefined;
        const subCategory = subCatIdx >= 0 ? row[subCatIdx] : 'Helper';
        const unit = (unitIdx >= 0 && MANUFACTURING_UNITS.includes(row[unitIdx] as any)) ? row[unitIdx] as ManufacturingUnit : 'UNIT I';
        const status = (statusIdx >= 0 && ['active', 'inactive', 'debarred'].includes(row[statusIdx]?.toLowerCase())) ? row[statusIdx].toLowerCase() as WorkerStatus : 'active';

        const worker: Worker = {
          id: uid(),
          name,
          category,
          contractor: category === 'labor' ? (contractor || this.state.contractors[0]) : undefined,
          department,
          designation,
          subCategory: category === 'labor' ? subCategory : undefined,
          unit,
          status,
          createdAt: todayStr(),
        };

        this.state.roster.push(worker);
        count++;
      }

      this.notify();
      await saveRoster(this.state.roster);
      return { success: true, count };
    } catch (e: any) {
      return { success: false, count: 0, error: e.message };
    }
  }
}

export const store = new Store();
