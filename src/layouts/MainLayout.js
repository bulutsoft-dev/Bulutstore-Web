import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

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
      }}
    >
      <Navbar />
      <Box sx={{ flex: 1, width: '100%' }}>
        <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
