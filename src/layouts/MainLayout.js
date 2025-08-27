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
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Container sx={{ flex: 1, py: 3 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout;

