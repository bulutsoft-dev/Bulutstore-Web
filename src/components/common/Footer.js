import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Uygulamanın alt kısmında yer alan footer bileşeni.
 * Tüm sayfalarda görünür. MUI ile sade bir görünüm sağlar.
 */
const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 2, px: 2, mt: 'auto', backgroundColor: '#f5f5f5', textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} BulutStore. Tüm hakları saklıdır.
      </Typography>
    </Box>
  );
};

export default Footer;

