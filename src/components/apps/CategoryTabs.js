import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const CategoryTabs = ({ categories, loading, error, selectedCategoryId, onChange }) => {
  if (loading) return <CircularProgress size={20} />;
  if (error) return <Alert severity="error" sx={{ my: 1 }}>{error}</Alert>;
  if (!categories.length) return null;

  const selectedIndex = categories.findIndex(cat => cat.id === selectedCategoryId);

  return (
    <Tabs
      value={selectedIndex}
      onChange={(e, idx) => onChange(categories[idx]?.id)}
      variant="scrollable"
      scrollButtons="auto"
      sx={{ mb: 1, borderBottom: 1, borderColor: 'divider', minHeight: 32, '& .MuiTab-root': { minHeight: 32, fontSize: 14, px: 1.5 } }}
    >
      {categories.map((cat) => (
        <Tab key={cat.id} label={cat.name} sx={{ minHeight: 32, fontWeight: 500 }} />
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
