import React from 'react';
import { Box, Typography } from '@mui/material';

const AppScreenshots = ({ screenshots }) => {
  if (!Array.isArray(screenshots) || screenshots.length === 0) return null;
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1976d2' }}>Ekran Görüntüleri</Typography>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
        {screenshots.map((url, idx) => (
          <Box key={idx} sx={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // No box, border, shadow, radius, padding, position
          }}>
            <img
              src={url}
              alt={`Screenshot ${idx + 1}`}
              style={{
                maxHeight: 380,
                maxWidth: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                border: 'none',
                borderRadius: 0,
                background: 'transparent',
                boxShadow: 'none',
                padding: 0,
                margin: 0
              }}
              onError={e => {
                if (e.target.src !== window.location.origin + '/no-image.png' && !e.target.src.endsWith('/no-image.png')) {
                  e.target.onerror = null;
                  e.target.src = '/no-image.png';
                }
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AppScreenshots;

