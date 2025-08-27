import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';

/**
 * Uygulamanın ana bileşeni.
 * Tüm sayfalar MainLayout ile sarmalanır (Navbar, Footer, Container ortak).
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
