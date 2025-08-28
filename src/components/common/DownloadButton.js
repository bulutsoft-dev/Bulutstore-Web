import React from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const DownloadButton = ({ fileUrl }) => (
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
  >
    İndir
  </Button>
);

export default DownloadButton;

