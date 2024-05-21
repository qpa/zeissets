'use client';
import * as React from 'react';
import { PhoenixWebsocket } from 'phoenix-websocket';

import type { Machine, MachineEvent } from '@/app/components/types';

import { BASE_API_DOMAIN } from '@/app/config';

const SOCKET_API_PATH = '/socket';
const TOPIC = 'events';
const MESSAGE = 'new';

export function useMachineEvent() {
  const [machineEvent, setMachineEvent] = React.useState<MachineEvent>();

  React.useEffect(() => {
    const socket = new PhoenixWebsocket(`wss://${BASE_API_DOMAIN}${SOCKET_API_PATH}`);
    async function receiveEvent() {
      await socket.connect();
      socket.subscribeToTopic(TOPIC, undefined, {
        [MESSAGE]: (event: any) => {
          const mEvent = event as MachineEvent;
          setMachineEvent(mEvent);
        }
      });
      return socket;
    }
    return function () {
      socket.disconnect();
    };
  }, []);

  return machineEvent;
}
