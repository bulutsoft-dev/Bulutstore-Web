import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categoryApi';
import { getAppsByCategory } from '../api/appApi';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const AppsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllCategories()
      .then(res => {
        setCategories(res.data);
        setSelectedTab(0);
      })
      .catch(() => setError('Kategoriler yüklenemedi.'));
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setLoading(true);
      setError(null);
      getAppsByCategory(categories[selectedTab]?.id)
        .then(res => {
          setApps(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError('Uygulamalar yüklenemedi.');
          setLoading(false);
        });
    }
  }, [categories, selectedTab]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', py: 0, mt: 0 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#1976d2', mt: 0, fontSize: 20 }}>
        Uygulamalar
      </Typography>
      {categories.length > 0 ? (
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 1, borderBottom: 1, borderColor: 'divider', minHeight: 32, '& .MuiTab-root': { minHeight: 32, fontSize: 14, px: 1.5 } }}
        >
          {categories.map((cat) => (
            <Tab key={cat.id} label={cat.name} sx={{ minHeight: 32, fontWeight: 500 }} />
          ))}
        </Tabs>
      ) : (
        <CircularProgress size={20} />
      )}
      {error && <Alert severity="error" sx={{ my: 1 }}>{error}</Alert>}
      {loading ? (
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
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 1, borderRadius: 2 }}>
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, fontSize: 15 }}>
                      {app.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: 13 }}>
                      {app.description || 'Açıklama yok.'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
};

export default AppsPage;
