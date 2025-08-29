import React from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

const DownloadButton = ({ fileUrl, appId, onDownloaded }) => {
  const handleDownload = async (e) => {
    if (!fileUrl || !appId) return;
    try {
      await axios.post('/api/download-histories', { appId });
      if (onDownloaded) onDownloaded();
    } catch (err) {
      // Optionally handle error
    }
    // Open file in new tab
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
    e.preventDefault();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      startIcon={<DownloadIcon />}
      href={fileUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      disabled={!fileUrl}
      sx={{ fontWeight: 700, fontSize: 18, px: 4, py: 1.5, borderRadius: 2, boxShadow: 2 }}
      onClick={handleDownload}
    >
      İndir
    </Button>
  );
};

export default DownloadButton;
