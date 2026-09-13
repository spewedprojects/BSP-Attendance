export type Category = 'staff' | 'labor';
export type Shift = 'Day' | 'Night';
export type WorkerStatus = 'active' | 'inactive' | 'debarred';
export type ManufacturingUnit = 'UNIT I' | 'UNIT II' | 'UNIT III';
export type AppTab = 'today' | 'verify' | 'report' | 'roster';

export interface Worker {
  id: string;
  name: string;
  category: Category;
  contractor?: string; // for labor
  department?: string; // for staff (or default for labor)
  designation?: string; // for staff (e.g., HOD, Engineer, Supervisor)
  subCategory?: string; // Helper, Operator, Welder, Housekeeping, etc.
  unit: ManufacturingUnit; // UNIT I, UNIT II, UNIT III
  status: WorkerStatus; // active, inactive (left company), debarred
  createdAt: string; // ISO date string or YYYY-MM-DD
}

export interface DailyAllocation {
  present: boolean;
  work?: string; // e.g., Welding, Laser, Bending, Painting
  department?: string; // Department assigned for the day
  unit: ManufacturingUnit; // Unit assigned for the day
  subCategory?: string; // Helper vs Operator override for the day
  shift: Shift; // Day or Night
  supervisor: string; // Reporting supervisor for the day
  checkInTime?: string; // Check-in time (e.g., "08:30 AM") for staff
  remarks?: string; // Daily remark
}

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  allocations: Record<string, DailyAllocation>; // workerId -> allocation
  verifiedBy: Record<string, string>; // department -> verifying staff name
}

export interface AppState {
  roster: Worker[];
  contractors: string[];
  departments: string[];
  designations: string[];
  currentDate: string;
  tab: AppTab;
  searchQuery: string;
  collapsedSections: Record<string, boolean>; // category/contractor title -> isCollapsed
  rosterStatusFilter: WorkerStatus;
  dailyRecord: DailyRecord;
  editingWorker: Partial<Worker> | null;
  quickAdjustWorkerId: string | null;
  activeModal: 'contractors' | 'departments' | 'designations' | 'bulk-import' | 'roster-export-import' | null;
}

