import React from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import AppCard from '../../features/apps/AppCard';

const FeaturedAppsSection = ({ featuredApps, loading, error }) => (
  <Box>
    <Typography variant="h4" gutterBottom>Öne Çıkan Uygulamalar</Typography>
    {loading ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    ) : error ? (
      <Typography color="error">{error}</Typography>
    ) : (
      <Grid container spacing={4}>
        {featuredApps.map(app => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={app.id}>
            <AppCard app={app} />
          </Grid>
        ))}
      </Grid>
    )}
  </Box>
);

export default FeaturedAppsSection;

