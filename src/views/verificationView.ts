import { COMPANY_NAME } from '../constants';
import type { AppState, Worker } from '../types';
import { escapeHtml, fmtDateHeader, groupBy } from '../utils';

export function renderVerification(state: AppState): string {
  const staffMembers = state.roster.filter(
    (w) => w.category === 'staff' && w.status !== 'inactive'
  );

  // Group all present workers by their assigned department for the day
  const presentWorkers: { worker: Worker; dept: string }[] = [];
  for (const w of state.roster) {
    if (w.status === 'inactive') continue;
    const alloc = state.dailyRecord.allocations[w.id];
    if (alloc?.present) {
      const dept = alloc.department || w.department || 'Welding';
      presentWorkers.push({ worker: w, dept });
    }
  }

  const byDept = groupBy(presentWorkers, (item) => item.dept);

  // All active departments with workers present or on default list
  const activeDepts = Array.from(
    new Set([...Array.from(byDept.keys()), ...state.departments.slice(0, 7)])
  ).filter((d) => (byDept.get(d) || []).length > 0);

  const verifiedMap = state.dailyRecord.verifiedBy || {};
  const totalDepts = activeDepts.length;
  const verifiedDeptsCount = activeDepts.filter((d) => Boolean(verifiedMap[d])).length;

  let html = `
    <header class="top">
      <div class="co">${COMPANY_NAME}</div>
      <div class="date title-mode">HOD Verification — ${fmtDateHeader(state.currentDate)}</div>
    </header>
    <main>
      <div class="verify-progress-card">
        <div class="progress-title">Department Sign-Off Progress</div>
        <div class="progress-bar-bg">
          <div
            class="progress-bar-fill"
            style="width: ${totalDepts ? (verifiedDeptsCount / totalDepts) * 100 : 0}%"
          ></div>
        </div>
        <div class="progress-stats">
          <span>${verifiedDeptsCount} of ${totalDepts} departments verified</span>
          <span class="progress-percent">${totalDepts ? Math.round((verifiedDeptsCount / totalDepts) * 100) : 0}%</span>
        </div>
      </div>
  `;

  if (activeDepts.length === 0) {
    html += `
      <div class="empty">
        <p>No workers have been marked present for ${fmtDateHeader(state.currentDate)} yet.</p>
        <p>Mark attendance in the <b>TODAY</b> tab first, then come back here for HOD verification.</p>
      </div>
    `;
    html += '</main>';
    return html;
  }

  for (const dept of activeDepts) {
    const list = byDept.get(dept) || [];
    const staffCount = list.filter((i) => i.worker.category === 'staff').length;
    const laborCount = list.filter((i) => i.worker.category === 'labor').length;
    const isVerified = Boolean(verifiedMap[dept]);
    const verifierName = verifiedMap[dept] || '';

    html += `
      <div class="verify-card ${isVerified ? 'verified-card' : ''}">
        <div class="verify-card-header">
          <div>
            <div class="dept-title">${escapeHtml(dept)}</div>
            <div class="dept-counts">
              <span>Staff: <b>${staffCount}</b></span> · 
              <span>Labor: <b>${laborCount}</b></span> · 
              <span>Total: <b>${staffCount + laborCount}</b></span>
            </div>
          </div>
          <div>
            ${isVerified ? `<span class="badge badge-verified">VERIFIED</span>` : `<span class="badge badge-pending">PENDING</span>`}
          </div>
        </div>

        <div class="verify-card-action">
          <label class="verify-label">Verified by Department Head:</label>
          <div class="verify-select-row">
            <select class="verify-select" data-dept="${escapeHtml(dept)}" id="sel_verify_${escapeHtml(dept)}">
              <option value="">-- Select Verifying HOD / Staff --</option>
              ${staffMembers.map(
                (s) => `<option value="${escapeHtml(s.name)}" ${verifierName === s.name ? 'selected' : ''}>${escapeHtml(s.name)} (${escapeHtml(s.designation || 'Staff')})</option>`
              ).join('')}
            </select>
            ${isVerified ? `
              <button type="button" class="btn secondary btn-unverify" data-action="unverify-dept" data-dept="${escapeHtml(dept)}">Clear</button>
            ` : `
              <button type="button" class="btn btn-verify-submit" data-action="confirm-verify-dept" data-dept="${escapeHtml(dept)}">Sign Off</button>
            `}
          </div>
          ${isVerified ? `<div class="verified-timestamp">Signed off by: <b>${escapeHtml(verifierName)}</b></div>` : ''}
        </div>
      </div>
    `;
  }

  html += '</main>';
  return html;
}
