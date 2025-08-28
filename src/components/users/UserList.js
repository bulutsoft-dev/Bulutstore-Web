import React from 'react';

const UserList = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.id}>
        <span>{user.displayName || user.username}</span>
        {user.website && (
          <>
            {' - '}
            <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a>
          </>
        )}
      </li>
    ))}
  </ul>
);

export default UserList;
