import React from 'react';
import { Box, Typography, Card, CardActionArea, Avatar, Grid } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';

const getCategoryIcon = (category) => {
  // You can customize icons per category here
  return <CategoryIcon sx={{ fontSize: 40, color: '#4285F4' }} />;
};

const CategoryShowcase = ({ categories }) => {
  const navigate = useNavigate();

  if (!categories || categories.length === 0) return null;

  return (
    <Box sx={{ width: '100%', mb: 6 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Kategoriler
      </Typography>
      <Grid container spacing={3}>
        {categories.map((cat) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(66,133,244,0.08)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.03)',
                  boxShadow: '0 6px 24px rgba(66,133,244,0.15)',
                  cursor: 'pointer',
                },
                minHeight: 160,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
              }}
              onClick={() => navigate(`/apps?category=${cat.slug || cat.id}`)}
            >
              <CardActionArea>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
                  <Avatar sx={{ bgcolor: '#e3f0fd', width: 56, height: 56, mb: 1 }}>
                    {getCategoryIcon(cat)}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#222', mb: 0.5 }}>
                    {cat.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: 13 }}>
                    {cat.description || 'Bu kategorideki uygulamaları keşfedin.'}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryShowcase;
