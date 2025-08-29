import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import useMyApps from '../hooks/useMyApps';
import useCategories from '../hooks/useCategories';
import MyAppsTable from '../components/apps/MyAppsTable';
import DeleteDialog from '../components/common/DeleteDialog';
import { useNotification } from '../context/NotificationContext';
import AppBreadcrumbs from '../components/common/Breadcrumbs';

const MyAppsPage = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const {
        apps,
        loading,
        error,
        refreshing,
        deleting,
        selectedApp,
        setSelectedApp,
        fetchApps,
        handleDeleteApp,
        setError
    } = useMyApps(user);
    const { categories } = useCategories();
    const { notify } = useNotification();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [localAlert, setLocalAlert] = useState(location.state?.alert || null);

    // Helper: check if user is developer
    const isDeveloper = user && (
      (typeof user.role === 'string' && user.role.toLowerCase() === 'developer') ||
      (Array.isArray(user.roles) && user.roles.map(r => r.toLowerCase()).includes('developer'))
    );

    useEffect(() => {
        if (!user) return;
        if (!isDeveloper) {
            notify('Developer değilsiniz, bu sayfaya erişemezsiniz.', 'warning');
            navigate('/profile');
        } else {
            fetchApps();
        }
        // eslint-disable-next-line
    }, [user, isDeveloper, navigate, fetchApps, notify, location.key]);

    const handleDeleteClick = (app) => {
        setSelectedApp(app);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedApp) return;
        await handleDeleteApp(selectedApp);
        setDeleteDialogOpen(false);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setSelectedApp(null);
    };

    const handleEdit = (app) => {
        navigate(`/apps/submit?id=${app.id || app._id}`);
    };

    const handleAdd = () => {
        if (!isDeveloper) {
            setLocalAlert('Uygulama eklemek için geliştirici olmalısınız.');
            return;
        }
        navigate('/apps/submit');
    };

    const handleRefresh = () => {
        fetchApps();
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
    }
    if (error) {
        return <Alert severity="error" sx={{ my: 4, mx: 'auto', maxWidth: 500, textAlign: 'center' }}>{error}</Alert>;
    }
    if (!user) {
        navigate('/login');
        return null;
    }
    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: { xs: 1, sm: 3 }, py: { xs: 2, sm: 4 }, width: '100%' }}>
            <AppBreadcrumbs extraLabels={[null, 'Uygulamalarım']} />
            {/* Show alert if redirected or local */}
            {localAlert && (
                <Alert severity="warning" onClose={() => setLocalAlert(null)} sx={{ mb: 2 }}>{localAlert}</Alert>
            )}
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} mb={3} gap={2}>
                <Typography variant="h4" fontWeight={700}>Uygulamalarım</Typography>
                <Box display="flex" gap={2}>
                    <Button variant="outlined" color="secondary" onClick={handleRefresh} disabled={refreshing || loading} sx={{ minWidth: 100 }}>
                        {refreshing ? <CircularProgress size={20} /> : 'Yenile'}
                    </Button>
                    {isDeveloper && (
                        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd} sx={{ minWidth: 140 }}>
                            Uygulama Ekle
                        </Button>
                    )}
                </Box>
            </Box>
            {apps.length === 0 ? (
                <Alert severity="info">Henüz bir uygulamanız yok.</Alert>
            ) : (
                <MyAppsTable
                    apps={apps}
                    categories={categories}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                    deleting={deleting}
                    selectedApp={selectedApp}
                />
            )}
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                loading={deleting}
                appName={selectedApp?.name}
            />
        </Box>
    );
};

export default MyAppsPage;
