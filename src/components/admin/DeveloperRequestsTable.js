import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Stack,
  Chip,
  Alert,
  Box
} from '@mui/material';
import { useAuthContext } from '../../context/AuthContext';
import { getDeveloperApplications, approveDeveloper, rejectDeveloper } from '../../api/userApi';

const DeveloperRequestsTable = () => {
  const { user } = useAuthContext();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [actionError, setActionError] = useState({});

  const fetchApplications = () => {
    setLoading(true);
    setError(null);
    getDeveloperApplications()
      .then(res => {
        setApplications(Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Başvurular yüklenemedi.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAction = (id, action) => {
    setActionLoading(prev => ({ ...prev, [id]: true }));
    setActionError(prev => ({ ...prev, [id]: null }));
    const apiCall = action === 'approve' ? approveDeveloper : rejectDeveloper;
    apiCall(id)
      .then(() => {
        setApplications(prev => prev.filter(app => app.id !== id));
      })
      .catch(() => {
        setActionError(prev => ({ ...prev, [id]: 'İşlem başarısız.' }));
      })
      .finally(() => {
        setActionLoading(prev => ({ ...prev, [id]: false }));
      });
  };

  const getStatusChip = (app) => {
    // Infer status: if role is DEVELOPER, approved; if USER and status is ACTIVE, pending; if USER and status is REJECTED, rejected
    if (String(app.role).toUpperCase() === 'DEVELOPER') {
      return <Chip label="Onaylandı" color="success" size="small" />;
    }
    if (String(app.status).toUpperCase() === 'REJECTED') {
      return <Chip label="Reddedildi" color="error" size="small" />;
    }
    // Default: pending
    return <Chip label="Bekliyor" color="warning" size="small" />;
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!Array.isArray(applications) || applications.length === 0) return <Alert severity="info">Hiç başvuru bulunamadı.</Alert>;

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Application Text</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map(app => {
            const id = app.id;
            // Use new status logic
            const isPending = String(app.role).toUpperCase() === 'USER' && String(app.status).toUpperCase() !== 'REJECTED';
            return (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{app.username || '-'}</TableCell>
                <TableCell>{app.email || '-'}</TableCell>
                <TableCell>{app.developerApplicationText || '-'}</TableCell>
                <TableCell>{getStatusChip(app)}</TableCell>
                <TableCell>{app.createdAt ? new Date(app.createdAt).toLocaleString() : '-'}</TableCell>
                <TableCell>
                  {user?.role?.toUpperCase() === 'ADMIN' && isPending ? (
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        disabled={actionLoading[id]}
                        onClick={() => handleAction(id, 'approve')}
                        sx={{ mr: 1 }}
                      >
                        {actionLoading[id] ? <CircularProgress size={18} /> : 'Onayla'}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        disabled={actionLoading[id]}
                        onClick={() => handleAction(id, 'reject')}
                      >
                        {actionLoading[id] ? <CircularProgress size={18} /> : 'Reddet'}
                      </Button>
                    </Stack>
                  ) : (
                    <Box sx={{ color: 'text.disabled', fontSize: 13 }}>-</Box>
                  )}
                  {actionError[id] && <Alert severity="error" sx={{ mt: 1 }}>{actionError[id]}</Alert>}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeveloperRequestsTable;
