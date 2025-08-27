import React from 'react';
import { Card, CardContent, Grid, Paper, Typography } from '@mui/material';

const DeveloperStats = () => (
    <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
            Geliştirici İstatistikleri
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary" gutterBottom>
                            5
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Yayınlanan Uygulama
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary" gutterBottom>
                            1.2K
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Toplam İndirme
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary" gutterBottom>
                            4.5
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Ortalama Puan
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Paper>
);

export default DeveloperStats;

