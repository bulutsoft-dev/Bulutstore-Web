import React from 'react';
import Box from '@mui/material/Box';
import RegisterForm from '../components/users/RegisterForm';

const RegisterPage = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', px: { xs: 1, sm: 2 } }}>
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <RegisterForm />
    </Box>
  </Box>
);

export default RegisterPage;
