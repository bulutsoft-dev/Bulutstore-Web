import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBreadcrumbs from '../components/common/Breadcrumbs';

const NotFoundPage = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', px: { xs: 2, sm: 4 } }}>
    <AppBreadcrumbs extraLabels={[null, 'Sayfa Bulunamadı']} />
    <Typography variant="h2" fontWeight={800} color="error" mb={2}>404 - Not Found</Typography>
    <Typography variant="h6" color="text.secondary" mb={2}>Aradığınız sayfa bulunamadı.</Typography>
    <Typography variant="body1" color="text.secondary">Lütfen adresi kontrol edin veya anasayfaya dönün.</Typography>
  </Box>
);

export default NotFoundPage;
