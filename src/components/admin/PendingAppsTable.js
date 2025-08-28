import React, { useEffect, useState } from 'react';
import { getAllAppsAdmin, approveApp, rejectApp } from '../../api/appApi';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Alert, Chip } from '@mui/material';

const PendingAppsTable = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  const fetchApps = () => {
    setLoading(true);
    setError(null);
    getAllAppsAdmin()
      .then(res => {
        setApps(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Uygulamalar yüklenemedi.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleAction = (id, action) => {
    setActionLoading(prev => ({ ...prev, [id]: true }));
    const apiCall = action === 'approve' ? approveApp : rejectApp;
    apiCall(id)
      .then(() => {
        setApps(prev => prev.filter(app => app.id !== id));
      })
      .catch(() => {
        setError('İşlem başarısız.');
      })
      .finally(() => {
        setActionLoading(prev => ({ ...prev, [id]: false }));
      });
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (apps.length === 0) return <Alert severity="info">Hiç uygulama bulunamadı.</Alert>;

  const getStatusChip = (status) => {
    switch (status) {
      case 'APPROVED':
        return <Chip label="Onaylandı" color="success" size="small" />;
      case 'REJECTED':
        return <Chip label="Reddedildi" color="error" size="small" />;
      case 'PENDING':
      default:
        return <Chip label="Bekliyor" color="warning" size="small" />;
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>İsim</TableCell>
            <TableCell>Açıklama</TableCell>
            <TableCell>Geliştirici</TableCell>
            <TableCell>Oluşturulma</TableCell>
            <TableCell>Durum</TableCell>
            <TableCell>İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apps.map(app => (
            <TableRow key={app.id}>
              <TableCell>{app.id}</TableCell>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.shortDescription}</TableCell>
              <TableCell>{app.developerDisplayName}</TableCell>
              <TableCell>{new Date(app.createdAt).toLocaleString()}</TableCell>
              <TableCell>{getStatusChip(app.status)}</TableCell>
              <TableCell>
                {app.status === 'PENDING' ? (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ mr: 1 }}
                      disabled={actionLoading[app.id]}
                      onClick={() => handleAction(app.id, 'approve')}
                    >
                      Onayla
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      disabled={actionLoading[app.id]}
                      onClick={() => handleAction(app.id, 'reject')}
                    >
                      Reddet
                    </Button>
                  </>
                ) : (
                  <Box sx={{ color: 'text.disabled', fontSize: 13 }}>-</Box>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PendingAppsTable;
