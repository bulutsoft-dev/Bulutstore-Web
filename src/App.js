import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
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
        <NotificationProvider>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
