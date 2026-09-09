import { Preferences } from '@capacitor/preferences';
import { STORAGE_KEYS } from './constants';
import type { Worker } from './types';

/**
 * Storage service interfacing with Capacitor Preferences.
 * Preserves the exact keys ('roster', 'attendance:YYYY-MM-DD') and JSON serialized format
 * from the original HTML application.
 */

export async function loadRoster(): Promise<Worker[]> {
  try {
    const { value } = await Preferences.get({ key: STORAGE_KEYS.ROSTER });
    return value ? JSON.parse(value) : [];
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

export async function loadAttendance(dateStr: string): Promise<string[]> {
  try {
    const { value } = await Preferences.get({
      key: `${STORAGE_KEYS.ATTENDANCE_PREFIX}${dateStr}`,
    });
    return value ? JSON.parse(value) : [];
  } catch (err) {
    console.error(`Failed to load attendance for ${dateStr}`, err);
    return [];
  }
}

export async function saveAttendance(dateStr: string, ids: string[]): Promise<void> {
  try {
    await Preferences.set({
      key: `${STORAGE_KEYS.ATTENDANCE_PREFIX}${dateStr}`,
      value: JSON.stringify(ids),
    });
  } catch (err) {
    console.error(`Failed to save attendance for ${dateStr}`, err);
  }
}
