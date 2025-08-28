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

const AppsPage = () => {
  const { categories, loading: catLoading, error: catError } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const { apps, loading: appsLoading, error: appsError } = useApps(selectedCategoryId);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', py: 0, mt: 0 }}>
      {/* Uygulama Ekle button for developers - visible at top of AppsPage */}
      {user && (user.role === 'DEVELOPER' || user.role === 'ADMIN') && (
        <Box sx={{ mb: 2, p: 2, backgroundColor: 'red', color: 'white', borderRadius: 2, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/apps/submit')}
            sx={{ fontWeight: 'bold', fontSize: 18 }}
          >
            Uygulama Ekle (APPS PAGE)
          </Button>
        </Box>
      )}
      <CategoryTabs
        categories={categories}
        loading={catLoading}
        error={catError}
        selectedCategoryId={selectedCategoryId}
        onChange={setSelectedCategoryId}
      />
      {appsError && <Alert severity="error" sx={{ my: 1 }}>{appsError}</Alert>}
      {appsLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress size={22} />
        </Box>
      ) : (
        <Grid container spacing={1.5}>
          {apps.length === 0 ? (
            <Grid item xs={12}>
              <Alert severity="info">Bu kategoride uygulama yok.</Alert>
            </Grid>
          ) : (
            apps.map((app) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={app.id}>
                <AppCard app={app} />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
};

export default AppsPage;
