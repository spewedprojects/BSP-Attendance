import { COMPANY_NAME, MANUFACTURING_UNITS } from '../constants';
import type { AppState } from '../types';
import { escapeHtml, fmtDateHeader, generateCsvString, groupBy } from '../utils';

export function buildReportText(state: AppState): string {
  const activeStaff = state.roster.filter(
    (w) => w.category === 'staff' && w.status !== 'inactive'
  );
  const activeLabor = state.roster.filter(
    (w) => w.category === 'labor' && w.status !== 'inactive'
  );

  const staffPresent = activeStaff.filter(
    (w) => state.dailyRecord.allocations[w.id]?.present
  );
  const laborPresent = activeLabor.filter(
    (w) => state.dailyRecord.allocations[w.id]?.present
  );
  const totalPresent = staffPresent.length + laborPresent.length;

  const lines: string[] = [];
  lines.push(COMPANY_NAME);
  lines.push(`Morning Manpower Report — ${fmtDateHeader(state.currentDate)}`);
  lines.push('');
  lines.push(`Staff present: ${staffPresent.length} / ${activeStaff.length}`);
  lines.push(`Labor present: ${laborPresent.length} / ${activeLabor.length}`);
  lines.push(`Total on floor: ${totalPresent}`);
  lines.push('');

  // Unit-wise split
  lines.push('--- By Unit ---');
  for (const unit of MANUFACTURING_UNITS) {
    const inUnit = [...staffPresent, ...laborPresent].filter((w) => {
      const alloc = state.dailyRecord.allocations[w.id];
      return (alloc?.unit || w.unit) === unit;
    });
    lines.push(`${unit}: ${inUnit.length}`);
  }
  lines.push('');

  // Contractor-wise split
  lines.push('--- By Contractor ---');
  const laborByContractor = groupBy(activeLabor, (w) => w.contractor || 'Other');
  for (const [c, list] of laborByContractor.entries()) {
    const pres = list.filter((w) => state.dailyRecord.allocations[w.id]?.present).length;
    lines.push(`${c}: ${pres} / ${list.length}`);
  }
  lines.push('');

  // Work assigned breakdown (labor present)
  lines.push('--- By Work / Department (Labor Present) ---');
  if (laborPresent.length === 0) {
    lines.push('None present');
  } else {
    const byWork = groupBy(laborPresent, (w) => {
      const alloc = state.dailyRecord.allocations[w.id];
      return alloc?.department || alloc?.work || w.department || 'General';
    });
    for (const [work, list] of byWork.entries()) {
      lines.push(`${work}: ${list.length}`);
    }
  }
  lines.push('');

  // Shift split
  lines.push('--- Shift Split (Present) ---');
  const allPresent = [...staffPresent, ...laborPresent];
  const dayCount = allPresent.filter(
    (w) => (state.dailyRecord.allocations[w.id]?.shift || 'Day') === 'Day'
  ).length;
  const nightCount = allPresent.filter(
    (w) => state.dailyRecord.allocations[w.id]?.shift === 'Night'
  ).length;
  lines.push(`Day Shift: ${dayCount}   Night Shift: ${nightCount}`);
  lines.push('');

  // Verification status
  const verifiedMap = state.dailyRecord.verifiedBy || {};
  const verifiedEntries = Object.entries(verifiedMap);
  if (verifiedEntries.length > 0) {
    lines.push('--- HOD Verification ---');
    for (const [dept, verifier] of verifiedEntries) {
      lines.push(`${dept}: Verified by ${verifier}`);
    }
    lines.push('');
  }

  // Absent list
  lines.push('--- Absent List ---');
  const absentStaff = activeStaff.filter(
    (w) => !state.dailyRecord.allocations[w.id]?.present
  );
  const absentLabor = activeLabor.filter(
    (w) => !state.dailyRecord.allocations[w.id]?.present
  );

  if (absentStaff.length === 0 && absentLabor.length === 0) {
    lines.push('None (100% attendance)');
  } else {
    absentStaff.forEach((w) => {
      lines.push(`Staff: ${w.name} (${w.designation || 'Staff'})`);
    });
    absentLabor.forEach((w) => {
      lines.push(`${w.contractor || 'Labor'}: ${w.name} (${w.subCategory || 'Helper'})`);
    });
  }

  return lines.join('\n');
}

export function buildSummaryCsv(state: AppState): string {
  const activeStaff = state.roster.filter(
    (w) => w.category === 'staff' && w.status !== 'inactive'
  );
  const activeLabor = state.roster.filter(
    (w) => w.category === 'labor' && w.status !== 'inactive'
  );

  const staffPres = activeStaff.filter(
    (w) => state.dailyRecord.allocations[w.id]?.present
  ).length;
  const laborPres = activeLabor.filter(
    (w) => state.dailyRecord.allocations[w.id]?.present
  ).length;

  const headers = ['Metric', 'Present', 'Total Roster'];
  const rows: (string | number)[][] = [
    ['Date', state.currentDate, ''],
    ['Staff Attendance', staffPres, activeStaff.length],
    ['Contract Labor Attendance', laborPres, activeLabor.length],
    ['Total Floor Count', staffPres + laborPres, activeStaff.length + activeLabor.length],
  ];

  // Contractor breakdown
  const laborByContractor = groupBy(activeLabor, (w) => w.contractor || 'Other');
  for (const [c, list] of laborByContractor.entries()) {
    const pres = list.filter((w) => state.dailyRecord.allocations[w.id]?.present).length;
    rows.push([`Contractor: ${c}`, pres, list.length]);
  }

  return generateCsvString(headers, rows);
}

export function buildDetailedCsv(state: AppState): string {
  const activeWorkers = state.roster.filter((w) => w.status !== 'inactive');
  const headers = [
    'Date',
    'Worker ID',
    'Name',
    'Category',
    'Contractor',
    'Present',
    'Department',
    'Unit',
    'Role / Designation',
    'Shift',
    'Supervisor',
    'Check-in Time',
    'Remarks',
  ];

  const rows: (string | number)[][] = activeWorkers.map((w) => {
    const alloc = state.dailyRecord.allocations[w.id];
    return [
      state.currentDate,
      w.id,
      w.name,
      w.category,
      w.contractor || '',
      alloc?.present ? 'YES' : 'NO',
      alloc?.department || alloc?.work || w.department || '',
      alloc?.unit || w.unit || 'UNIT I',
      alloc?.subCategory || w.subCategory || w.designation || '',
      alloc?.shift || 'Day',
      alloc?.supervisor || '',
      alloc?.checkInTime || '',
      alloc?.remarks || '',
    ];
  });

  return generateCsvString(headers, rows);
}

export function renderReport(state: AppState): string {
  const reportText = buildReportText(state);

  return `
    <header class="top">
      <div class="co">${COMPANY_NAME}</div>
      <div class="date title-mode">Manpower Report — ${fmtDateHeader(state.currentDate)}</div>
    </header>
    <main>
      <div class="reportBox" id="reportText">${escapeHtml(reportText)}</div>

      <div class="report-actions-grid">
        <button type="button" class="btn" data-action="copy-report">
          Copy Report Text
        </button>
        <button type="button" class="btn btn-share" data-action="share-report">
          Share (WhatsApp / Email)
        </button>
        <button type="button" class="btn secondary" data-action="export-summary-csv">
          Export Summary CSV
        </button>
        <button type="button" class="btn secondary" data-action="export-detailed-csv">
          Export Detailed CSV
        </button>
      </div>
    </main>
  `;
}
