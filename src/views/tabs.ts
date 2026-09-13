import type { AppTab } from '../types';

export function renderTabs(currentTab: AppTab): string {
  return `
    <nav class="tabs">
      <button
        type="button"
        class="${currentTab === 'today' ? 'active' : ''}"
        data-action="switch-tab"
        data-tab="today"
      >
        <span class="tab-icon">&#10003;</span>
        <span class="tab-label">TODAY</span>
      </button>

      <button
        type="button"
        class="${currentTab === 'verify' ? 'active' : ''}"
        data-action="switch-tab"
        data-tab="verify"
      >
        <span class="tab-icon">&#9745;</span>
        <span class="tab-label">VERIFY</span>
      </button>

      <button
        type="button"
        class="${currentTab === 'report' ? 'active' : ''}"
        data-action="switch-tab"
        data-tab="report"
      >
        <span class="tab-icon">&#128202;</span>
        <span class="tab-label">REPORT</span>
      </button>

      <button
        type="button"
        class="${currentTab === 'roster' ? 'active' : ''}"
        data-action="switch-tab"
        data-tab="roster"
      >
        <span class="tab-icon">&#128101;</span>
        <span class="tab-label">ROSTER</span>
      </button>
    </nav>
  `;
}
