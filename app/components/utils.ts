import type { ChipProps } from '@mui/material';

import type { MachineAttribute, Status } from './types';

export const MACHINE_ATTRIBUTES: MachineAttribute[] = [
  { key: 'status', label: 'Status' },
  { key: 'machine_type', label: 'Machine Type' },
  { key: 'id', label: 'Id' },
  { key: 'install_date', label: 'Install Date' },
  { key: 'last_maintenance', label: 'Last Maintenance' },
  { key: 'floor', label: 'Floor' },
  { key: 'longitude', label: 'Longitude' },
  { key: 'latitude', label: 'Latitude' }
] as const;

export const EVENT_ATTRIBUTE = { key: 'events', label: 'Events' };
export function getMachineAttribute(attributeKey: string) {
  return [...MACHINE_ATTRIBUTES, EVENT_ATTRIBUTE].find((attribute) => attribute.key === attributeKey);
}

export const STATUS_COLORS: { [key in Status]: ChipProps['color'] } = {
  idle: 'default',
  running: 'success',
  finished: 'info',
  errored: 'error'
};
