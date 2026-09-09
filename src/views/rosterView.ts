import { COMPANY_NAME, CONTRACTORS, WORK_TYPES } from '../constants';
import type { AppState } from '../types';
import { escapeHtml, groupBy } from '../utils';

export function renderRoster(state: AppState): string {
  // If in form mode (Add or Edit)
  if (state.editing === 'form' && state.formDraft) {
    const f = state.formDraft;
    const isEdit = Boolean(f.id);

    let html = `
      <header class="top">
        <div class="co">${COMPANY_NAME}</div>
        <div class="date title-mode">${isEdit ? 'Edit Person' : 'Add Person'}</div>
      </header>
      <main>
        <div class="field">
          <label for="f_name">Full Name</label>
          <input id="f_name" type="text" value="${escapeHtml(f.name || '')}" placeholder="e.g. Ramesh Kumar" autocomplete="off" />
        </div>

        <div class="field">
          <label>Category</label>
          <div class="segmented">
            <button type="button" class="${f.category === 'staff' ? 'on' : ''}" data-action="set-draft-category" data-val="staff">Staff</button>
            <button type="button" class="${f.category === 'labor' ? 'on' : ''}" data-action="set-draft-category" data-val="labor">Labor</button>
          </div>
        </div>
    `;

    if (f.category === 'labor') {
      html += `
        <div class="field">
          <label for="f_contractor">Contractor</label>
          <select id="f_contractor">
            ${CONTRACTORS.map(
              (c) => `<option value="${escapeHtml(c)}" ${f.contractor === c ? 'selected' : ''}>${escapeHtml(c)}</option>`
            ).join('')}
          </select>
        </div>

        <div class="field">
          <label for="f_work">Work Assigned / Department</label>
          <select id="f_work">
            ${WORK_TYPES.map(
              (w) => `<option value="${escapeHtml(w)}" ${f.work === w ? 'selected' : ''}>${escapeHtml(w)}</option>`
            ).join('')}
          </select>
        </div>
      `;
    }

    html += `
        <div class="field">
          <label>Shift</label>
          <div class="segmented">
            <button type="button" class="${f.shift === 'Day' ? 'on' : ''}" data-action="set-draft-shift" data-val="Day">Day</button>
            <button type="button" class="${f.shift === 'Night' ? 'on' : ''}" data-action="set-draft-shift" data-val="Night">Night</button>
          </div>
        </div>

        <div class="field">
          <label for="f_supervisor">Reporting Supervisor</label>
          <input id="f_supervisor" type="text" value="${escapeHtml(f.supervisor || '')}" placeholder="e.g. Supervisor Patil" autocomplete="off" />
        </div>

        <div style="margin-top: 20px;">
          <button type="button" class="btn" data-action="save-form">Save</button>
          <div style="height: 10px;"></div>
          <button type="button" class="btn secondary" data-action="cancel-form">Cancel</button>
        </div>
      </main>
    `;
    return html;
  }

  // Roster list mode
  let html = `
    <header class="top">
      <div class="co">${COMPANY_NAME}</div>
      <div class="date title-mode">Roster</div>
    </header>
    <main>
      <div class="toolbar">
        <button type="button" class="btn" data-action="add-staff">+ Staff</button>
        <button type="button" class="btn" data-action="add-labor">+ Laborer</button>
      </div>
  `;

  const staff = state.roster.filter((w) => w.category === 'staff');
  const labor = state.roster.filter((w) => w.category === 'labor');

  if (staff.length > 0) {
    html += `<div class="sectionTitle">Staff (${staff.length})</div>`;
    staff.forEach((w) => {
      html += `
        <div class="rosterRow">
          <div class="info" data-action="edit-worker" data-id="${w.id}">
            <div class="name">${escapeHtml(w.name)}</div>
            <div class="meta">Sup: ${escapeHtml(w.supervisor)} · ${w.shift} Shift</div>
          </div>
          <button type="button" class="del" data-action="delete-worker" data-id="${w.id}" title="Delete worker">&times;</button>
        </div>
      `;
    });
  }

  if (labor.length > 0) {
    html += `<div class="sectionTitle" style="margin-top: 18px;">Contract Laborers (${labor.length})</div>`;
    const byContractor = groupBy(labor, (w) => w.contractor || 'Other');
    byContractor.forEach((list, c) => {
      html += `<div class="contractor-label">${escapeHtml(c)} (${list.length})</div>`;
      list.forEach((w) => {
        html += `
          <div class="rosterRow">
            <div class="info" data-action="edit-worker" data-id="${w.id}">
              <div class="name">${escapeHtml(w.name)}</div>
              <div class="meta">${escapeHtml(w.work || '')} · Sup: ${escapeHtml(w.supervisor)} · ${w.shift} Shift</div>
            </div>
            <button type="button" class="del" data-action="delete-worker" data-id="${w.id}" title="Delete laborer">&times;</button>
          </div>
        `;
      });
    });
  }

  if (staff.length === 0 && labor.length === 0) {
    html += `
      <div class="empty">
        <p>Roster is currently empty.</p>
        <p>Add staff and laborers once beforehand. Each morning, you'll simply tick who is present.</p>
      </div>
    `;
  }

  html += '</main>';
  return html;
}
