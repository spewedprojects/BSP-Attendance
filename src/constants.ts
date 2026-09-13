import type { ManufacturingUnit } from './types';

export const MANUFACTURING_UNITS: readonly ManufacturingUnit[] = [
  'UNIT I',
  'UNIT II',
  'UNIT III',
] as const;

export const DEFAULT_SUBCATEGORIES = [
  'Helper',
  'Operator',
  'Welder',
  'Housekeeping',
] as const;

export const DEFAULT_DEPARTMENTS = [
  'Welding',
  'Laser',
  'Bending',
  'Painting',
  'Fitting',
  'Fabrication',
  'Assembly',
  'Quality',
  'Maintenance',
  'Store',
  'HR & Admin',
  'Accounts',
] as const;

export const DEFAULT_DESIGNATIONS = [
  'HOD / Department Head',
  'Senior Engineer',
  'Floor Supervisor',
  'Quality Inspector',
  'Shift Incharge',
  'Maintenance Engineer',
  'Production Engineer',
  'Store Incharge',
  'HR & Admin Officer',
  'Accounts Officer',
] as const;

export const DEFAULT_CONTRACTORS = [
  'Shree Ganesh Manpower',
  'Om Sai Enterprises',
  'Balaji Industrial Services',
  'TechnoFab Labor Supply',
] as const;

export const COMPANY_NAME = 'BSP Metatech LLP — Chakan';

export const STORAGE_KEYS = {
  ROSTER: 'roster',
  CONTRACTORS: 'bsp_contractors',
  DEPARTMENTS: 'bsp_departments',
  DESIGNATIONS: 'bsp_designations',
  DAILY_PREFIX: 'attendance:',
  COLLAPSED_SECTIONS: 'bsp_collapsed_sections',
} as const;

