import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import StoreIcon from '@mui/icons-material/Store';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

/**
 * Navbar tasarımına uyumlu responsive footer bileşeni
 * Google Play benzeri modern bir tasarım
 */
const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: { xs: 3, sm: 4 },
                px: 2,
                mt: 'auto',
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #e0e0e0',
                color: '#5f6368'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 3, md: 4 }}>
                    {/* Şirket Bilgileri */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#4285F4', fontWeight: 'bold' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <StoreIcon sx={{ mr: 1, fontSize: 28 }} />
                                BulutStore
                            </Box>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Bulutsoft Dev organizasyonunun uygulama mağazası.
                        </Typography>

                    </Grid>

                    {/* Hızlı Erişim Linkleri */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Mağaza
                        </Typography>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Uygulamalar
                        </Link>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Oyunlar
                        </Link>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Kategoriler
                        </Link>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            En Çok İndirilenler
                        </Link>
                    </Grid>

                    {/* Hesap İşlemleri */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Hesap
                        </Typography>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Giriş Yap
                        </Link>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Kayıt Ol
                        </Link>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Hesabım
                        </Link>
                    </Grid>

                    {/* Destek ve Yardım */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Yardım
                        </Typography>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Sıkça Sorulan Sorular
                        </Link>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Müşteri Hizmetleri
                        </Link>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            İade Politikası
                        </Link>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Gizlilik Politikası
                        </Link>
                    </Grid>
                    {/* Diğer Çözümlerimizm */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Ürünlerimiz
                        </Typography>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            YurttaYe
                        </Link>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            IME
                        </Link>
                    </Grid>

                    {/* İletişim */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            İletişim
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            info@bulutstore.com
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            +90 212 345 67 89
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            İstanbul, Türkiye
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
                    textAlign: { xs: 'center', sm: 'left' }
                }}>
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} BulutStore. Tüm hakları saklıdır.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Link href="#" color="inherit">
                            <FacebookIcon />
                        </Link>
                        <Link href="#" color="inherit">
                            <TwitterIcon />
                        </Link>
                        <Link href="#" color="inherit">
                            <InstagramIcon />
                        </Link>
                        <Link href="#" color="inherit">
                            <LinkedInIcon />
                        </Link>
                    </Box>
                    <Box sx={{
                        mt: { xs: 1, sm: 0 },
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'center', sm: 'flex-start' }
                    }}>
                        <Link href="#" color="text.secondary" variant="body2" sx={{
                            mr: { sm: 2, xs: 0 },
                            mb: { xs: 1, sm: 0 },
                            display: 'inline-block'
                        }}>
                            Kullanım Koşulları
                        </Link>
                        <Link href="#" color="text.secondary" variant="body2" sx={{ display: 'inline-block' }}>
                            Gizlilik Politikası
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
