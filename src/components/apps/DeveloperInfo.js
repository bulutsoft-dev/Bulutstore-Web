import React from 'react';
import { Typography, Chip } from '@mui/material';

const DeveloperInfo = ({ developer, developerDisplayName, developerName }) => (
  <>
    <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500, fontSize: 18 }}>
      {developer?.displayName || developer?.username || developerDisplayName || developerName || 'Geliştirici Bilinmiyor'}
    </Typography>
    {developer?.website && (
      <a href={developer.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginLeft: 8 }}>
        <Chip label="Web Sitesi" size="small" color="primary" />
      </a>
    )}
  </>
);

export default DeveloperInfo;

