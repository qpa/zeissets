'use server';
import * as React from 'react';

import { loadMachines } from './loadMachines';
import MachinesTable from './MachinesTable';

export default async function Machines() {
  const machines = await loadMachines();

  return <MachinesTable machines={machines} />;
}
