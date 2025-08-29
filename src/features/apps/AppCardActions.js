import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const AppCardActions = ({ onNavigate }) => (
  <Tooltip title="Detaylar">
    <IconButton
      onClick={e => {
        e.stopPropagation();
        if (onNavigate) onNavigate();
      }}
      sx={{ color: '#888' }}
    >
      <ChevronRightIcon />
    </IconButton>
  </Tooltip>
);

export default AppCardActions;
