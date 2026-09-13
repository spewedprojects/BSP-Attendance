import { webAlert, webConfirm, webPrompt } from './services/dialogService';
import { saveToDownloads, shareReportText } from './services/fileService';
import { showInAppNotification } from './services/notificationService';
import { store } from './state';
import './style.css';
import type { AppTab, Category, ManufacturingUnit, Shift, WorkerStatus } from './types';
import { copyTextToClipboard, formatTimeAMPM, todayStr } from './utils';
import {
  buildDetailedCsv,
  buildReportText,
  buildSummaryCsv,
  renderReport,
} from './views/reportView';
import { renderRoster } from './views/rosterView';
import { renderTabs } from './views/tabs';
import { renderToday } from './views/todayView';
import { renderVerification } from './views/verificationView';

const appElement = document.getElementById('app') as HTMLDivElement;
const toastElement = document.getElementById('copiedToast') as HTMLDivElement;

function showToast(message: string, duration = 1800): void {
  if (!toastElement) return;
  toastElement.textContent = message;
  toastElement.classList.add('show');
  setTimeout(() => {
    toastElement.classList.remove('show');
  }, duration);
}

function render(): void {
  const state = store.getState();
  let bodyHtml = '';

  switch (state.tab) {
    case 'today':
      bodyHtml = renderToday(state);
      break;
    case 'verify':
      bodyHtml = renderVerification(state);
      break;
    case 'report':
      bodyHtml = renderReport(state);
      break;
    case 'roster':
      bodyHtml = renderRoster(state);
      break;
    default:
      bodyHtml = renderToday(state);
  }

  appElement.innerHTML = bodyHtml + renderTabs(state.tab);
}

