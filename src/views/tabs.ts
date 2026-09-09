import type { AppTab } from '../types';

export function renderTabs(currentTab: AppTab): string {
  return `
    <nav class="tabs">
      <button type="button" class="${currentTab === 'today' ? 'active' : ''}" data-action="switch-tab" data-tab="today">
        TODAY
      </button>
      <button type="button" class="${currentTab === 'roster' ? 'active' : ''}" data-action="switch-tab" data-tab="roster">
        ROSTER
      </button>
      <button type="button" class="${currentTab === 'report' ? 'active' : ''}" data-action="switch-tab" data-tab="report">
        REPORT
      </button>
    </nav>
  `;
}
