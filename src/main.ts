import { store } from './state';
import './style.css';
import type { AppTab, Category, Shift } from './types';
import { copyTextToClipboard } from './utils';
import { buildReportText, renderReport } from './views/reportView';
import { renderRoster } from './views/rosterView';
import { renderTabs } from './views/tabs';
import { renderToday } from './views/todayView';

const appElement = document.getElementById('app') as HTMLDivElement;
const toastElement = document.getElementById('copiedToast') as HTMLDivElement;

function showToast(message = 'Copied to clipboard', duration = 1500): void {
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
    case 'roster':
      bodyHtml = renderRoster(state);
      break;
    case 'report':
      bodyHtml = renderReport(state);
      break;
    default:
      bodyHtml = renderToday(state);
  }

  appElement.innerHTML = bodyHtml + renderTabs(state.tab);
}

function captureCurrentFormInputs(): {
  name?: string;
  supervisor?: string;
  contractor?: string;
  work?: string;
} {
  const nameInput = document.getElementById('f_name') as HTMLInputElement | null;
  const supInput = document.getElementById('f_supervisor') as HTMLInputElement | null;
  const contractorSelect = document.getElementById('f_contractor') as HTMLSelectElement | null;
  const workSelect = document.getElementById('f_work') as HTMLSelectElement | null;

  return {
    name: nameInput ? nameInput.value : undefined,
    supervisor: supInput ? supInput.value : undefined,
    contractor: contractorSelect ? contractorSelect.value : undefined,
    work: workSelect ? workSelect.value : undefined,
  };
}

function setupEventHandlers(): void {
  appElement.addEventListener('click', async (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    // Find nearest ancestor with data-action attribute
    const actionEl = target.closest('[data-action]') as HTMLElement | null;
    if (!actionEl) return;

    const action = actionEl.getAttribute('data-action');
    const id = actionEl.getAttribute('data-id');

    switch (action) {
      case 'toggle-present': {
        if (id) {
          await store.togglePresent(id);
        }
        break;
      }

      case 'switch-tab': {
        const tab = actionEl.getAttribute('data-tab') as AppTab | null;
        if (tab) {
          store.setTab(tab);
        }
        break;
      }

      case 'add-staff': {
        store.startAdd('staff');
        break;
      }

      case 'add-labor': {
        store.startAdd('labor');
        break;
      }

      case 'edit-worker': {
        if (id) {
          const worker = store.getState().roster.find((w) => w.id === id);
          if (worker) {
            store.startEdit(worker);
          }
        }
        break;
      }

      case 'delete-worker': {
        if (id) {
          e.stopPropagation();
          const worker = store.getState().roster.find((w) => w.id === id);
          const name = worker?.name || 'this worker';
          if (window.confirm(`Remove ${name} from roster?`)) {
            await store.deleteWorker(id);
            showToast(`Removed ${name}`);
          }
        }
        break;
      }

      case 'set-draft-category': {
        const cat = actionEl.getAttribute('data-val') as Category | null;
        if (cat) {
          const currentInputs = captureCurrentFormInputs();
          store.setDraftField('name', currentInputs.name, false);
          store.setDraftField('supervisor', currentInputs.supervisor, false);
          if (currentInputs.contractor) store.setDraftField('contractor', currentInputs.contractor, false);
          if (currentInputs.work) store.setDraftField('work', currentInputs.work, false);
          store.setDraftField('category', cat, true);
        }
        break;
      }

      case 'set-draft-shift': {
        const shift = actionEl.getAttribute('data-val') as Shift | null;
        if (shift) {
          const currentInputs = captureCurrentFormInputs();
          store.setDraftField('name', currentInputs.name, false);
          store.setDraftField('supervisor', currentInputs.supervisor, false);
          if (currentInputs.contractor) store.setDraftField('contractor', currentInputs.contractor, false);
          if (currentInputs.work) store.setDraftField('work', currentInputs.work, false);
          store.setDraftField('shift', shift, true);
        }
        break;
      }

      case 'save-form': {
        const inputs = captureCurrentFormInputs();
        const result = await store.saveFormWithValues(inputs);
        if (!result.success && result.error) {
          showToast(result.error, 2000);
        }
        break;
      }

      case 'cancel-form': {
        store.cancelForm();
        break;
      }

      case 'copy-report': {
        const state = store.getState();
        const text = buildReportText(state);
        const copied = await copyTextToClipboard(text);
        if (copied) {
          showToast('Copied report text');
        } else {
          showToast('Failed to copy');
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

// Initialize store and load stored data
store.init().catch((err) => {
  console.error('Initialization error:', err);
});
