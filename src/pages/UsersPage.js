import React from 'react';
import { useUsers } from '../hooks/useUsers';
import UserList from '../components/users/UserList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBreadcrumbs from '../components/common/Breadcrumbs';

const UsersPage = () => {
  const { users, status, error } = useUsers();

  if (status === 'loading') return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">Loading...</Box>;
  if (status === 'failed') return <Box color="error.main" textAlign="center" mt={6} fontSize={18}>Error: {error}</Box>;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 1, sm: 3 }, py: { xs: 2, sm: 4 }, width: '100%' }}>
      <AppBreadcrumbs extraLabels={[null, 'Kullanıcılar']} />
      <Typography variant="h4" fontWeight={700} mb={3}>Kullanıcılar</Typography>
      <UserList users={users} />
    </Box>
  );
};

export default UsersPage;
