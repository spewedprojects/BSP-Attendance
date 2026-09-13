import {
  COMPANY_NAME,
  DEFAULT_SUBCATEGORIES,
  MANUFACTURING_UNITS,
} from '../constants';
import type { AppState } from '../types';
import { escapeHtml, groupBy } from '../utils';

function renderWorkerForm(state: AppState): string {
  const f = state.editingWorker;
  if (!f) return '';

  const isEdit = Boolean(f.id);
  const isLabor = f.category === 'labor';

  // Ensure current worker's designation/department is in dropdown options even if custom
  const desigOptions = Array.from(new Set([...state.designations, ...(f.designation ? [f.designation] : [])]));
  const deptOptions = Array.from(new Set([...state.departments, ...(f.department ? [f.department] : [])]));
  const contractorOptions = Array.from(new Set([...state.contractors, ...(f.contractor ? [f.contractor] : [])]));

  return `
    <header class="top">
      <div class="co">${COMPANY_NAME}</div>
      <div class="date title-mode">${isEdit ? 'Edit Worker Profile' : 'Add to Employee Library'}</div>
    </header>
    <main>
      <div class="field">
        <label for="f_name">Full Name</label>
        <input id="f_name" type="text" value="${escapeHtml(f.name || '')}" placeholder="Full name" autocomplete="off" />
      </div>

      <div class="field">
        <label>Category</label>
        <div class="segmented">
          <button type="button" class="${f.category === 'staff' ? 'on' : ''}" data-action="form-set-category" data-val="staff">Staff</button>
          <button type="button" class="${f.category === 'labor' ? 'on' : ''}" data-action="form-set-category" data-val="labor">Labor</button>
        </div>
      </div>

      ${isLabor ? `
        <div class="field">
          <div class="field-label-row">
            <label for="f_contractor">Contractor</label>
            <button type="button" class="form-link-btn" data-action="open-contractors">&#9881; Manage Contractors</button>
          </div>
          <select id="f_contractor">
            ${contractorOptions.map(
              (c) => `<option value="${escapeHtml(c)}" ${f.contractor === c ? 'selected' : ''}>${escapeHtml(c)}</option>`
            ).join('')}
          </select>
        </div>

        <div class="field">
          <label for="f_subcategory">Role / Skill</label>
          <select id="f_subcategory">
            ${DEFAULT_SUBCATEGORIES.map(
              (sub) => `<option value="${escapeHtml(sub)}" ${f.subCategory === sub ? 'selected' : ''}>${escapeHtml(sub)}</option>`
            ).join('')}
          </select>
        </div>
      ` : `
        <div class="field">
          <div class="field-label-row">
            <label for="f_designation">Staff Designation</label>
            <button type="button" class="form-link-btn" data-action="open-designations">&#9881; Manage Designations</button>
          </div>
          <select id="f_designation">
            ${desigOptions.map(
              (d) => `<option value="${escapeHtml(d)}" ${f.designation === d ? 'selected' : ''}>${escapeHtml(d)}</option>`
            ).join('')}
          </select>
        </div>
      `}

      <div class="row2">
        <div class="field">
          <label for="f_unit">Default Unit</label>
          <select id="f_unit">
            ${MANUFACTURING_UNITS.map(
              (u) => `<option value="${escapeHtml(u)}" ${f.unit === u ? 'selected' : ''}>${escapeHtml(u)}</option>`
            ).join('')}
          </select>
        </div>

        <div class="field">
          <div class="field-label-row">
            <label for="f_department">Department</label>
            <button type="button" class="form-link-btn" data-action="open-departments">&#9881; Manage</button>
          </div>
          <select id="f_department">
            ${deptOptions.map(
              (d) => `<option value="${escapeHtml(d)}" ${f.department === d ? 'selected' : ''}>${escapeHtml(d)}</option>`
            ).join('')}
          </select>
        </div>
      </div>

      <div class="field">
        <label for="f_status">Employment Status</label>
        <select id="f_status">
          <option value="active" ${f.status === 'active' ? 'selected' : ''}>Active (Normal Duty)</option>
          <option value="debarred" ${f.status === 'debarred' ? 'selected' : ''}>Debarred (Barred from Entry)</option>
          <option value="inactive" ${f.status === 'inactive' ? 'selected' : ''}>Left Company (Archive)</option>
        </select>
      </div>

      ${f.createdAt ? `
        <div class="field-static-info">
          <span>Added to Library on: <b>${escapeHtml(f.createdAt)}</b></span>
        </div>
      ` : ''}

      <div style="margin-top: 24px;">
        <button type="button" class="btn" data-action="save-worker-form">Save Worker</button>
        <div style="height: 10px;"></div>
        <button type="button" class="btn secondary" data-action="cancel-worker-form">Cancel</button>
      </div>
    </main>
  `;
}

