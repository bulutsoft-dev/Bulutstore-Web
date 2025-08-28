import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Button from '@mui/material/Button';
import useApp from '../hooks/useApp';

const AppDetailPage = () => {
  const { id } = useParams();
  const { app, loading, error } = useApp(id);

  // Cache screenshots only on first load for each app id
  const [cachedScreenshots, setCachedScreenshots] = React.useState([]);
  const prevAppId = React.useRef();

  React.useEffect(() => {
    if (app && id !== prevAppId.current) {
      setCachedScreenshots(Array.isArray(app.screenshotUrls) ? app.screenshotUrls : []);
      prevAppId.current = id;
    }
  }, [app, id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  if (!app) return null;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 1, sm: 3 }, py: { xs: 2, sm: 4 }, width: '100%' }}>
      {/* Header Section - Google Play Style */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'flex-start' }, gap: 4, mb: 4 }}>
        {/* App Icon */}
        <Avatar src={app.iconUrl || app.image || ''} alt={app.name} sx={{ width: 120, height: 120, bgcolor: '#f5f5f5', fontSize: 48, color: '#888', boxShadow: 2, border: '2px solid #eee' }}>
          {(!app.iconUrl && !app.image) ? app.name?.[0]?.toUpperCase() : null}
        </Avatar>
        {/* Main Info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: 26, sm: 34, md: 40 } }}>{app.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500, fontSize: 18 }}>
              {app.developerDisplayName || (typeof app.developer === 'object' && app.developer !== null ? (app.developer.displayName || app.developer.username) : app.developer) || app.developerName || 'Geliştirici Bilinmiyor'}
            </Typography>
            {app.developerWebsite && (
              <a href={app.developerWebsite} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginLeft: 8 }}>
                <Chip label="Web Sitesi" size="small" color="primary" />
              </a>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 1 }}>
            {app.category && <Chip label={app.category?.name} size="small" sx={{ fontWeight: 600, fontSize: 13 }} />}
            {app.status && <Chip label={app.status} size="small" sx={{ fontWeight: 600, fontSize: 13 }} />}
            {app.isPremium && <Chip label="Premium" size="small" color="warning" sx={{ fontWeight: 600, fontSize: 13 }} />}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 3, mb: 1 }}>
            {app.avgRating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <StarIcon sx={{ color: '#FFB400', fontSize: 22 }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{app.avgRating.toFixed(1)}</Typography>
              </Box>
            )}
            {app.downloadsCount && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <DownloadIcon sx={{ color: '#1976d2', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">{app.downloadsCount}</Typography>
              </Box>
            )}
            {app.updatedAt && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarMonthIcon sx={{ color: '#1976d2', fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">Güncelleme: {new Date(app.updatedAt).toLocaleDateString('tr-TR')}</Typography>
              </Box>
            )}
          </Box>
        </Box>
        {/* Install/Action Area */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2, minWidth: 160 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<DownloadIcon />}
            href={app.downloadUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!app.downloadUrl}
            sx={{ fontWeight: 700, fontSize: 18, px: 4, py: 1.5, borderRadius: 2, boxShadow: 2 }}
          >
            İndir
          </Button>
        </Box>
      </Box>
      {/* Screenshots Section - Google Play Style */}
      {cachedScreenshots.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1976d2' }}>Ekran Görüntüleri</Typography>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {cachedScreenshots.map((url, idx) => (
              <Box key={idx} sx={{
                flex: '0 0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#fafbfc',
                border: '1px solid #eee',
                borderRadius: 3,
                boxShadow: 2,
                minWidth: 180,
                maxWidth: 320,
                height: 400,
                p: 1,
                position: 'relative',
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
                    borderRadius: 8,
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
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
      )}
      {/* Short Description - prominent */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1976d2' }}>
        Kısa Açıklama
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, fontSize: 20, fontWeight: 500, color: '#222' }}>
        {app.shortDescription || 'Bu uygulama için kısa açıklama bulunmamaktadır.'}
      </Typography>
      {/* Full Description */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1976d2' }}>
        Detaylı Açıklama
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: 17 }}>
        {app.description || 'Bu uygulama için detaylı açıklama bulunmamaktadır.'}
      </Typography>
      {/* Tags Section */}
      {Array.isArray(app.tagIds) && app.tagIds.length > 0 && (
        <Box sx={{ mt: 3, mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1976d2', mr: 1 }}>Etiketler:</Typography>
          {app.tagIds.map((tagId, idx) => (
            <Chip key={tagId || idx} label={`#${tagId}`} size="small" variant="outlined" />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AppDetailPage;
