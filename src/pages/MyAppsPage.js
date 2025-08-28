import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import AppCard from '../features/apps/AppCard';
import axiosInstance from '../api/axiosConfig';

const MyAppsPage = () => {
    const { user } = useAuthContext();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApps = async () => {
            if (!user || !(user.id || user._id)) {
                setError('Kullanıcı bulunamadı.');
                setLoading(false);
                return;
            }
            try {
                const developerId = user.id || user._id;
                const response = await axiosInstance.get(`/apps/developer/${developerId}`);
                setApps(response.data);
            } catch (err) {
                setError('Uygulamalar alınamadı.');
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, [user]);

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
    }
    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }
    return (
        <Container maxWidth="md">
            <Typography variant="h4" fontWeight={700} mb={3}>Uygulamalarım</Typography>
            {apps.length === 0 ? (
                <Alert severity="info">Henüz bir uygulamanız yok.</Alert>
            ) : (
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
                    {apps.map(app => (
                        <AppCard key={app.id || app._id} app={app} />
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default MyAppsPage;

