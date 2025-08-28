import React from 'react';
import { Typography } from '@mui/material';

const AppDescription = ({ shortDescription, description }) => (
  <>
    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1976d2' }}>
      Kısa Açıklama
    </Typography>
    <Typography variant="body1" sx={{ mb: 4, fontSize: 20, fontWeight: 500, color: '#222' }}>
      {shortDescription || 'Bu uygulama için kısa açıklama bulunmamaktadır.'}
    </Typography>
    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1976d2' }}>
      Detaylı Açıklama
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: 17 }}>
      {description || 'Bu uygulama için detaylı açıklama bulunmamaktadır.'}
    </Typography>
  </>
);

export default AppDescription;

