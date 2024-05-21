'use client';
import * as React from 'react';
import { PhoenixWebsocket } from 'phoenix-websocket';

import type { Machine, MachineEvent } from '@/app/components/types';

import { BASE_API_DOMAIN } from '@/app/config';

const SOCKET_API_PATH = '/socket';
const TOPIC = 'events';
const MESSAGE = 'new';

export function useMachines(machinesAtFirstLoad: Machine[]) {
  const [machines, setMachines] = React.useState(machinesAtFirstLoad);

  const [selectedMachine, setSelectedMachine] = React.useState<Machine>();

  React.useEffect(() => {
    async function receiveEvent() {
      const socket = new PhoenixWebsocket(`wss://${BASE_API_DOMAIN}${SOCKET_API_PATH}`);
      await socket.connect();
      socket.subscribeToTopic(TOPIC, undefined, {
        [MESSAGE]: (event: any) => {
          const machineEvent = event as MachineEvent;
          setMachines((prevMachines) =>
            prevMachines.map((machine) => {
              const updatedMachine = { ...machine };
              if (machine.id === machineEvent.machine_id) {
                updatedMachine.status = machineEvent.status;
                if (selectedMachine?.id === updatedMachine.id) {
                  setSelectedMachine(updatedMachine);
                }
              }
              return updatedMachine;
            })
          );
        }
      });
    }
    receiveEvent();
  }, [selectedMachine?.id]);

  return { machines, selectedMachine, setSelectedMachine };
}
