import React from 'react';
import { Box, Avatar, Typography, Chip } from '@mui/material';
import StarRating from '../../components/common/StarRating';

const AppCardHeader = ({ app }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
    <Avatar
      src={app.iconUrl || app.image || ''}
      alt={app.name}
      sx={{
        width: 52,
        height: 52,
        bgcolor: '#f5f5f5',
        border: '1px solid #eee',
        fontSize: 20,
        fontWeight: 600,
        mr: 1.5,
        color: '#888'
      }}
    >
      {(!app.iconUrl && !app.image) ? app.name?.[0]?.toUpperCase() : null}
    </Avatar>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          fontSize: 15,
          lineHeight: 1.3,
          mb: 0.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: '#222'
        }}
      >
        {app.name}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          fontSize: 11,
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'block',
          color: '#888'
        }}
      >
        {(typeof app.developer === 'object' && app.developer !== null) ? (app.developer.displayName || app.developer.username || 'Geliştirici Bilinmiyor') : (app.developer || app.developerName || 'Geliştirici Bilinmiyor')}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
          <StarRating rating={app.rating} size={14} />
          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 11, ml: 0.5, color: '#888' }}>
            {app.rating ? app.rating.toFixed(1) : '0.0'}
          </Typography>
        </Box>
        {app.isPremium && (
          <Chip
            label="Premium"
            size="small"
            sx={{
              bgcolor: '#f5f5f5',
              color: '#888',
              fontWeight: '600',
              fontSize: '10px',
              height: '18px',
              ml: 'auto',
              borderRadius: 1,
              border: '1px solid #eee'
            }}
          />
        )}
      </Box>
    </Box>
  </Box>
);

export default AppCardHeader;

