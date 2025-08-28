import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const RatingDownloads = ({ avgRating, downloadsCount, updatedAt }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 3, mb: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <StarIcon sx={{ color: '#FFB400', fontSize: 22 }} />
      <Typography variant="body1" sx={{ fontWeight: 600 }}>{avgRating ? avgRating.toFixed(1) : '0.0'}</Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <DownloadIcon sx={{ color: '#1976d2', fontSize: 20 }} />
      <Typography variant="body2" color="text.secondary">{downloadsCount || 0}</Typography>
    </Box>
    {updatedAt && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <CalendarMonthIcon sx={{ color: '#1976d2', fontSize: 20 }} />
        <Typography variant="body2" color="text.secondary">Güncelleme: {new Date(updatedAt).toLocaleDateString('tr-TR')}</Typography>
      </Box>
    )}
  </Box>
);

export default RatingDownloads;

