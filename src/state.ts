import { CONTRACTORS, WORK_TYPES } from './constants';
import { loadAttendance, loadRoster, saveAttendance, saveRoster } from './storage';
import type { AppState, AppTab, Category, Worker, WorkerDraft } from './types';
import { todayStr, uid } from './utils';

type Listener = () => void;

class Store {
  private state: AppState = {
    roster: [],
    attendance: {},
    tab: 'today',
    currentDate: todayStr(),
    editing: null,
    formDraft: null,
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

    const [roster, attendanceList] = await Promise.all([
      loadRoster(),
      loadAttendance(today),
    ]);

    this.state.roster = roster;
    this.state.attendance[today] = attendanceList;
    this.notify();
  }

  setTab(tab: AppTab): void {
    this.state.tab = tab;
    this.state.editing = null;
    this.state.formDraft = null;
    this.notify();
  }

  async togglePresent(id: string): Promise<void> {
    const date = this.state.currentDate;
    const currentList = this.state.attendance[date] ? [...this.state.attendance[date]] : [];
    const index = currentList.indexOf(id);

    if (index >= 0) {
      currentList.splice(index, 1);
    } else {
      currentList.push(id);
    }

    this.state.attendance[date] = currentList;
    this.notify();
    await saveAttendance(date, currentList);
  }

  startAdd(category: Category): void {
    this.state.formDraft = {
      name: '',
      category,
      contractor: CONTRACTORS[0],
      work: WORK_TYPES[0],
      shift: 'Day',
      supervisor: '',
    };
    this.state.editing = 'form';
    this.notify();
  }

  startEdit(worker: Worker): void {
    this.state.formDraft = { ...worker };
    this.state.editing = 'form';
    this.notify();
  }

  cancelForm(): void {
    this.state.editing = null;
    this.state.formDraft = null;
    this.notify();
  }

  setDraftField<K extends keyof WorkerDraft>(
    key: K,
    value: WorkerDraft[K],
    shouldNotify = true
  ): void {
    if (!this.state.formDraft) return;
    this.state.formDraft[key] = value;
    if (shouldNotify) {
      this.notify();
    }
  }

  async saveFormWithValues(values: {
    name?: string;
    supervisor?: string;
    contractor?: string;
    work?: string;
  }): Promise<{ success: boolean; error?: string }> {
    const draft = this.state.formDraft;
    if (!draft) return { success: false, error: 'No draft found' };

    const name = (values.name !== undefined ? values.name : draft.name)?.trim() || '';
    const supervisor =
      (values.supervisor !== undefined ? values.supervisor : draft.supervisor)?.trim() || '';

    if (!name) {
      return { success: false, error: 'Please enter a name' };
    }
    if (!supervisor) {
      return { success: false, error: 'Please enter a reporting supervisor' };
    }

    const worker: Worker = {
      id: draft.id || uid(),
      name,
      category: draft.category || 'labor',
      contractor:
        draft.category === 'labor' ? values.contractor || draft.contractor || CONTRACTORS[0] : undefined,
      work: draft.category === 'labor' ? values.work || draft.work || WORK_TYPES[0] : undefined,
      shift: draft.shift || 'Day',
      supervisor,
    };

    if (draft.id) {
      const idx = this.state.roster.findIndex((w) => w.id === draft.id);
      if (idx >= 0) {
        this.state.roster[idx] = worker;
      }
    } else {
      this.state.roster.push(worker);
    }

    this.state.editing = null;
    this.state.formDraft = null;
    this.notify();
    await saveRoster(this.state.roster);
    return { success: true };
  }

  async deleteWorker(id: string): Promise<void> {
    this.state.roster = this.state.roster.filter((w) => w.id !== id);

    // Also remove from today's attendance if present
    const date = this.state.currentDate;
    if (this.state.attendance[date]) {
      this.state.attendance[date] = this.state.attendance[date].filter((wId) => wId !== id);
      await saveAttendance(date, this.state.attendance[date]);
    }

    this.notify();
    await saveRoster(this.state.roster);
  }
}

export const store = new Store();
