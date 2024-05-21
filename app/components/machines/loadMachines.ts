'use server';
import { BASE_API_DOMAIN } from '@/app/config';
import type { Machine, MachineDetails } from '@/app/components/types';

const MACHINES_API_PATH = '/api/v1/machines';

export async function loadMachines() {
  const response = await fetch(`https://${BASE_API_DOMAIN}${MACHINES_API_PATH}`);
  if (!response.ok) {
    throw new Error('Failed to load Machines');
  }
  const result = await response.json();
  return result.data as Machine[];
}
