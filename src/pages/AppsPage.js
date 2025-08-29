import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useCategories from '../hooks/useCategories';
import useApps from '../hooks/useApps';
import CategoryTabs from '../features/categories/CategoryTabs';
import AppCard from '../features/apps/AppCard';
import AppBreadcrumbs from '../components/common/Breadcrumbs';

const AppsPage = () => {
  const { categories, loading: catLoading, error: catError } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const { apps, loading: appsLoading, error: appsError } = useApps(selectedCategoryId);


  return (
    <Box sx={{ width: '100%', py: { xs: 2, md: 4 }, px: { xs: 1, sm: 2, md: 0 }, mt: 0 }}>
      <AppBreadcrumbs />
      <CategoryTabs
        categories={categories}
        loading={catLoading}
        error={catError}
        selectedCategoryId={selectedCategoryId}
        onChange={setSelectedCategoryId}
      />
      {appsError && <Alert severity="error" sx={{ my: 2 }}>{appsError}</Alert>}
      {appsLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress size={28} />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mt: 1 }}>
          {apps.length === 0 ? (
            <Grid item xs={12}>
              <Alert severity="info">Bu kategoride uygulama yok.</Alert>
            </Grid>
          ) : (
            apps.map((app) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={app.id}>
                <AppCard app={{ ...app, downloadsCount: app.downloadsCount ?? app.downloadCount ?? 0 }} />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
};

export default AppsPage;
