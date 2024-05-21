import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

import type { Machine } from '@/app/components/types';
import { useMachineLoad } from './useMachineLoad';
import MachineCard from './MachineCard';

export type MachineContentProps = {
  machine: Machine;
  onClose: () => void;
};

export function MachineContent({ machine: machineProp, onClose }: MachineContentProps) {
  const { machine, isLoading } = useMachineLoad(machineProp);

  return <MachineCard machine={machine} isLoading={isLoading} onClose={onClose} />;
}

export type MachineDialogProps = {
  machine: Machine | undefined;
  onClose: () => void;
};
export default function MachineDialog({ machine, onClose }: MachineDialogProps) {
  return !machine?.id ? undefined : (
    <Dialog open={!!machine?.id} onClose={onClose}>
      <MachineContent machine={machine} onClose={onClose} />
    </Dialog>
  );
}
