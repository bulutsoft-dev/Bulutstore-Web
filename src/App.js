import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';

/**
 * Uygulamanın ana bileşeni.
 * Navbar ve Footer tüm sayfalarda görünür.
 * Sayfa içerikleri MUI Container ile ortalanır.
 */
function App() {
  return (
    <BrowserRouter>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <Container sx={{ flex: 1, py: 3 }}>
          <AppRoutes />
        </Container>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