function setupEventHandlers(): void {
  // Input events (search)
  appElement.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    if (target.id === 'todaySearchInput') {
      const input = target as HTMLInputElement;
      store.setSearchQuery(input.value);
    }
  });

  // Change events (hidden date picker)
  appElement.addEventListener('change', async (e: Event) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    if (target.id === 'hiddenDatePicker') {
      const input = target as HTMLInputElement;
      if (input.value) {
        await store.setDate(input.value);
      }
    }
  });

  // Click delegation
  appElement.addEventListener('click', async (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const actionEl = target.closest('[data-action]') as HTMLElement | null;
    if (!actionEl) return;

    const action = actionEl.getAttribute('data-action');
    const id = actionEl.getAttribute('data-id');

    switch (action) {
      // -------------------------------------------------------------
      // Tab Switching
      // -------------------------------------------------------------
      case 'switch-tab': {
        const tab = actionEl.getAttribute('data-tab') as AppTab | null;
        if (tab) store.setTab(tab);
        break;
      }

      // -------------------------------------------------------------
      // Date Navigation
      // -------------------------------------------------------------
      case 'prev-date': {
        await store.changeDate(-1);
        break;
      }

      case 'next-date': {
        await store.changeDate(1);
        break;
      }

      case 'jump-today': {
        await store.setDate(todayStr());
        break;
      }

      case 'trigger-date-picker': {
        const picker = document.getElementById('hiddenDatePicker') as HTMLInputElement | null;
        if (picker && typeof picker.showPicker === 'function') {
          picker.showPicker();
        } else if (picker) {
          picker.focus();
        }
        break;
      }

      // -------------------------------------------------------------
      // Search & Accordions
      // -------------------------------------------------------------
      case 'clear-search': {
        store.setSearchQuery('');
        break;
      }

      case 'toggle-section': {
        const key = actionEl.getAttribute('data-key');
        if (key) await store.toggleSectionCollapse(key);
        break;
      }

      // -------------------------------------------------------------
      // Roll-Call Toggle
      // -------------------------------------------------------------
      case 'toggle-present': {
        if (id) {
          const res = await store.togglePresent(id);
          if (!res.allowed && res.message) {
            await webAlert({
              title: 'Entry Restricted',
              message: res.message,
            });
          }
        }
        break;
      }

      // -------------------------------------------------------------
      // Quick Adjust Drawer (On-Field Daily Adjustments)
      // -------------------------------------------------------------
      case 'open-quick-adjust': {
        if (id) {
          e.stopPropagation();
          store.openQuickAdjust(id);
        }
        break;
      }

      case 'close-quick-adjust': {
        store.closeQuickAdjust();
        break;
      }

      case 'qa-set-shift': {
        const shiftVal = actionEl.getAttribute('data-val') as Shift | null;
        const dayBtn = document.getElementById('qa_shift_day');
        const nightBtn = document.getElementById('qa_shift_night');
        if (shiftVal === 'Day') {
          dayBtn?.classList.add('on');
          nightBtn?.classList.remove('on');
        } else {
          nightBtn?.classList.add('on');
          dayBtn?.classList.remove('on');
        }
        break;
      }

      case 'qa-stamp-time': {
        const timeInput = document.getElementById('qa_check_in') as HTMLInputElement | null;
        if (timeInput) {
          timeInput.value = formatTimeAMPM();
        }
        break;
      }

      case 'qa-save': {
        const workerId = (document.getElementById('qa_worker_id') as HTMLInputElement | null)?.value;
        const dept = (document.getElementById('qa_department') as HTMLSelectElement | null)?.value;
        const unit = (document.getElementById('qa_unit') as HTMLSelectElement | null)?.value as ManufacturingUnit | undefined;
        const shiftVal = document.getElementById('qa_shift_night')?.classList.contains('on') ? 'Night' : 'Day';
        const subCat = (document.getElementById('qa_subcategory') as HTMLSelectElement | null)?.value;
        const sup = (document.getElementById('qa_supervisor') as HTMLInputElement | null)?.value;
        const checkIn = (document.getElementById('qa_check_in') as HTMLInputElement | null)?.value;
        const remarks = (document.getElementById('qa_remarks') as HTMLInputElement | null)?.value;

        if (workerId) {
          await store.saveQuickAdjust(workerId, {
            department: dept,
            work: dept,
            unit,
            shift: shiftVal,
            subCategory: subCat,
            supervisor: sup,
            checkInTime: checkIn,
            remarks,
          });
          showInAppNotification({
            title: 'Adjustments Saved',
            message: 'Daily allocation updated for this worker',
            type: 'success',
            duration: 2000,
          });
        }
        break;
      }

      // -------------------------------------------------------------
      // Verification Tab
      // -------------------------------------------------------------
      case 'confirm-verify-dept': {
        const dept = actionEl.getAttribute('data-dept');
        if (dept) {
          const select = document.getElementById(`sel_verify_${dept}`) as HTMLSelectElement | null;
          const staffName = select ? select.value.trim() : '';
          if (!staffName) {
            await webAlert({
              title: 'Verification Incomplete',
              message: 'Please select a verifying staff member or HOD before signing off.',
            });
            return;
          }
          await store.verifyDepartment(dept, staffName);
          showInAppNotification({
            title: 'Department Verified',
            message: `${dept} signed off by ${staffName}`,
            type: 'success',
          });
        }
        break;
      }

      case 'unverify-dept': {
        const dept = actionEl.getAttribute('data-dept');
        if (dept) {
          await store.unverifyDepartment(dept);
          showInAppNotification({
            title: 'Verification Cleared',
            message: `${dept} verification status reset to pending`,
            type: 'info',
          });
        }
        break;
      }

      // -------------------------------------------------------------
      // Reporting & Exporting
      // -------------------------------------------------------------
      case 'copy-report': {
        const state = store.getState();
        const text = buildReportText(state);
        const copied = await copyTextToClipboard(text);
        if (copied) {
          showInAppNotification({
            title: 'Report Copied',
            message: 'Formatted manpower report copied to clipboard. Ready to paste.',
            type: 'success',
            duration: 2800,
          });
        } else {
          showToast('Copy failed');
        }
        break;
      }

      case 'share-report': {
        const state = store.getState();
        const text = buildReportText(state);
        const shared = await shareReportText(`BSP Metatech Attendance ${state.currentDate}`, text);
        if (!shared) {
          await copyTextToClipboard(text);
          showInAppNotification({
            title: 'Report Copied',
            message: 'Direct share unavailable; text copied to clipboard instead.',
            type: 'info',
            duration: 2800,
          });
        }
        break;
      }

      case 'export-summary-csv': {
        const state = store.getState();
        const csv = buildSummaryCsv(state);
        const filename = `BSP_Summary_${state.currentDate}.csv`;
        const res = await saveToDownloads(filename, csv, 'text/csv');
        showInAppNotification({
          title: 'Export Successful',
          message: res.message,
          type: 'success',
          duration: 3500,
        });
        break;
      }

      case 'export-detailed-csv': {
        const state = store.getState();
        const csv = buildDetailedCsv(state);
        const filename = `BSP_Detailed_${state.currentDate}.csv`;
        const res = await saveToDownloads(filename, csv, 'text/csv');
        showInAppNotification({
          title: 'Export Successful',
          message: res.message,
          type: 'success',
          duration: 3500,
        });
        break;
      }

      // -------------------------------------------------------------
      // Roster / Library Management
      // -------------------------------------------------------------
      case 'set-roster-filter': {
        const status = actionEl.getAttribute('data-status') as WorkerStatus | null;
        if (status) store.setRosterStatusFilter(status);
        break;
      }

      case 'add-staff': {
        store.startAddWorker('staff');
        break;
      }

      case 'add-labor': {
        store.startAddWorker('labor');
        break;
      }

      case 'edit-worker': {
        if (id) {
          const worker = store.getState().roster.find((w) => w.id === id);
          if (worker) store.startEditWorker(worker);
        }
        break;
      }

      case 'delete-worker': {
        if (id) {
          e.stopPropagation();
          const worker = store.getState().roster.find((w) => w.id === id);
          const name = worker?.name || 'this worker';
          const confirmed = await webConfirm({
            title: 'Delete Worker',
            message: `Permanently delete "${name}" from the employee library?`,
            confirmText: 'Delete Worker',
            cancelText: 'Cancel',
            danger: true,
          });
          if (confirmed) {
            await store.deleteWorker(id);
            showInAppNotification({
              title: 'Worker Removed',
              message: `Deleted "${name}" from employee library`,
              type: 'info',
            });
          }
        }
        break;
      }

      case 'form-set-category': {
        const cat = actionEl.getAttribute('data-val') as Category | null;
        if (cat) {
          store.getState().editingWorker!.category = cat;
          store.notify();
        }
        break;
      }

      case 'save-worker-form': {
        const name = (document.getElementById('f_name') as HTMLInputElement | null)?.value;
        const contractor = (document.getElementById('f_contractor') as HTMLSelectElement | null)?.value;
        const subCategory = (document.getElementById('f_subcategory') as HTMLSelectElement | null)?.value;
        const designation = (document.getElementById('f_designation') as HTMLSelectElement | null)?.value;
        const unit = (document.getElementById('f_unit') as HTMLSelectElement | null)?.value as ManufacturingUnit | undefined;
        const department = (document.getElementById('f_department') as HTMLSelectElement | null)?.value;
        const status = (document.getElementById('f_status') as HTMLSelectElement | null)?.value as WorkerStatus | undefined;

        const res = await store.saveWorkerForm({
          name,
          contractor,
          subCategory,
          designation,
          unit,
          department,
          status,
        });

        if (!res.success && res.error) {
          await webAlert({
            title: 'Missing Required Field',
            message: res.error,
          });
        } else {
          showInAppNotification({
            title: 'Worker Saved',
            message: `Profile for "${name?.trim()}" saved to library`,
            type: 'success',
          });
        }
        break;
      }

      case 'cancel-worker-form': {
        store.cancelWorkerForm();
        break;
      }

      // -------------------------------------------------------------
      // Modals Open / Close
      // -------------------------------------------------------------
      case 'open-contractors': {
        store.openModal('contractors');
        break;
      }

      case 'open-departments': {
        store.openModal('departments');
        break;
      }

      case 'open-designations': {
        store.openModal('designations');
        break;
      }

      case 'open-bulk-import': {
        store.openModal('bulk-import');
        break;
      }

      case 'open-export-import': {
        store.openModal('roster-export-import');
        break;
      }

      case 'close-modal': {
        store.closeModal();
        break;
      }

      // -------------------------------------------------------------
      // Contractor Management (Add, Edit, Delete)
      // -------------------------------------------------------------
      case 'add-contractor-submit': {
        const input = document.getElementById('newContractorInput') as HTMLInputElement | null;
        if (input && input.value.trim()) {
          const name = input.value.trim();
          const res = await store.addContractor(name);
          if (res.success) {
            showInAppNotification({
              title: 'Contractor Added',
              message: `Added "${name}" to master list`,
              type: 'success',
            });
            input.value = '';
          } else {
            await webAlert({
              title: 'Cannot Add Contractor',
              message: res.error || 'Contractor name already exists',
            });
          }
        }
        break;
      }

      case 'edit-contractor': {
        const oldName = actionEl.getAttribute('data-name');
        if (oldName) {
          const newName = await webPrompt({
            title: 'Edit Contractor Name',
            message: `Enter new name for contractor "${oldName}". All assigned workers in the library will automatically be updated.`,
            initialValue: oldName,
            placeholder: 'Contractor Name',
            confirmText: 'Save Name',
            cancelText: 'Cancel',
          });
          if (newName && newName !== oldName) {
            const res = await store.editContractor(oldName, newName);
            if (res.success) {
              showInAppNotification({
                title: 'Contractor Updated',
                message: `Renamed "${oldName}" to "${newName}" and updated assigned workers`,
                type: 'success',
              });
            } else {
              await webAlert({
                title: 'Cannot Rename Contractor',
                message: res.error || 'Name already exists',
              });
            }
          }
        }
        break;
      }

      case 'delete-contractor': {
        const name = actionEl.getAttribute('data-name');
        if (name) {
          const count = store.getState().roster.filter((w) => w.contractor === name).length;
          if (count > 0) {
            await webAlert({
              title: 'Contractor In Use',
              message: `Cannot delete "${name}" because ${count} worker(s) in the library are currently assigned to this contractor. Please reassign them first.`,
            });
            return;
          }
          const confirmed = await webConfirm({
            title: 'Delete Contractor',
            message: `Permanently delete "${name}" from the contractor list?`,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            danger: true,
          });
          if (confirmed) {
            await store.deleteContractor(name);
            showInAppNotification({
              title: 'Contractor Removed',
              message: `Removed "${name}" from master list`,
              type: 'info',
            });
          }
        }
        break;
      }

      // -------------------------------------------------------------
      // Department Management (Add, Edit, Delete)
      // -------------------------------------------------------------
      case 'add-department-submit': {
        const input = document.getElementById('newDepartmentInput') as HTMLInputElement | null;
        if (input && input.value.trim()) {
          const name = input.value.trim();
          const res = await store.addDepartment(name);
          if (res.success) {
            showInAppNotification({
              title: 'Department Added',
              message: `Added "${name}" to department list`,
              type: 'success',
            });
            input.value = '';
          } else {
            await webAlert({
              title: 'Cannot Add Department',
              message: res.error || 'Department already exists',
            });
          }
        }
        break;
      }

      case 'edit-department': {
        const oldName = actionEl.getAttribute('data-name');
        if (oldName) {
          const newName = await webPrompt({
            title: 'Edit Department Name',
            message: `Enter new name for department "${oldName}". All workers and daily allocations assigned to this department will be updated automatically.`,
            initialValue: oldName,
            placeholder: 'Department Name',
            confirmText: 'Save Name',
            cancelText: 'Cancel',
          });
          if (newName && newName !== oldName) {
            const res = await store.editDepartment(oldName, newName);
            if (res.success) {
              showInAppNotification({
                title: 'Department Updated',
                message: `Renamed "${oldName}" to "${newName}" across roster and attendance`,
                type: 'success',
              });
            } else {
              await webAlert({
                title: 'Cannot Rename Department',
                message: res.error || 'Name already exists',
              });
            }
          }
        }
        break;
      }

      case 'delete-department': {
        const name = actionEl.getAttribute('data-name');
        if (name) {
          const count = store.getState().roster.filter((w) => w.department === name).length;
          if (count > 0) {
            await webAlert({
              title: 'Department In Use',
              message: `Cannot delete "${name}" because ${count} worker(s) are currently assigned to this department. Please reassign them first.`,
            });
            return;
          }
          const confirmed = await webConfirm({
            title: 'Delete Department',
            message: `Permanently delete "${name}" from departments?`,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            danger: true,
          });
          if (confirmed) {
            await store.deleteDepartment(name);
            showInAppNotification({
              title: 'Department Removed',
              message: `Removed "${name}" from department list`,
              type: 'info',
            });
          }
        }
        break;
      }

      // -------------------------------------------------------------
      // Designation Management (Add, Edit, Delete)
      // -------------------------------------------------------------
      case 'add-designation-submit': {
        const input = document.getElementById('newDesignationInput') as HTMLInputElement | null;
        if (input && input.value.trim()) {
          const name = input.value.trim();
          const res = await store.addDesignation(name);
          if (res.success) {
            showInAppNotification({
              title: 'Designation Added',
              message: `Added "${name}" to designation list`,
              type: 'success',
            });
            input.value = '';
          } else {
            await webAlert({
              title: 'Cannot Add Designation',
              message: res.error || 'Designation already exists',
            });
          }
        }
        break;
      }

      case 'edit-designation': {
        const oldName = actionEl.getAttribute('data-name');
        if (oldName) {
          const newName = await webPrompt({
            title: 'Edit Staff Designation',
            message: `Enter new name for designation "${oldName}". All staff members with this designation will be updated automatically.`,
            initialValue: oldName,
            placeholder: 'Designation Name',
            confirmText: 'Save Name',
            cancelText: 'Cancel',
          });
          if (newName && newName !== oldName) {
            const res = await store.editDesignation(oldName, newName);
            if (res.success) {
              showInAppNotification({
                title: 'Designation Updated',
                message: `Renamed "${oldName}" to "${newName}" across staff library`,
                type: 'success',
              });
            } else {
              await webAlert({
                title: 'Cannot Rename Designation',
                message: res.error || 'Name already exists',
              });
            }
          }
        }
        break;
      }

      case 'delete-designation': {
        const name = actionEl.getAttribute('data-name');
        if (name) {
          const count = store.getState().roster.filter((w) => w.designation === name).length;
          if (count > 0) {
            await webAlert({
              title: 'Designation In Use',
              message: `Cannot delete "${name}" because ${count} staff member(s) currently hold this designation. Please reassign them first.`,
            });
            return;
          }
          const confirmed = await webConfirm({
            title: 'Delete Designation',
            message: `Permanently delete designation "${name}"?`,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            danger: true,
          });
          if (confirmed) {
            await store.deleteDesignation(name);
            showInAppNotification({
              title: 'Designation Removed',
              message: `Removed "${name}" from designation list`,
              type: 'info',
            });
          }
        }
        break;
      }

      // -------------------------------------------------------------
      // Bulk Import
      // -------------------------------------------------------------
      case 'bulk-import-submit': {
        const rawText = (document.getElementById('bulk_names') as HTMLTextAreaElement | null)?.value || '';
        const cat = (document.getElementById('bulk_category') as HTMLSelectElement | null)?.value as Category || 'labor';
        const contractor = (document.getElementById('bulk_contractor') as HTMLSelectElement | null)?.value;
        const unit = (document.getElementById('bulk_unit') as HTMLSelectElement | null)?.value as ManufacturingUnit || 'UNIT I';
        const dept = (document.getElementById('bulk_dept') as HTMLSelectElement | null)?.value || 'Welding';

        if (!rawText.trim()) {
          await webAlert({
            title: 'Empty Input',
            message: 'Please enter or paste at least one worker name (one per line).',
          });
          return;
        }

        const count = await store.bulkImportNames(rawText, cat, contractor, unit, 'Helper', dept);
        store.closeModal();
        showInAppNotification({
          title: 'Import Successful',
          message: `Successfully imported ${count} workers into employee library!`,
          type: 'success',
          duration: 3500,
        });
        break;
      }

      // -------------------------------------------------------------
      // Roster Backup / Restore & Demo Data
      // -------------------------------------------------------------
      case 'export-roster-json': {
        const json = store.exportRosterJson();
        const filename = `BSP_Roster_${todayStr()}.json`;
        const res = await saveToDownloads(filename, json, 'application/json');
        showInAppNotification({
          title: 'Export Successful',
          message: res.message,
          type: 'success',
          duration: 3500,
        });
        break;
      }

      case 'export-roster-csv': {
        const csv = store.exportRosterCsv();
        const filename = `BSP_Roster_${todayStr()}.csv`;
        const res = await saveToDownloads(filename, csv, 'text/csv');
        showInAppNotification({
          title: 'Export Successful',
          message: res.message,
          type: 'success',
          duration: 3500,
        });
        break;
      }

      case 'import-roster-json-submit': {
        const text = (document.getElementById('import_data_text') as HTMLTextAreaElement | null)?.value || '';
        if (!text.trim()) {
          await webAlert({
            title: 'Empty JSON Data',
            message: 'Please paste JSON data into the text box to import.',
          });
          return;
        }
        const res = await store.importRosterJson(text);
        if (res.success) {
          store.closeModal();
          showInAppNotification({
            title: 'Import Successful',
            message: `Restored and merged ${res.count} workers into library!`,
            type: 'success',
            duration: 3500,
          });
        } else {
          await webAlert({
            title: 'Import Failed',
            message: res.error || 'Invalid JSON format',
          });
        }
        break;
      }

      case 'import-roster-csv-submit': {
        const text = (document.getElementById('import_data_text') as HTMLTextAreaElement | null)?.value || '';
        if (!text.trim()) {
          await webAlert({
            title: 'Empty CSV Data',
            message: 'Please paste CSV data into the text box to import.',
          });
          return;
        }
        const res = await store.importRosterCsv(text);
        if (res.success) {
          store.closeModal();
          showInAppNotification({
            title: 'Import Successful',
            message: `Imported ${res.count} workers from CSV!`,
            type: 'success',
            duration: 3500,
          });
        } else {
          await webAlert({
            title: 'Import Failed',
            message: res.error || 'Invalid CSV format',
          });
        }
        break;
      }

      case 'load-demo-data': {
        const confirmed = await webConfirm({
          title: 'Load Plant Demo Data',
          message: 'This will reset library and floor data with the realistic Chakan manufacturing plant demo dataset (4 contractors, 12 departments, 10 designations, 28 workers, and daily check-ins). Proceed?',
          confirmText: 'Load Demo Data',
          cancelText: 'Cancel',
          danger: false,
        });
        if (confirmed) {
          await store.loadDemoData();
          store.closeModal();
          showInAppNotification({
            title: 'Demo Data Loaded',
            message: 'Populated 28 workers, 4 contractors, and today’s floor allocations',
            type: 'success',
            duration: 3500,
          });
        }
        break;
      }
    }
  });
}

// Subscribe renderer to store updates
store.subscribe(render);

// Attach event listeners
setupEventHandlers();

// Initialize store
store.init().catch((err) => {
  console.error('Initialization error:', err);
});
