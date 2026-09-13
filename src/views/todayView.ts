import type { AppState, DailyAllocation, Worker } from '../types';
import { escapeHtml, groupBy } from '../utils';
import { renderTopBar } from './topBar';

function renderWorkerCard(
  w: Worker,
  alloc: DailyAllocation | undefined,
  interactive: boolean
): string {
  const isPresent = Boolean(alloc?.present);
  const isDebarred = w.status === 'debarred';

  // Dynamic daily values with fallback to worker library defaults
  const currentWork = alloc?.work || alloc?.department || w.department || (w.category === 'labor' ? 'Welding' : 'Staff');
  const currentUnit = alloc?.unit || w.unit || 'UNIT I';
  const currentShift = alloc?.shift || 'Day';
  const currentSupervisor = alloc?.supervisor || '';
  const currentRole = alloc?.subCategory || w.subCategory || (w.category === 'staff' ? (w.designation || 'Staff') : 'Helper');
  const checkInTime = alloc?.checkInTime;
  const remarks = alloc?.remarks;

  let metaParts: string[] = [];
  if (w.category === 'labor') {
    metaParts.push(w.contractor || 'Contractor');
    metaParts.push(currentWork);
    metaParts.push(currentRole);
    if (currentSupervisor) metaParts.push(`Sup: ${currentSupervisor}`);
  } else {
    metaParts.push(currentWork);
    if (w.designation) metaParts.push(w.designation);
    if (checkInTime) metaParts.push(`In: ${checkInTime}`);
    if (currentSupervisor) metaParts.push(`Sup: ${currentSupervisor}`);
  }

  const metaText = metaParts.join(' · ');

  return `
    <div class="worker ${isPresent ? 'present' : 'absent'} ${isDebarred ? 'worker-debarred' : ''}">
      <div
        class="box ${isDebarred ? 'box-debarred' : ''}"
        ${interactive ? `data-action="toggle-present" data-id="${w.id}"` : ''}
        title="${isDebarred ? 'Debarred from floor' : 'Toggle Attendance'}"
      >
        ${isPresent ? '✓' : (isDebarred ? '✕' : '')}
      </div>

      <div class="info" ${interactive ? `data-action="toggle-present" data-id="${w.id}"` : ''}>
        <div class="name-row">
          <span class="name">${escapeHtml(w.name)}</span>
          ${isDebarred ? `<span class="badge badge-debarred">DEBARRED</span>` : ''}
          <span class="badge badge-unit">${escapeHtml(currentUnit)}</span>
        </div>
        <div class="meta">${escapeHtml(metaText)}</div>
        ${remarks ? `<div class="worker-remark">Note: ${escapeHtml(remarks)}</div>` : ''}
      </div>

      <div class="worker-actions">
        <div class="shift ${currentShift === 'Night' ? 'shift-night' : 'shift-day'}">
          ${currentShift === 'Night' ? 'NIGHT' : 'DAY'}
        </div>
        <button
          type="button"
          class="btn-quick-adjust"
          data-action="open-quick-adjust"
          data-id="${w.id}"
          title="Daily Adjustments"
        >
          &#9881;
        </button>
      </div>
    </div>
  `;
}

function renderQuickAdjustModal(state: AppState): string {
  const workerId = state.quickAdjustWorkerId;
  if (!workerId) return '';

  const worker = state.roster.find((w) => w.id === workerId);
  if (!worker) return '';

  const alloc = state.dailyRecord.allocations[workerId] || {
    present: false,
    unit: worker.unit || 'UNIT I',
    department: worker.department || 'Welding',
    subCategory: worker.subCategory || 'Helper',
    shift: 'Day',
    supervisor: '',
  };

  const isStaff = worker.category === 'staff';

  return `
    <div class="modal-overlay" data-action="close-quick-adjust">
      <div class="modal-card drawer-card" onclick="event.stopPropagation()">
        <div class="drawer-header">
          <div class="drawer-title">Daily Adjustments: ${escapeHtml(worker.name)}</div>
          <button type="button" class="modal-close-btn" data-action="close-quick-adjust">&times;</button>
        </div>

        <div class="drawer-body">
          <input type="hidden" id="qa_worker_id" value="${worker.id}" />

          <div class="field">
            <label for="qa_department">Assigned Work / Department</label>
            <select id="qa_department">
              ${Array.from(new Set([...state.departments, ...(alloc.department ? [alloc.department] : []), ...(alloc.work ? [alloc.work] : [])])).map(
                (d) => `<option value="${escapeHtml(d)}" ${(alloc.department || alloc.work) === d ? 'selected' : ''}>${escapeHtml(d)}</option>`
              ).join('')}
            </select>
          </div>


          <div class="row2">
            <div class="field">
              <label for="qa_unit">Unit</label>
              <select id="qa_unit">
                <option value="UNIT I" ${alloc.unit === 'UNIT I' ? 'selected' : ''}>UNIT I</option>
                <option value="UNIT II" ${alloc.unit === 'UNIT II' ? 'selected' : ''}>UNIT II</option>
                <option value="UNIT III" ${alloc.unit === 'UNIT III' ? 'selected' : ''}>UNIT III</option>
              </select>
            </div>

            <div class="field">
              <label>Shift</label>
              <div class="segmented">
                <button type="button" id="qa_shift_day" class="${alloc.shift === 'Day' ? 'on' : ''}" data-action="qa-set-shift" data-val="Day">Day</button>
                <button type="button" id="qa_shift_night" class="${alloc.shift === 'Night' ? 'on' : ''}" data-action="qa-set-shift" data-val="Night">Night</button>
              </div>
            </div>
          </div>

          ${!isStaff ? `
            <div class="field">
              <label for="qa_subcategory">Role / Skill</label>
              <select id="qa_subcategory">
                <option value="Helper" ${alloc.subCategory === 'Helper' ? 'selected' : ''}>Helper</option>
                <option value="Operator" ${alloc.subCategory === 'Operator' ? 'selected' : ''}>Operator</option>
                <option value="Welder" ${alloc.subCategory === 'Welder' ? 'selected' : ''}>Welder</option>
                <option value="Housekeeping" ${alloc.subCategory === 'Housekeeping' ? 'selected' : ''}>Housekeeping</option>
              </select>
            </div>
          ` : `
            <div class="field">
              <label for="qa_check_in">Staff Check-in Time</label>
              <div class="time-input-row">
                <input id="qa_check_in" type="text" value="${escapeHtml(alloc.checkInTime || '')}" placeholder="e.g. 08:30 AM" />
                <button type="button" class="btn secondary btn-now" data-action="qa-stamp-time">Now</button>
              </div>
            </div>
          `}

          <div class="field">
            <label for="qa_supervisor">Reporting Supervisor</label>
            <input id="qa_supervisor" type="text" value="${escapeHtml(alloc.supervisor || '')}" placeholder="Supervisor on duty" />
          </div>

          <div class="field">
            <label for="qa_remarks">Daily Remark</label>
            <input id="qa_remarks" type="text" value="${escapeHtml(alloc.remarks || '')}" placeholder="e.g. Half-day, Gate pass, Overtime" />
          </div>

          <button type="button" class="btn" data-action="qa-save">Save Adjustments</button>
        </div>
      </div>
    </div>
  `;
}

