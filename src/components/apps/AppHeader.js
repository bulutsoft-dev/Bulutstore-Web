import React, { useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import DeveloperInfo from './DeveloperInfo';
import AppMeta from './AppMeta';
import RatingDownloads from './RatingDownloads';
import DownloadButton from '../common/DownloadButton';

const AppHeader = ({ app }) => {
  const [downloadsCount, setDownloadsCount] = useState(app.downloadsCount || 0);

  const handleDownloaded = (newCount) => {
    console.log('handleDownloaded called with:', newCount);
    if (typeof newCount === 'number') {
      setDownloadsCount(newCount);
    } else {
      setDownloadsCount((prev) => prev + 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'flex-start' }, gap: 4, mb: 4 }}>
      {/* App Icon */}
      <Avatar src={app.iconUrl || app.image || ''} alt={app.name} sx={{ width: 120, height: 120, bgcolor: '#f5f5f5', fontSize: 48, color: '#888', boxShadow: 2, border: '2px solid #eee' }}>
        {(!app.iconUrl && !app.image) ? app.name?.[0]?.toUpperCase() : null}
      </Avatar>
      {/* Main Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: 26, sm: 34, md: 40 } }}>{app.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <DeveloperInfo developer={app.developer} developerDisplayName={app.developerDisplayName} developerName={app.developerName} />
        </Box>
        <AppMeta category={app.category} status={app.status} isPremium={app.isPremium} version={app.version} />
        <RatingDownloads avgRating={app.avgRating} downloadsCount={downloadsCount} updatedAt={app.updatedAt} />
      </Box>
      {/* Install/Action Area */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2, minWidth: 160 }}>
        <DownloadButton fileUrl={app.fileUrl} appId={app.id} onDownloaded={handleDownloaded} />
      </Box>
    </Box>
  );
};

export default AppHeader;
