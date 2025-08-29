import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categoryApi';
import { getAllApps } from '../api/appApi';
import CategoryShowcase from '../components/apps/CategoryShowcase';
import AppCard from '../features/apps/AppCard';
import { Box, Typography, Grid, CircularProgress, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

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
    <Box sx={{ width: '100%', bgcolor: 'transparent', minHeight: '100vh', pb: 0, px: 0 }}>
      {/* Slider Section - full width */}
      <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', pt: 4, mb: 6 }}>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          spaceBetween={32}
          slidesPerView={1}
          style={{ borderRadius: 16, overflow: 'hidden', minHeight: 320 }}
        >
          {featuredApps.map(app => (
            <SwiperSlide key={app.id}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: '#fff',
                  p: { xs: 2, md: 6 },
                  minHeight: 320,
                  boxShadow: 2,
                  borderRadius: 4,
                  gap: 4,
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: '#222' }}>
                    {app.name}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#666', mb: 3, maxWidth: 500 }}>
                    {app.shortDescription || app.description?.slice(0, 120) + '...'}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    href={`/apps/${app.id}`}
                    sx={{ borderRadius: 2, fontWeight: 700 }}
                  >
                    Uygulamayı İncele
                  </Button>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    src={app.iconUrl || app.image || '/assets/app-placeholder.png'}
                    alt={app.name}
                    style={{ width: 180, height: 180, objectFit: 'contain', borderRadius: 16, background: '#f5f5f5', border: '1px solid #eee' }}
                  />
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      {/* Main content is now handled by MainLayout's Container */}
      <Box>
        {/* Categories - now a special showcase */}
        <Box sx={{ mb: 8 }}>
          <CategoryShowcase categories={categories} />
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
            <Grid container spacing={4}>
              {featuredApps.map(app => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={app.id}>
                  <AppCard app={app} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
