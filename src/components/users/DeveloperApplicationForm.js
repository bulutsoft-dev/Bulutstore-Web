import React from 'react';
import { Alert, Box, Button, CircularProgress, Fade, Paper, TextField, Typography } from '@mui/material';
import { DeveloperMode } from '@mui/icons-material';

const DeveloperApplicationForm = ({
    form,
    handleChange,
    handleSubmit,
    applying,
    error,
    success,
    show
}) => (
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
                    Başvurunuz alındı! Artık geliştiricisiniz.
                </Alert>
            )}
            <Typography variant="body2" color="text.secondary">
                Geliştirici olarak uygulamalarınızı yayınlayabilir, kullanıcılara ulaşabilir ve toplulukta yerinizi alabilirsiniz.
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Kendinizi ve deneyimlerinizi kısaca tanıtın"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                    inputProps={{ maxLength: 500 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={applying}
                    fullWidth
                    size="large"
                >
                    {applying ? (
                        <>
                            <CircularProgress size={20} sx={{ mr: 1 }} />
                            Başvuru Gönderiliyor...
                        </>
                    ) : (
                        'Geliştirici Olarak Başvur'
                    )}
                </Button>
            </Box>
        </Paper>
    </Fade>
);

export default DeveloperApplicationForm;

