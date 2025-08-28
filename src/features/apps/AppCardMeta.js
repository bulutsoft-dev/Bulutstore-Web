import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DownloadIcon from '@mui/icons-material/Download';
import { formatDate, formatDownloads } from '../../utils/formatters';

const AppCardMeta = ({ category, updatedAt, downloadsCount }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {category && (
      <Tooltip title={typeof category === 'object' && category !== null ? category.name : category}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1.5 }}>
          <CategoryIcon sx={{ fontSize: 14, color: '#b0b0b0', mr: 0.5 }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, color: '#b0b0b0' }}>
            {typeof category === 'object' && category !== null ? (category.name?.length > 10 ? `${category.name.substring(0, 10)}...` : category.name) : (category.length > 10 ? `${category.substring(0, 10)}...` : category)}
          </Typography>
        </Box>
      </Tooltip>
    )}
    {updatedAt && (
      <Tooltip title={`Güncelleme: ${new Date(updatedAt).toLocaleDateString('tr-TR')}`}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1.5 }}>
          <CalendarMonthIcon sx={{ fontSize: 14, color: '#b0b0b0', mr: 0.5 }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, color: '#b0b0b0' }}>
            {formatDate(updatedAt)}
          </Typography>
        </Box>
      </Tooltip>
    )}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <DownloadIcon sx={{ fontSize: 14, color: '#b0b0b0', mr: 0.5 }} />
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, color: '#b0b0b0' }}>
        {formatDownloads(downloadsCount)}
      </Typography>
    </Box>
  </Box>
);

export default AppCardMeta;

