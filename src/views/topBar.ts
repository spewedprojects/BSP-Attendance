import { COMPANY_NAME } from '../constants';
import type { AppState } from '../types';
import { fmtDateHeader, todayStr } from '../utils';

export function renderTopBar(state: AppState): string {
  // Only count active workers for roll-call totals
  const activeStaff = state.roster.filter(
    (w) => w.category === 'staff' && w.status !== 'inactive'
  );
  const activeLabor = state.roster.filter(
    (w) => w.category === 'labor' && w.status !== 'inactive'
  );

  let staffPresent = 0;
  let laborPresent = 0;

  for (const w of activeStaff) {
    if (state.dailyRecord.allocations[w.id]?.present) {
      staffPresent++;
    }
  }

  for (const w of activeLabor) {
    if (state.dailyRecord.allocations[w.id]?.present) {
      laborPresent++;
    }
  }

  const totalPresent = staffPresent + laborPresent;
  const isToday = state.currentDate === todayStr();

  return `
    <header class="top">
      <div class="top-row">
        <div class="co">${COMPANY_NAME}</div>
        ${!isToday ? `<button type="button" class="btn-today-jump" data-action="jump-today">Jump to Today</button>` : ''}
      </div>

      <div class="date-navigator">
        <button type="button" class="date-nav-btn" data-action="prev-date" title="Previous Day">
          &#9664;
        </button>
        <div class="date-display" data-action="trigger-date-picker">
          <span class="date-text">${fmtDateHeader(state.currentDate)}</span>
          <span class="calendar-icon">&#128197;</span>
          <input
            type="date"
            id="hiddenDatePicker"
            class="hidden-date-input"
            value="${state.currentDate}"
          />
        </div>
        <button type="button" class="date-nav-btn" data-action="next-date" title="Next Day">
          &#9654;
        </button>
      </div>
    </header>

    <div class="tallybar">
      <div class="cell">
        <div class="num">${staffPresent}<span class="denom">/${activeStaff.length}</span></div>
        <div class="lbl">STAFF</div>
      </div>
      <div class="cell">
        <div class="num">${laborPresent}<span class="denom">/${activeLabor.length}</span></div>
        <div class="lbl">LABOR</div>
      </div>
      <div class="cell">
        <div class="num">${totalPresent}</div>
        <div class="lbl">TOTAL</div>
      </div>
    </div>
  `;
}
