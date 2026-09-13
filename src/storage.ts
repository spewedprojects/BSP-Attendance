import { Preferences } from '@capacitor/preferences';
import {
  DEFAULT_CONTRACTORS,
  DEFAULT_DEPARTMENTS,
  DEFAULT_DESIGNATIONS,
  STORAGE_KEYS,
} from './constants';

import type { DailyRecord, Worker } from './types';
import { todayStr } from './utils';

/**
 * Storage service interfacing with Capacitor Preferences.
 * Handles backward-compatible migrations and rich daily attendance records.
 */

export async function loadRoster(): Promise<Worker[]> {
  try {
    const { value } = await Preferences.get({ key: STORAGE_KEYS.ROSTER });
    if (!value) return [];
    const list = JSON.parse(value) as any[];

    // Migrate any legacy worker items
    return list.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category || 'labor',
      contractor: item.contractor,
      department: item.department || (item.category === 'staff' ? 'Production' : undefined),
      designation: item.designation || (item.category === 'staff' ? 'Staff Member' : undefined),
      subCategory: item.subCategory || (item.category === 'labor' ? 'Helper' : undefined),
      unit: item.unit || 'UNIT I',
      status: item.status || 'active',
      createdAt: item.createdAt || todayStr(),
    }));
  } catch (err) {
    console.error('Failed to load roster from preferences', err);
    return [];
  }
}

export async function saveRoster(roster: Worker[]): Promise<void> {
  try {
    await Preferences.set({
      key: STORAGE_KEYS.ROSTER,
      value: JSON.stringify(roster),
    });
  } catch (err) {
    console.error('Failed to save roster to preferences', err);
  }
}

export async function loadContractors(): Promise<string[]> {
  try {
    const { value } = await Preferences.get({ key: STORAGE_KEYS.CONTRACTORS });
    if (!value) return [...DEFAULT_CONTRACTORS];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_CONTRACTORS];
  } catch {
    return [...DEFAULT_CONTRACTORS];
  }
}

export async function saveContractors(contractors: string[]): Promise<void> {
  try {
    await Preferences.set({
      key: STORAGE_KEYS.CONTRACTORS,
      value: JSON.stringify(contractors),
    });
  } catch (err) {
    console.error('Failed to save contractors', err);
  }
}

export async function loadDepartments(): Promise<string[]> {
  try {
    const { value } = await Preferences.get({ key: STORAGE_KEYS.DEPARTMENTS });
    if (!value) return [...DEFAULT_DEPARTMENTS];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_DEPARTMENTS];
  } catch {
    return [...DEFAULT_DEPARTMENTS];
  }
}

export async function saveDepartments(departments: string[]): Promise<void> {
  try {
    await Preferences.set({
      key: STORAGE_KEYS.DEPARTMENTS,
      value: JSON.stringify(departments),
    });
  } catch (err) {
    console.error('Failed to save departments', err);
  }
}

export async function loadDesignations(): Promise<string[]> {
  try {
    const { value } = await Preferences.get({ key: STORAGE_KEYS.DESIGNATIONS });
    if (!value) return [...DEFAULT_DESIGNATIONS];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_DESIGNATIONS];
  } catch {
    return [...DEFAULT_DESIGNATIONS];
  }
}

export async function saveDesignations(designations: string[]): Promise<void> {
  try {
    await Preferences.set({
      key: STORAGE_KEYS.DESIGNATIONS,
      value: JSON.stringify(designations),
    });
  } catch (err) {
    console.error('Failed to save designations', err);
  }
}


export async function loadDailyRecord(dateStr: string): Promise<DailyRecord> {
  try {
    const { value } = await Preferences.get({
      key: `${STORAGE_KEYS.DAILY_PREFIX}${dateStr}`,
    });
    if (!value) {
      return { date: dateStr, allocations: {}, verifiedBy: {} };
    }

    const parsed = JSON.parse(value);

    // Handle legacy string array: ["w1", "w2"]
    if (Array.isArray(parsed)) {
      const legacyAllocations: DailyRecord['allocations'] = {};
      for (const id of parsed) {
        legacyAllocations[id] = {
          present: true,
          shift: 'Day',
          unit: 'UNIT I',
          supervisor: '',
        };
      }
      return {
        date: dateStr,
        allocations: legacyAllocations,
        verifiedBy: {},
      };
    }

    return {
      date: dateStr,
      allocations: parsed.allocations || {},
      verifiedBy: parsed.verifiedBy || {},
    };
  } catch (err) {
    console.error(`Failed to load daily record for ${dateStr}`, err);
    return { date: dateStr, allocations: {}, verifiedBy: {} };
  }
}

export async function saveDailyRecord(
  dateStr: string,
  record: DailyRecord
): Promise<void> {
  try {
    await Preferences.set({
      key: `${STORAGE_KEYS.DAILY_PREFIX}${dateStr}`,
      value: JSON.stringify(record),
    });
  } catch (err) {
    console.error(`Failed to save daily record for ${dateStr}`, err);
  }
}

export async function loadCollapsedSections(): Promise<Record<string, boolean>> {
  try {
    const { value } = await Preferences.get({
      key: STORAGE_KEYS.COLLAPSED_SECTIONS,
    });
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
}

export async function saveCollapsedSections(
  sections: Record<string, boolean>
): Promise<void> {
  try {
    await Preferences.set({
      key: STORAGE_KEYS.COLLAPSED_SECTIONS,
      value: JSON.stringify(sections),
    });
  } catch (err) {
    console.error('Failed to save collapsed sections', err);
  }
}
