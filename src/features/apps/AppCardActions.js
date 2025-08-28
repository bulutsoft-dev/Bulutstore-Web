import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const AppCardActions = ({ onShare, onNavigate }) => (
  <>
    <Tooltip title="Paylaş">
      <IconButton
        onClick={e => {
          e.stopPropagation();
          if (onShare) onShare();
        }}
        sx={{
          color: '#888',
          background: '#fff',
          border: '1px solid #eee',
          p: 0.5,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          '&:hover': {
            background: '#f5f5f5',
            color: '#222',
            borderColor: '#d0d0d0'
          }
        }}
      >
        <ShareIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Detaylar">
      <IconButton
        onClick={e => {
          e.stopPropagation();
          if (onNavigate) onNavigate();
        }}
        sx={{ color: '#888', ml: 1 }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Tooltip>
  </>
);

export default AppCardActions;

