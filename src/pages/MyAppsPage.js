import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Box, Container, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useMyApps from '../hooks/useMyApps';
import useCategories from '../hooks/useCategories';
import MyAppsTable from '../components/apps/MyAppsTable';
import DeleteDialog from '../components/common/DeleteDialog';

const MyAppsPage = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
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
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        fetchApps();
        // eslint-disable-next-line
    }, [user]);

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
        navigate('/apps/submit');
    };

    const handleRefresh = () => {
        fetchApps();
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
    }
    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }
    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight={700}>Uygulamalarım</Typography>
                <Box display="flex" gap={2}>
                    <Button variant="outlined" color="secondary" onClick={handleRefresh} disabled={refreshing || loading}>
                        {refreshing ? <CircularProgress size={20} /> : 'Yenile'}
                    </Button>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
                        Uygulama Ekle
                    </Button>
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
        </Container>
    );
};

export default MyAppsPage;