export function renderToday(state: AppState): string {
  // Filter out inactive workers from daily attendance list
  const activeWorkers = state.roster.filter((w) => w.status !== 'inactive');

  // Apply search query filter if any
  const query = state.searchQuery.toLowerCase().trim();
  const filteredWorkers = query
    ? activeWorkers.filter((w) => {
        const alloc = state.dailyRecord.allocations[w.id];
        const matchName = w.name.toLowerCase().includes(query);
        const matchContractor = (w.contractor || '').toLowerCase().includes(query);
        const matchDept = (alloc?.department || w.department || '').toLowerCase().includes(query);
        const matchSup = (alloc?.supervisor || '').toLowerCase().includes(query);
        const matchUnit = (alloc?.unit || w.unit || '').toLowerCase().includes(query);
        return matchName || matchContractor || matchDept || matchSup || matchUnit;
      })
    : activeWorkers;

  const staff = filteredWorkers.filter((w) => w.category === 'staff');
  const labor = filteredWorkers.filter((w) => w.category === 'labor');
  const laborByContractor = groupBy(labor, (w) => w.contractor || 'Other Contractor');

  let html = renderTopBar(state);
  html += '<main>';

  // Search input bar
  html += `
    <div class="search-bar-wrap">
      <input
        type="text"
        id="todaySearchInput"
        class="search-input"
        placeholder="Search worker, contractor, unit, department..."
        value="${escapeHtml(state.searchQuery)}"
      />
      ${state.searchQuery ? `<button type="button" class="search-clear-btn" data-action="clear-search">&times;</button>` : ''}
    </div>
  `;

  if (state.roster.length === 0) {
    html += `
      <div class="empty">
        <p><b>Employee library is empty.</b></p>
        <p>Go to the <b>ROSTER</b> tab to add staff or bulk import contract labourers.</p>
      </div>
    `;
    html += '</main>';
    return html;
  }

  if (filteredWorkers.length === 0) {
    html += `
      <div class="empty">
        <p>No workers matching "${escapeHtml(state.searchQuery)}"</p>
        <button type="button" class="btn secondary" data-action="clear-search" style="margin-top: 10px;">Clear Search</button>
      </div>
    `;
    html += '</main>';
    return html;
  }

  // Staff Group
  if (staff.length > 0) {
    const isCollapsed = Boolean(state.collapsedSections['Staff']);
    const presentCount = staff.filter((w) => state.dailyRecord.allocations[w.id]?.present).length;

    html += `
      <div class="group">
        <h3 class="group-header" data-action="toggle-section" data-key="Staff">
          <span>Staff <span class="accordion-arrow">${isCollapsed ? '&#9654;' : '&#9660;'}</span></span>
          <span class="count">${presentCount}/${staff.length}</span>
        </h3>
        <div class="group-content ${isCollapsed ? 'collapsed' : ''}">
          ${staff.map((w) => renderWorkerCard(w, state.dailyRecord.allocations[w.id], true)).join('')}
        </div>
      </div>
    `;
  }

  // Contractor Groups (from master contractors list + any custom)
  const allContractors = Array.from(
    new Set([...state.contractors, ...Array.from(laborByContractor.keys())])
  );

  for (const c of allContractors) {
    const list = laborByContractor.get(c) || [];
    if (!list.length) continue;

    const isCollapsed = Boolean(state.collapsedSections[c]);
    const presentCount = list.filter((w) => state.dailyRecord.allocations[w.id]?.present).length;

    html += `
      <div class="group">
        <h3 class="group-header" data-action="toggle-section" data-key="${escapeHtml(c)}">
          <span>${escapeHtml(c)} <span class="accordion-arrow">${isCollapsed ? '&#9654;' : '&#9660;'}</span></span>
          <span class="count">${presentCount}/${list.length}</span>
        </h3>
        <div class="group-content ${isCollapsed ? 'collapsed' : ''}">
          ${list.map((w) => renderWorkerCard(w, state.dailyRecord.allocations[w.id], true)).join('')}
        </div>
      </div>
    `;
  }

  html += '</main>';

  // Render quick adjust drawer if open
  html += renderQuickAdjustModal(state);

  return html;
}
