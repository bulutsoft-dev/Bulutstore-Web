import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categoryApi';
import { getAllApps } from '../api/appApi';
import CategoryShowcase from '../components/apps/CategoryShowcase';
import HeroSection from '../components/home/HeroSection';
import FeaturedAppsSection from '../components/home/FeaturedAppsSection';
import { Box } from '@mui/material';
import AppBreadcrumbs from '../components/common/Breadcrumbs';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAllCategories().then(r => { console.log('Categories:', r); setCategories(r.data); }),
      getAllApps().then(r => { console.log('Apps:', r); setApps(r.data); })
    ])
      .catch((err) => {
        console.error('Data fetch error:', err);
        setError('Veriler yüklenirken hata oluştu.');
      })
      .finally(() => setLoading(false));
  }, []);

  // Select featured apps (first 6 for demo)
  const featuredApps = Array.isArray(apps)
    ? apps.slice(0, 6).map(app => ({ ...app, downloadsCount: app.downloadCount }))
    : [];

  return (
    <Box sx={{ width: '100%', bgcolor: 'transparent', minHeight: '100vh', pb: 0, px: 0 }}>
      <AppBreadcrumbs />
      {/* Hero/Slider Section */}
      <HeroSection featuredApps={featuredApps} />
      {/* Categories - special showcase */}
      <Box sx={{ mb: 8 }}>
        <CategoryShowcase categories={categories} />
      </Box>
      {/* Featured Apps Section */}
      <FeaturedAppsSection featuredApps={featuredApps} loading={loading} error={error} />
    </Box>
  );
};

export default HomePage;
