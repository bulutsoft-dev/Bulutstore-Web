import React from 'react';
import LoginForm from '../components/users/LoginForm';
import AppBreadcrumbs from '../components/common/Breadcrumbs';
import Box from '@mui/material/Box';

const LoginPage = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', px: { xs: 1, sm: 2 } }}>
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <AppBreadcrumbs extraLabels={[null, 'Giriş Yap']} />
      <LoginForm />
    </Box>
  </Box>
);

export default LoginPage;
