import React from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import AppCard from '../../features/apps/AppCard';

const FeaturedAppsSection = ({ featuredApps, loading, error }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Öne Çıkan Uygulamalar</Typography>
    {loading ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    ) : error ? (
      <Typography color="error">{error}</Typography>
    ) : (
      <Grid container spacing={4} justifyContent="center">
        {featuredApps.map(app => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={app.id} display="flex" justifyContent="center">
            <AppCard app={app} />
          </Grid>
        ))}
      </Grid>
    )}
  </Box>
);

export default FeaturedAppsSection;
