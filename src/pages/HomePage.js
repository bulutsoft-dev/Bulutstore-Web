import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categoryApi';
import { getAllApps } from '../api/appApi';
import CategoryTabs from '../components/apps/CategoryTabs';
import AppCard from '../features/apps/AppCard';
import { Box, Typography, Grid, Container, CircularProgress } from '@mui/material';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      getAllCategories().then(r => setCategories(r.data)),
      getAllApps().then(r => setApps(r.data)),
    ])
      .catch(() => setError('Veriler yüklenirken hata oluştu.'))
      .finally(() => setLoading(false));
  }, []);

  // Select featured apps (first 6 for demo)
  const featuredApps = apps.slice(0, 6);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          BulutStore'a Hoşgeldiniz
        </Typography>
        <Typography variant="h5" color="text.secondary">
          En iyi uygulamaları keşfedin, kategorilere göz atın ve hemen indirin!
        </Typography>
      </Box>

      {/* Categories */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>Kategoriler</Typography>
        <CategoryTabs categories={categories} />
      </Box>

      {/* Featured Apps */}
      <Box>
        <Typography variant="h4" gutterBottom>Öne Çıkan Uygulamalar</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {featuredApps.map(app => (
              <Grid item xs={12} sm={6} md={4} key={app.id}>
                <AppCard app={app} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
