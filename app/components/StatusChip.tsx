import * as React from 'react';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import type { Status } from './types';
import { STATUS_COLORS } from './utils';

export type StatusChipProps = { status: Status };

export default function StatusChip({ status }: StatusChipProps) {
  return (
    <Chip size="small"
      label={
        <Typography
          variant="caption"
          sx={{
            textTransform: 'capitalize'
          }}>
          {status}
        </Typography>
      }
      color={STATUS_COLORS[status]}
    />
  );
}
