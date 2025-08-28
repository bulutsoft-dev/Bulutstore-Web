import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Fade, Paper, TextField, Typography } from '@mui/material';
import { DeveloperMode } from '@mui/icons-material';
import { getOwnDeveloperApplication, applyForDeveloper } from '../../api/userApi';

const DeveloperApplicationForm = ({ show }) => {
    const [form, setForm] = useState({ applicationText: '' });
    const [applying, setApplying] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const data = await getOwnDeveloperApplication();
                setApplication(data);
            } catch (err) {
                setApplication(null);
            } finally {
                setLoading(false);
            }
        };
        fetchApplication();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApplying(true);
        setError(null);
        setSuccess(false);
        try {
            await applyForDeveloper(form.applicationText);
            setSuccess(true);
        } catch (err) {
            setError('Başvuru gönderilemedi.');
        } finally {
            setApplying(false);
        }
    };

    // Determine if user already has an application
    const hasApplication = application && application.status && application.status !== 'NONE';
    const previousApplicationText = application && application.applicationText ? application.applicationText : '';

    return (
        <Fade in={show}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <DeveloperMode color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Geliştirici Başvurusu</Typography>
                </Box>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Başvurunuz alındı! Geliştirici olarak başvurunuz alınmıştır.
                    </Alert>
                )}
                <Typography variant="body2" color="text.secondary">
                    Geliştirici olarak uygulamalarınızı yayınlayabilir, kullanıcılara ulaşabilir ve toplulukta yerinizi alabilirsiniz.
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Başvuru Metni (Kendinizi ve deneyimlerinizi kısaca tanıtın)"
                        name="applicationText"
                        value={hasApplication ? previousApplicationText : form.applicationText}
                        onChange={handleChange}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        sx={{ mb: 2 }}
                        inputProps={{ maxLength: 500 }}
                        placeholder={previousApplicationText}
                        disabled={hasApplication || loading}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={applying || hasApplication || loading}
                        fullWidth
                        size="large"
                    >
                        {loading ? (
                            <>
                                <CircularProgress size={20} sx={{ mr: 1 }} />
                                Yükleniyor...
                            </>
                        ) : applying ? (
                            <>
                                <CircularProgress size={20} sx={{ mr: 1 }} />
                                Başvuru Gönderiliyor...
                            </>
                        ) : hasApplication ? (
                            'Başvurunuz Alındı'
                        ) : (
                            'Geliştirici Olarak Başvur'
                        )}
                    </Button>
                </Box>
            </Paper>
        </Fade>
    );
};

export default DeveloperApplicationForm;
