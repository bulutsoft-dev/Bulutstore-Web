import React from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { createDownloadHistory } from '../../api/downloadHistoryApi';

const DownloadButton = ({ fileUrl, appId, onDownloaded }) => {
  const handleDownload = async (e) => {
    if (!fileUrl || !appId) return;
    try {
      const res = await createDownloadHistory({ appId });
      if (onDownloaded && res?.data?.downloadCount !== undefined) {
        onDownloaded(res.data.downloadCount);
      } else if (onDownloaded) {
        onDownloaded();
      }
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
