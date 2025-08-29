import React, { useEffect, useState } from 'react';
import { useDeveloperApplications } from '../hooks/useUsers';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import DeveloperRequestsTable from '../components/admin/DeveloperRequestsTable';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { approveDeveloper, rejectDeveloper } from '../api/userApi';
import PendingAppsTable from '../components/admin/PendingAppsTable';

const AdminPanelPage = () => {
  const { user, loading: authLoading } = useAuthContext();
  const { applications, fetchApplications, loading, error } = useDeveloperApplications();
  const [actionLoading, setActionLoading] = useState({});
  const [actionError, setActionError] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  if (authLoading) return <Box sx={{ mt: 4, textAlign: 'center', minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box>;
  if (!user || String(user.role).toUpperCase() !== 'ADMIN') return <Navigate to="/" replace />;


  const handleApprove = async (userId) => {
    setActionLoading((prev) => ({ ...prev, [userId]: true }));
    setActionError((prev) => ({ ...prev, [userId]: null }));
    try {
      await approveDeveloper(userId);
      setSnackbar({ open: true, message: 'Developer approved successfully.', severity: 'success' });
      fetchApplications();
    } catch (err) {
      setActionError((prev) => ({ ...prev, [userId]: err?.response?.data?.message || err.message || 'Error' }));
      setSnackbar({ open: true, message: 'Failed to approve developer.', severity: 'error' });
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleReject = async (userId) => {
    setActionLoading((prev) => ({ ...prev, [userId]: true }));
    setActionError((prev) => ({ ...prev, [userId]: null }));
    try {
      await rejectDeveloper(userId);
      setSnackbar({ open: true, message: 'Developer rejected successfully.', severity: 'success' });
      fetchApplications();
    } catch (err) {
      setActionError((prev) => ({ ...prev, [userId]: err?.response?.data?.message || err.message || 'Error' }));
      setSnackbar({ open: true, message: 'Failed to reject developer.', severity: 'error' });
    } finally {
      setActionLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleSnackbarClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 1, sm: 3 }, py: { xs: 2, sm: 4 }, width: '100%' }}>
      <Typography variant="h4" gutterBottom>Admin Panel</Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>Onay Bekleyen Uygulamalar</Typography>
      <PendingAppsTable />
      <Typography variant="h6" sx={{ mt: 5 }}>Geliştirici Başvuruları</Typography>
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}
      {error && <Typography color="error">Error: {error.message || error.toString()}</Typography>}
      <DeveloperRequestsTable
        applications={applications}
        onApprove={handleApprove}
        onReject={handleReject}
        actionLoading={actionLoading}
        actionError={actionError}
      />
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }} elevation={6} variant="filled">
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanelPage;