function renderContractorsModal(state: AppState): string {
  return `
    <div class="modal-overlay" data-action="close-modal">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div class="modal-title">Manage Contractors</div>
          <button type="button" class="modal-close-btn" data-action="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="add-master-row">
            <input type="text" id="newContractorInput" placeholder="New Contractor Name" />
            <button type="button" class="btn btn-add-master" data-action="add-contractor-submit">Add</button>
          </div>

          <div class="master-list">
            ${state.contractors.map((c) => {
              const count = state.roster.filter((w) => w.contractor === c).length;
              return `
                <div class="master-item">
                  <div class="master-item-info">
                    <span class="master-item-name">${escapeHtml(c)}</span>
                    <span class="master-count">(${count} workers)</span>
                  </div>
                  <div class="master-actions">
                    <button type="button" class="btn-icon-edit" data-action="edit-contractor" data-name="${escapeHtml(c)}" title="Edit contractor name">&#9998; Edit</button>
                    <button type="button" class="del" data-action="delete-contractor" data-name="${escapeHtml(c)}" title="Delete contractor">&times;</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDepartmentsModal(state: AppState): string {
  return `
    <div class="modal-overlay" data-action="close-modal">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div class="modal-title">Manage Departments</div>
          <button type="button" class="modal-close-btn" data-action="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="add-master-row">
            <input type="text" id="newDepartmentInput" placeholder="New Department Name" />
            <button type="button" class="btn btn-add-master" data-action="add-department-submit">Add</button>
          </div>

          <div class="master-list">
            ${state.departments.map((d) => {
              const count = state.roster.filter((w) => w.department === d).length;
              return `
                <div class="master-item">
                  <div class="master-item-info">
                    <span class="master-item-name">${escapeHtml(d)}</span>
                    <span class="master-count">(${count} assigned)</span>
                  </div>
                  <div class="master-actions">
                    <button type="button" class="btn-icon-edit" data-action="edit-department" data-name="${escapeHtml(d)}" title="Edit department name">&#9998; Edit</button>
                    <button type="button" class="del" data-action="delete-department" data-name="${escapeHtml(d)}" title="Delete department">&times;</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDesignationsModal(state: AppState): string {
  return `
    <div class="modal-overlay" data-action="close-modal">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div class="modal-title">Manage Staff Designations</div>
          <button type="button" class="modal-close-btn" data-action="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="add-master-row">
            <input type="text" id="newDesignationInput" placeholder="New Designation Name" />
            <button type="button" class="btn btn-add-master" data-action="add-designation-submit">Add</button>
          </div>

          <div class="master-list">
            ${state.designations.map((d) => {
              const count = state.roster.filter((w) => w.designation === d).length;
              return `
                <div class="master-item">
                  <div class="master-item-info">
                    <span class="master-item-name">${escapeHtml(d)}</span>
                    <span class="master-count">(${count} staff)</span>
                  </div>
                  <div class="master-actions">
                    <button type="button" class="btn-icon-edit" data-action="edit-designation" data-name="${escapeHtml(d)}" title="Edit designation name">&#9998; Edit</button>
                    <button type="button" class="del" data-action="delete-designation" data-name="${escapeHtml(d)}" title="Delete designation">&times;</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderBulkImportModal(state: AppState): string {
  return `
    <div class="modal-overlay" data-action="close-modal">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div class="modal-title">Bulk Import Workers</div>
          <button type="button" class="modal-close-btn" data-action="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <p class="modal-desc">Paste a list of names (one per line) from WhatsApp or Excel:</p>

          <div class="field">
            <label for="bulk_names">Worker Names (One name per line)</label>
            <textarea id="bulk_names" rows="6" placeholder="Ramesh Kumar&#10;Suresh Patil&#10;Ganesh Shinde"></textarea>
          </div>

          <div class="field">
            <label for="bulk_category">Assign To</label>
            <select id="bulk_category">
              <option value="labor">Contract Labor</option>
              <option value="staff">Company Staff</option>
            </select>
          </div>

          <div class="field" id="bulk_contractor_wrap">
            <label for="bulk_contractor">Contractor</label>
            <select id="bulk_contractor">
              ${state.contractors.map(
                (c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`
              ).join('')}
            </select>
          </div>

          <div class="row2">
            <div class="field">
              <label for="bulk_unit">Unit</label>
              <select id="bulk_unit">
                <option value="UNIT I">UNIT I</option>
                <option value="UNIT II">UNIT II</option>
                <option value="UNIT III">UNIT III</option>
              </select>
            </div>

            <div class="field">
              <label for="bulk_dept">Department</label>
              <select id="bulk_dept">
                ${state.departments.map(
                  (d) => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`
                ).join('')}
              </select>
            </div>
          </div>

          <button type="button" class="btn" data-action="bulk-import-submit">Import Workers</button>
        </div>
      </div>
    </div>
  `;
}

function renderRosterExportImportModal(): string {
  return `
    <div class="modal-overlay" data-action="close-modal">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div class="modal-title">Backup & Restore Library</div>
          <button type="button" class="modal-close-btn" data-action="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="sectionTitle">Export Library</div>
          <p class="modal-desc">Save employee library backup to <b>Downloads/BSP_Attendance/</b>:</p>
          <div class="row2">
            <button type="button" class="btn" data-action="export-roster-json">Export JSON</button>
            <button type="button" class="btn secondary" data-action="export-roster-csv">Export CSV</button>
          </div>

          <div class="sectionTitle" style="margin-top: 24px;">Import / Restore Library</div>
          <p class="modal-desc">Paste JSON or CSV data to restore or merge into library:</p>
          <textarea id="import_data_text" rows="5" placeholder="Paste JSON or CSV data here..."></textarea>
          <div class="row2" style="margin-top: 10px;">
            <button type="button" class="btn" data-action="import-roster-json-submit">Import JSON</button>
            <button type="button" class="btn secondary" data-action="import-roster-csv-submit">Import CSV</button>
          </div>

          <div class="sectionTitle" style="margin-top: 24px;">Factory Demo Data</div>
          <p class="modal-desc">Reload realistic Chakan manufacturing plant roster (4 contractors, 12 depts, 28 workers, daily check-ins):</p>
          <button type="button" class="btn secondary btn-demo-reset" data-action="load-demo-data">↺ Load Plant Demo Data</button>
        </div>
      </div>
    </div>
  `;
}

export function renderRoster(state: AppState): string {
  if (state.editingWorker) {
    return renderWorkerForm(state);
  }

  const currentFilter = state.rosterStatusFilter;

  // Filter workers based on status
  const activeCount = state.roster.filter((w) => w.status === 'active').length;
  const debarredCount = state.roster.filter((w) => w.status === 'debarred').length;
  const inactiveCount = state.roster.filter((w) => w.status === 'inactive').length;

  const filteredWorkers = state.roster.filter((w) => w.status === currentFilter);
  const staff = filteredWorkers.filter((w) => w.category === 'staff');
  const labor = filteredWorkers.filter((w) => w.category === 'labor');

  let html = `
    <header class="top">
      <div class="co">${COMPANY_NAME}</div>
      <div class="date title-mode">Employee Library (${state.roster.length})</div>
    </header>
    <main>
      <!-- Status Filter Tabs -->
      <div class="roster-status-tabs">
        <button
          type="button"
          class="status-tab ${currentFilter === 'active' ? 'active' : ''}"
          data-action="set-roster-filter"
          data-status="active"
        >
          Active (${activeCount})
        </button>
        <button
          type="button"
          class="status-tab ${currentFilter === 'debarred' ? 'active tab-debarred' : ''}"
          data-action="set-roster-filter"
          data-status="debarred"
        >
          Debarred (${debarredCount})
        </button>
        <button
          type="button"
          class="status-tab ${currentFilter === 'inactive' ? 'active' : ''}"
          data-action="set-roster-filter"
          data-status="inactive"
        >
          Left (${inactiveCount})
        </button>
      </div>

      <!-- Action Toolbar -->
      <div class="toolbar">
        <button type="button" class="btn" data-action="add-staff">+ Staff</button>
        <button type="button" class="btn" data-action="add-labor">+ Laborer</button>
      </div>

      <!-- Masters & Management Secondary Bar -->
      <div class="master-toolbar-scroll">
        <button type="button" class="btn-pill" data-action="open-contractors">Contractors (${state.contractors.length})</button>
        <button type="button" class="btn-pill" data-action="open-departments">Departments (${state.departments.length})</button>
        <button type="button" class="btn-pill" data-action="open-designations">Designations (${state.designations.length})</button>
        <button type="button" class="btn-pill" data-action="open-bulk-import">Bulk Paste</button>
        <button type="button" class="btn-pill" data-action="open-export-import">Backup / Sync</button>
      </div>
  `;

  if (staff.length > 0) {
    html += `<div class="sectionTitle">Staff (${staff.length})</div>`;
    staff.forEach((w) => {
      html += `
        <div class="rosterRow ${w.status === 'debarred' ? 'row-debarred' : ''}">
          <div class="info" data-action="edit-worker" data-id="${w.id}">
            <div class="name-row">
              <span class="name">${escapeHtml(w.name)}</span>
              ${w.status === 'debarred' ? `<span class="badge badge-debarred">DEBARRED</span>` : ''}
              <span class="badge badge-unit">${escapeHtml(w.unit)}</span>
            </div>
            <div class="meta">${escapeHtml(w.department || 'Staff')} · ${escapeHtml(w.designation || 'Staff Member')} · Added: ${escapeHtml(w.createdAt)}</div>
          </div>
          <button type="button" class="del" data-action="delete-worker" data-id="${w.id}" title="Delete worker">&times;</button>
        </div>
      `;
    });
  }

  if (labor.length > 0) {
    html += `<div class="sectionTitle" style="margin-top: 20px;">Contract Labourers (${labor.length})</div>`;
    const byContractor = groupBy(labor, (w) => w.contractor || 'Other');
    byContractor.forEach((list, c) => {
      html += `<div class="contractor-label">${escapeHtml(c)} (${list.length})</div>`;
      list.forEach((w) => {
        html += `
          <div class="rosterRow ${w.status === 'debarred' ? 'row-debarred' : ''}">
            <div class="info" data-action="edit-worker" data-id="${w.id}">
              <div class="name-row">
                <span class="name">${escapeHtml(w.name)}</span>
                ${w.status === 'debarred' ? `<span class="badge badge-debarred">DEBARRED</span>` : ''}
                <span class="badge badge-unit">${escapeHtml(w.unit)}</span>
              </div>
              <div class="meta">${escapeHtml(w.subCategory || 'Helper')} · ${escapeHtml(w.department || 'Welding')} · Added: ${escapeHtml(w.createdAt)}</div>
            </div>
            <button type="button" class="del" data-action="delete-worker" data-id="${w.id}" title="Delete laborer">&times;</button>
          </div>
        `;
      });
    });
  }

  if (filteredWorkers.length === 0) {
    html += `
      <div class="empty">
        <p>No workers in <b>${escapeHtml(currentFilter.toUpperCase())}</b> list.</p>
        ${currentFilter === 'active' ? `<p>Tap <b>+ Staff</b>, <b>+ Laborer</b>, or <b>Bulk Paste</b> above to add employees.</p>` : ''}
      </div>
    `;
  }

  html += '</main>';

  // Render modals
  if (state.activeModal === 'contractors') {
    html += renderContractorsModal(state);
  } else if (state.activeModal === 'departments') {
    html += renderDepartmentsModal(state);
  } else if (state.activeModal === 'designations') {
    html += renderDesignationsModal(state);
  } else if (state.activeModal === 'bulk-import') {
    html += renderBulkImportModal(state);
  } else if (state.activeModal === 'roster-export-import') {
    html += renderRosterExportImportModal();
  }

  return html;
}
