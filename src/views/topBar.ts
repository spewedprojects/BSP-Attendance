import { COMPANY_NAME } from '../constants';
import type { AppState } from '../types';
import { fmtDateHeader } from '../utils';

export function renderTopBar(state: AppState): string {
  const staff = state.roster.filter((w) => w.category === 'staff');
  const labor = state.roster.filter((w) => w.category === 'labor');
  const presIds = new Set(state.attendance[state.currentDate] || []);

  const staffPresent = staff.filter((w) => presIds.has(w.id)).length;
  const laborPresent = labor.filter((w) => presIds.has(w.id)).length;
  const totalPresent = staffPresent + laborPresent;

  return `
    <header class="top">
      <div class="co">${COMPANY_NAME}</div>
      <div class="date">${fmtDateHeader(state.currentDate)}</div>
    </header>
    <div class="tallybar">
      <div class="cell">
        <div class="num">${staffPresent}<span class="denom">/${staff.length}</span></div>
        <div class="lbl">STAFF</div>
      </div>
      <div class="cell">
        <div class="num">${laborPresent}<span class="denom">/${labor.length}</span></div>
        <div class="lbl">LABOR</div>
      </div>
      <div class="cell">
        <div class="num">${totalPresent}</div>
        <div class="lbl">TOTAL</div>
      </div>
    </div>
  `;
}
