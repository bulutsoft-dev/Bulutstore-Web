import React, { useEffect } from 'react';
import { useDeveloperApplications } from '../hooks/useUsers';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPanelPage = () => {
  const { user, loading: authLoading } = useAuthContext();
  const { applications, fetchApplications, loading, error } = useDeveloperApplications();

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  if (authLoading) return <div>Loading...</div>;
  if (!user || String(user.role).toUpperCase() !== 'ADMIN') return <Navigate to="/" replace />;

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Panel - Developer Requests</h2>
      {loading && <div>Loading applications...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error.message || error.toString()}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>User ID</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Username</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Email</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Application Text</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Status</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {applications && applications.length > 0 ? (
            applications.map((app) => (
              <tr key={app.id || app._id}>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{app.userId || app.id || app._id}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{app.username || '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{app.email || '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{app.applicationText || '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{app.status || '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{app.date ? new Date(app.date).toLocaleString() : '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: 16 }}>No developer requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanelPage;
