import { CONTRACTORS } from '../constants';
import type { AppState, Worker } from '../types';
import { escapeHtml, groupBy } from '../utils';
import { renderTopBar } from './topBar';

function renderWorkerCard(w: Worker, isPresent: boolean): string {
  const metaBits =
    w.category === 'labor'
      ? `${escapeHtml(w.contractor)} · ${escapeHtml(w.work)} · Sup: ${escapeHtml(w.supervisor)}`
      : `Sup: ${escapeHtml(w.supervisor)}`;

  return `
    <div class="worker ${isPresent ? 'present' : 'absent'}" data-action="toggle-present" data-id="${w.id}">
      <div class="box">${isPresent ? '✓' : ''}</div>
      <div class="info">
        <div class="name">${escapeHtml(w.name)}</div>
        <div class="meta">${metaBits}</div>
      </div>
      <div class="shift ${w.shift === 'Night' ? 'shift-night' : 'shift-day'}">
        ${w.shift === 'Night' ? 'NIGHT' : 'DAY'}
      </div>
    </div>
  `;
}

export function renderToday(state: AppState): string {
  const staff = state.roster.filter((w) => w.category === 'staff');
  const labor = state.roster.filter((w) => w.category === 'labor');
  const presIds = new Set(state.attendance[state.currentDate] || []);

  const laborByContractor = groupBy(labor, (w) => w.contractor || 'Other Contractor');

  let html = renderTopBar(state);
  html += '<main>';

  if (state.roster.length === 0) {
    html += `
      <div class="empty">
        <p>No one on the roster yet.</p>
        <p>Go to <b>Roster</b> to add staff and contract laborers.</p>
      </div>
    `;
    html += '</main>';
    return html;
  }

  // Staff Group
  if (staff.length > 0) {
    const staffPresent = staff.filter((w) => presIds.has(w.id)).length;
    html += `
      <div class="group">
        <h3>
          <span>Staff</span>
          <span class="count">${staffPresent}/${staff.length}</span>
        </h3>
    `;
    staff.forEach((w) => {
      html += renderWorkerCard(w, presIds.has(w.id));
    });
    html += `</div>`;
  }

  // Known Contractors
  for (const c of CONTRACTORS) {
    const list = laborByContractor.get(c) || [];
    if (!list.length) continue;
    const pres = list.filter((w) => presIds.has(w.id)).length;
    html += `
      <div class="group">
        <h3>
          <span>${escapeHtml(c)}</span>
          <span class="count">${pres}/${list.length}</span>
        </h3>
    `;
    list.forEach((w) => {
      html += renderWorkerCard(w, presIds.has(w.id));
    });
    html += `</div>`;
  }

  // Any custom contractors
  laborByContractor.forEach((list, c) => {
    if (CONTRACTORS.includes(c as any)) return;
    const pres = list.filter((w) => presIds.has(w.id)).length;
    html += `
      <div class="group">
        <h3>
          <span>${escapeHtml(c)}</span>
          <span class="count">${pres}/${list.length}</span>
        </h3>
    `;
    list.forEach((w) => {
      html += renderWorkerCard(w, presIds.has(w.id));
    });
    html += `</div>`;
  });

  html += '</main>';
  return html;
}
