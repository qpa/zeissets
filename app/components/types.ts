export type Status = 'idle' | 'running' | 'finished' | 'errored' | 'repaired';

export type Event = {
  timestamp: string;
  status: Status;
};

export type Machine = {
  id: string;
  machine_type: 'microscope' | 'measurement';
  status: Status;
  floor: number;
  longitude: number;
  latitude: number;
  last_maintenance: string;
  install_date: string;
};

export type MachineDetails = Machine & {
  events: Event[];
};

export type MachineAttribute = {
  key: keyof Machine;
  label: string;
};

export type MachineEvent = Event & {
  machine_id: Machine['id'];
  id: string;
};
