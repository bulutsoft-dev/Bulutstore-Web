import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

/**
 * MainLayout: Tüm sayfalar için ortak layout.
 * Navbar ve Footer'ı içerir, ana içerik Container ile ortalanır.
 * Çocuk bileşenler (children) ana içerik olarak gösterilir.
 */
const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        height: '100dvh', // Mobil uyumlu tam ekran yükseklik
      }}
    >
      <Navbar />
      <Container sx={{ py: 1 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout;
