import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import TagChip from '../common/TagChip';
import StarRating from '../common/StarRating';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';

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
              {/* Category and Developer */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 1 }}>
                {app.category?.name && (
                  <TagChip label={app.category.name} />
                )}
                {app.developer?.displayName && (
                  <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 500, ml: 1 }}>
                    {app.developer.website ? (
                      <a href={app.developer.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                        {app.developer.displayName} <LinkIcon sx={{ fontSize: 16, ml: 0.5 }} />
                      </a>
                    ) : (
                      app.developer.displayName
                    )}
                  </Typography>
                )}
              </Box>
              {/* Download count and rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <DownloadIcon sx={{ fontSize: 18, color: '#888' }} />
                  <Typography variant="body2" sx={{ color: '#888' }}>{app.downloadCount || 0}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarRating rating={app.avgRating || 0} size={18} />
                  <Typography variant="body2" sx={{ color: '#888' }}>{(app.avgRating || 0).toFixed(1)}</Typography>
                </Box>
              </Box>
              {/* Tags */}
              {Array.isArray(app.tags) && app.tags.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  {app.tags.map(tag => (
                    <TagChip key={tag.id} label={tag.name} />
                  ))}
                </Box>
              )}
              {/* Description */}
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
            {/* App icon and screenshots */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <img
                src={app.iconUrl || app.image || '/assets/app-placeholder.png'}
                alt={app.name}
                style={{ width: 'min(60vw, 180px)', height: 'min(60vw, 180px)', maxWidth: 180, maxHeight: 180, objectFit: 'contain', borderRadius: 16, background: '#f5f5f5', border: '1px solid #eee' }}
              />
              {/* Screenshots carousel/thumbnails */}
              {Array.isArray(app.screenshotUrls) && app.screenshotUrls.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {app.screenshotUrls.slice(0, 3).map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Screenshot ${idx + 1}`}
                      style={{ width: 80, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee', background: '#fafafa' }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
);

export default HeroSection;
