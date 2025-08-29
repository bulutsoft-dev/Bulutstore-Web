import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Navbar tasarımına uyumlu responsive footer bileşeni
 * Google Play benzeri modern bir tasarım
 */
const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: { xs: 2, sm: 4 },
                px: { xs: 1, sm: 2 },
                mt: 'auto',
                borderTop: '1px solid #e0e0e0',
                color: '#5f6368',
                fontSize: { xs: 13, sm: 15 },
                fontFamily: 'Inter, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                letterSpacing: 0.01,
                backgroundColor: '#fff',
            }}
        >
            <Container maxWidth="lg" sx={{ px: { xs: 0.5, sm: 2 }, fontFamily: 'inherit' }}>
                <Grid container spacing={{ xs: 2, md: 4 }} columns={12}>
                    {/* Şirket Bilgileri */}
                    <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }} sx={{ mb: { xs: 2, md: 0 } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                            <CloudQueueIcon sx={{ color: '#4285F4', fontSize: { xs: 32, sm: 36 }, mb: 0.2 }} />
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{
                                    color: '#4285F4',
                                    fontWeight: 500,
                                    fontFamily: 'Inter, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
                                    fontSize: { xs: 13, sm: 15 },
                                    letterSpacing: 1.1,
                                    textTransform: 'uppercase',
                                    lineHeight: 1.1,
                                    mt: 0.2,
                                }}
                            >
                                Bulut Store
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 2, fontSize: { xs: 13, sm: 15 }, fontFamily: 'inherit', fontWeight: 400, letterSpacing: 0.1, textAlign: 'center' }}>
                            Bulutsoft Dev organizasyonunun uygulama mağazası.
                        </Typography>

                    </Grid>

                    {/* Hızlı Erişim Linkleri */}
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, fontSize: 17, fontFamily: 'inherit', letterSpacing: 0.5 }}>
                            Mağaza
                        </Typography>
                        <Link component={RouterLink} to="/apps" color="inherit" display="block" sx={{ mb: 1, display: 'block', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2 }} variant="body2">
                            Uygulamalar
                        </Link>
                        <Link component={RouterLink} to="/categories" color="inherit" display="block" sx={{ mb: 1, display: 'block', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2 }} variant="body2">
                            Kategoriler
                        </Link>
                    </Grid>

                    {/* Hesap İşlemleri */}
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, fontSize: 17, fontFamily: 'inherit', letterSpacing: 0.5 }}>
                            Hesap
                        </Typography>
                        <Link component={RouterLink} to="/login" color="inherit" display="block" sx={{ mb: 1, display: 'flex', alignItems: 'center', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2, gap: 0.7 }} variant="body2">
                            Giriş Yap
                        </Link>
                        <Link component={RouterLink} to="/register" color="inherit" display="block" sx={{ mb: 1, display: 'flex', alignItems: 'center', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2, gap: 0.7 }} variant="body2">
                            Kayıt Ol
                        </Link>
                        <Link component={RouterLink} to="/profile" color="inherit" display="block" sx={{ mb: 1, display: 'block', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2 }} variant="body2">
                            Hesabım
                        </Link>
                        <Link component={RouterLink} to="/my-apps" color="inherit" display="block" sx={{ mb: 1, display: 'block', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2 }} variant="body2">
                            Uygulamalarım
                        </Link>
                    </Grid>

                    {/* Destek ve Yardım */}
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, fontSize: 17, fontFamily: 'inherit', letterSpacing: 0.5 }}>
                            Yardım
                        </Typography>
                        <Link component={RouterLink} to="/help" color="inherit" display="block" sx={{ mb: 1, display: 'block', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2 }} variant="body2">
                            Sıkça Sorulan Sorular
                        </Link>
                        <Link component={RouterLink} to="/help" color="inherit" display="block" sx={{ mb: 1, display: 'block', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2 }} variant="body2">
                            Müşteri Hizmetleri
                        </Link>
                        <Link component={RouterLink} to="/help" color="inherit" display="block" sx={{ mb: 1, display: 'block', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2 }} variant="body2">
                            İade Politikası
                        </Link>
                        <Link component={RouterLink} to="/help" color="inherit" display="block" sx={{ mb: 1, display: 'block', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2 }} variant="body2">
                            Gizlilik Politikası
                        </Link>
                    </Grid>
                    {/* Diğer Çözümlerimiz */}
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, fontSize: 17, fontFamily: 'inherit', letterSpacing: 0.5 }}>
                            Ürünlerimiz
                        </Typography>
                        <Link href="https://yurttaye.onrender.com/" color="inherit" display="block" sx={{ mb: 1, display: 'block', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2 }} variant="body2" target="_blank" rel="noopener">
                            YurttaYe
                        </Link>
                        <Link href="https://transmind.onrender.com/" color="inherit" display="block" sx={{ mb: 1, display: 'block', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2 }} variant="body2" target="_blank" rel="noopener">
                            TransMind
                        </Link>
                        <Link href="https://www.petsolive.com.tr/" color="inherit" display="block" sx={{ mb: 1, display: 'block', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2 }} variant="body2" target="_blank" rel="noopener">
                            PetSoLive
                        </Link>
                        <Link href="https://bulutstore.vercel.app/" color="inherit" display="block" sx={{ mb: 1, display: 'block', fontWeight: 500, fontFamily: 'inherit', letterSpacing: 0.2 }} variant="body2" target="_blank" rel="noopener">
                            BulutStore
                        </Link>
                    </Grid>

                    {/* İletişim */}
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, fontSize: 17, fontFamily: 'inherit', letterSpacing: 0.5 }}>
                            İletişim
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 400, letterSpacing: 0.1 }}>
                            bulutsoftdev@gmail.com
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 400, letterSpacing: 0.1 }}>
                            Türkiye
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Alt Kısım - Telif Hakkı */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: { xs: 'center', sm: 'left' },
                    gap: { xs: 1, sm: 0 }
                }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 12, sm: 14 } }}>
                        © {new Date().getFullYear()} Bulutsoft. Tüm hakları saklıdır.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: { xs: 1, sm: 0 } }}>
                        <Link href="https://x.com/Bulutsoftdev" color="inherit" target="_blank" rel="noopener">
                            <TwitterIcon />
                        </Link>
                        <Link href="https://github.com/bulutsoft-dev" color="inherit" target="_blank" rel="noopener">
                            <GitHubIcon />
                        </Link>
                        <Link href="https://www.linkedin.com/company/bulutsoft-dev/" color="inherit" target="_blank" rel="noopener">
                            <LinkedInIcon />
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
