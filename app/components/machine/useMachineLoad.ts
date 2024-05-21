import * as React from 'react';
import useSWR from 'swr';

import { BASE_API_DOMAIN } from '@/app/config';
import type { Machine, MachineDetails } from '@/app/components/types';

const MACHINE_API_PATH = '/api/v1/machines/{machine_id}';

async function fetcher(...args: Parameters<typeof fetch>) {
  return (await fetch(...args)).json();
}

export function useMachineLoad(machineWithoutEvents: Machine) {
  const { id } = machineWithoutEvents;
  const { data, error, isLoading } = useSWR<{ data: MachineDetails }, Error>(
    `https://${BASE_API_DOMAIN}${MACHINE_API_PATH.replace('{machine_id}', id)}`,
    fetcher
  );
  if (!isLoading && error) {
    throw new Error(`Failed to load Machine with ID: ${id}`);
  }
  if (!isLoading && !data) {
    throw new Error(`No data about Machine with ID: ${id}`);
  }
  const machine = !data?.data ? { ...machineWithoutEvents, events: [] } : data?.data;
  return { machine, isLoading };
}
