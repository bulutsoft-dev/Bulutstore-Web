import React from 'react';
import { useUsers } from '../hooks/useUsers';
import UserList from '../components/users/UserList';

const UsersPage = () => {
  const { users, status, error } = useUsers();

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      <UserList users={users} />
    </div>
  );
};

export default UsersPage;

