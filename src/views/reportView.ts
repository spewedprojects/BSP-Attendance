import { COMPANY_NAME, CONTRACTORS } from '../constants';
import type { AppState, Worker } from '../types';
import { escapeHtml, fmtDateHeader, groupBy } from '../utils';

export function buildReportText(state: AppState): string {
  const staff = state.roster.filter((w) => w.category === 'staff');
  const labor = state.roster.filter((w) => w.category === 'labor');
  const presIds = new Set(state.attendance[state.currentDate] || []);

  const staffPresent = staff.filter((w) => presIds.has(w.id));
  const laborPresent = labor.filter((w) => presIds.has(w.id));
  const totalPresent = staffPresent.length + laborPresent.length;

  const lines: string[] = [];
  lines.push(COMPANY_NAME);
  lines.push(`Attendance Report — ${fmtDateHeader(state.currentDate)}`);
  lines.push('');
  lines.push(`Staff present: ${staffPresent.length} / ${staff.length}`);
  lines.push(`Labor present: ${laborPresent.length} / ${labor.length}`);
  lines.push(`Total on floor: ${totalPresent}`);
  lines.push('');

  lines.push('--- By contractor ---');
  const laborByContractor = groupBy(labor, (w) => w.contractor || 'Other');
  for (const c of CONTRACTORS) {
    const list = laborByContractor.get(c) || [];
    if (list.length > 0) {
      const p = list.filter((w) => presIds.has(w.id)).length;
      lines.push(`${c}: ${p} / ${list.length}`);
    }
  }
  laborByContractor.forEach((list, c) => {
    if (CONTRACTORS.includes(c as any)) return;
    const p = list.filter((w) => presIds.has(w.id)).length;
    lines.push(`${c}: ${p} / ${list.length}`);
  });
  lines.push('');

  lines.push('--- By work assigned (labor present) ---');
  const byWork = groupBy(laborPresent, (w) => w.work || 'Other');
  if (laborPresent.length === 0) {
    lines.push('None present');
  } else {
    byWork.forEach((list, workName) => {
      lines.push(`${workName}: ${list.length}`);
    });
  }
  lines.push('');

  lines.push('--- Shift split (present) ---');
  const allPresent: Worker[] = [...staffPresent, ...laborPresent];
  const dayCount = allPresent.filter((w) => w.shift === 'Day').length;
  const nightCount = allPresent.filter((w) => w.shift === 'Night').length;
  lines.push(`Day: ${dayCount}   Night: ${nightCount}`);
  lines.push('');

  lines.push('--- Absent ---');
  const absentStaff = staff.filter((w) => !presIds.has(w.id));
  const absentLabor = labor.filter((w) => !presIds.has(w.id));
  if (absentStaff.length === 0 && absentLabor.length === 0) {
    lines.push('None (100% attendance)');
  } else {
    absentStaff.forEach((w) => {
      lines.push(`Staff: ${w.name}`);
    });
    absentLabor.forEach((w) => {
      lines.push(`${w.contractor || 'Labor'}: ${w.name} (${w.work || 'General'})`);
    });
  }

  return lines.join('\n');
}

export function renderReport(state: AppState): string {
  const reportText = buildReportText(state);

  return `
    <header class="top">
      <div class="co">${COMPANY_NAME}</div>
      <div class="date title-mode">Manpower Report</div>
    </header>
    <main>
      <div class="reportBox" id="reportText">${escapeHtml(reportText)}</div>
      <button type="button" class="btn" data-action="copy-report">Copy Report Text</button>
    </main>
  `;
}
