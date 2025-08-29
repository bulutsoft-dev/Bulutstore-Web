import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const HeroSection = ({ featuredApps }) => (
  <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', pt: { xs: 2, md: 4 }, mb: { xs: 4, md: 6 } }}>
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
              justifyContent: 'center',
              bgcolor: '#fff',
              p: { xs: 2, md: 6 },
              minHeight: { xs: 320, sm: 360, md: 320 },
              boxShadow: 2,
              borderRadius: 4,
              gap: { xs: 2, md: 4 },
              flexDirection: { xs: 'column', md: 'row' },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, mb: { xs: 2, md: 0 } }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: { xs: 1, md: 2 }, color: '#222', textAlign: { xs: 'center', md: 'left' } }}>
                {app.name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', mb: { xs: 2, md: 3 }, maxWidth: 500, textAlign: { xs: 'center', md: 'left' } }}>
                {app.shortDescription || app.description?.slice(0, 120) + '...'}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href={`/apps/${app.id}`}
                sx={{ borderRadius: 2, fontWeight: 700, alignSelf: { xs: 'center', md: 'flex-start' }, minWidth: 180, py: 1.2 }}
              >
                Uygulamayı İncele
              </Button>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={app.iconUrl || app.image || '/assets/app-placeholder.png'}
                alt={app.name}
                style={{ width: 'min(60vw, 180px)', height: 'min(60vw, 180px)', maxWidth: 180, maxHeight: 180, objectFit: 'contain', borderRadius: 16, background: '#f5f5f5', border: '1px solid #eee' }}
              />
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
);

export default HeroSection;
