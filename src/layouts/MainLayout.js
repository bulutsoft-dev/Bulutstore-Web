import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import '@fontsource/inter';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

/**
 * MainLayout: Tüm sayfalar için ortak layout.
 * Navbar ve Footer'ı içerir, ana içerik tam genişlikte gösterilir.
 * Çocuk bileşenler (children) ana içerik olarak gösterilir.
 */
const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: '#f7f9fb',
        fontFamily: 'Inter, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        letterSpacing: 0.01,
      }}
    >
      <Navbar />
      <Box sx={{ flex: 1, width: '100%' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
