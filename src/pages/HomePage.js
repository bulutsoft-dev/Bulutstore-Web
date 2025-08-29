import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categoryApi';
import { getAllApps } from '../api/appApi';
import CategoryShowcase from '../components/apps/CategoryShowcase';
import HeroSection from '../components/home/HeroSection';
import FeaturedAppsSection from '../components/home/FeaturedAppsSection';
import { Box } from '@mui/material';

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
