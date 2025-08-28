import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import useApp from '../hooks/useApp';
import AppHeader from '../components/apps/AppHeader';
import AppScreenshots from '../components/apps/AppScreenshots';
import AppDescription from '../components/apps/AppDescription';
import AppTags from '../components/apps/AppTags';

console.log('DEBUG | AppDetailPage loaded');

const AppDetailPage = () => {
  const { id } = useParams();
  const { app, loading, error } = useApp(id);

  // Cache screenshots only on first load for each app id
  const [cachedScreenshots, setCachedScreenshots] = React.useState([]);
  const prevAppId = React.useRef();

  React.useEffect(() => {
    console.log('DEBUG | useEffect triggered | app:', app, '| id:', id, '| prevAppId:', prevAppId.current);
    if (app && id !== prevAppId.current) {
      setCachedScreenshots(Array.isArray(app.screenshotUrls) ? app.screenshotUrls : []);
      prevAppId.current = id;
      console.log('DEBUG | setCachedScreenshots:', Array.isArray(app.screenshotUrls) ? app.screenshotUrls : []);
    }
  }, [app, id]);

  console.log('DEBUG | cachedScreenshots:', cachedScreenshots);

  if (loading) {
    console.log('DEBUG | Render loading spinner');
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }
  if (error) {
    console.log('DEBUG | Render error:', error);
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }
  if (!app) {
    console.log('DEBUG | Render null (no app)');
    return null;
  }

  console.log('DEBUG | Render main app detail page');

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 1, sm: 3 }, py: { xs: 2, sm: 4 }, width: '100%' }}>
      <AppHeader app={app} />
      <AppScreenshots screenshots={cachedScreenshots} />
      <AppDescription shortDescription={app.shortDescription} description={app.description} />
      <AppTags tags={app.tags} tagIds={app.tagIds} />
    </Box>
  );
};

export default AppDetailPage;
