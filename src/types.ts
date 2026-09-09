export type Category = 'staff' | 'labor';
export type Shift = 'Day' | 'Night';
export type AppTab = 'today' | 'roster' | 'report';

export interface Worker {
  id: string;
  name: string;
  category: Category;
  contractor?: string;
  work?: string;
  shift: Shift;
  supervisor: string;
}

export type WorkerDraft = Partial<Worker>;

export interface AppState {
  roster: Worker[];
  attendance: Record<string, string[]>; // dateStr -> array of worker IDs marked present
  tab: AppTab;
  currentDate: string;
  editing: 'form' | null;
  formDraft: WorkerDraft | null;
}
