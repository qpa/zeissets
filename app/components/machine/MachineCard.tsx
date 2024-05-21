import * as React from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Skeleton from '@mui/material/Skeleton';

import type { MachineDetails } from '@/app/components/types';
import { getMachineAttribute } from '@/app/components/utils';
import StatusChip from '@/app/components/StatusChip';

type MachineCardProps = {
  isLoading: boolean;
  machine: MachineDetails;
  onClose: () => void;
};

export default function MachineCard({ isLoading, machine, onClose }: MachineCardProps) {
  const { events, floor, id, install_date, last_maintenance, latitude, longitude, machine_type, status } = machine;

  return (
    <Card sx={{ minWidth: 500 }}>
      <CardHeader
        avatar={<StatusChip status={status} />}
        action={
          <IconButton aria-label="settings" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
        title={machine_type.toUpperCase()}
        subheader={id}
      />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 1
          }}>
          <List>
            <ListItem>
              <ListItemText primary={getMachineAttribute('floor')?.label} secondary={floor} />
            </ListItem>
            <ListItem>
              <ListItemText primary={getMachineAttribute('latitude')?.label} secondary={latitude} />
            </ListItem>
            <ListItem>
              <ListItemText primary={getMachineAttribute('longitude')?.label} secondary={longitude} />
            </ListItem>
          </List>
          <List>
            <ListItem>
              <ListItemText primary={getMachineAttribute('install_date')?.label} secondary={install_date} />
            </ListItem>
            <ListItem>
              <ListItemText primary={getMachineAttribute('last_maintenance')?.label} secondary={last_maintenance} />
            </ListItem>
            <ListItem>
              <ListItemText primary={getMachineAttribute('events')?.label} />
            </ListItem>
            <List sx={{ maxHeight: '30vh', overflowY: 'auto' }}>
              {isLoading ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 1
                  }}>
                  <Skeleton variant="circular" width={64} height={40} />
                  <Skeleton variant="rectangular" width={180} height={20} />
                </Box>
              ) : (
                events.map((event) => {
                  return (
                    <ListItem key={event.timestamp}>
                      <ListItemAvatar sx={{ minWidth: 72 }}>
                        <StatusChip status={event.status} />
                      </ListItemAvatar>
                      <ListItemText secondary={event.timestamp} />
                    </ListItem>
                  );
                })
              )}
            </List>
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}
