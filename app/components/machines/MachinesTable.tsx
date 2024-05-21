'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import StatusChip from '@/app/components/StatusChip';
import type { Machine, Status } from '@/app/components/types';
import { MACHINE_ATTRIBUTES } from '@/app/components/utils';
import MachineDialog from '@/app/components/machine/MachineDialog';
import { useMachines } from './useMachines';

export type MachinesTableProps = { machines: Machine[] };

export default function MachinesTable({ machines: machinesProp }: MachinesTableProps) {
  const { machines, selectedMachine, setSelectedMachine } = useMachines(machinesProp);

  function handleRowClick(machine: Machine) {
    setSelectedMachine((prevSelectedMachine) => (prevSelectedMachine?.id === machine.id ? undefined : machine));
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1
        }}>
        <TableContainer sx={{ maxHeight: '80vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {MACHINE_ATTRIBUTES.map((attribute) => (
                  <TableCell key={attribute.key} align="left">
                    {attribute.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {machines.map((machine) => {
                return (
                  <TableRow
                    hover
                    sx={{ cursor: 'pointer' }}
                    role="checkbox"
                    tabIndex={-1}
                    key={machine.id}
                    selected={machine.id === selectedMachine?.id}
                    onClick={() => handleRowClick(machine)}>
                    {MACHINE_ATTRIBUTES.map((attribute) => {
                      const value = machine[attribute.key];
                      return (
                        <TableCell key={attribute.key} align="left">
                          {attribute.key === 'status' ? (
                            <StatusChip status={value as Status} />
                          ) : (
                            <Typography
                              variant="caption"
                              sx={{
                                ...(attribute.key === 'machine_type' && { textTransform: 'uppercase' })
                              }}>
                              {value}
                            </Typography>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <MachineDialog machine={selectedMachine} onClose={() => setSelectedMachine(undefined)} />
      </Box>
    </Paper>
  );
}
