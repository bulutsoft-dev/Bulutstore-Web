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
import logo from '../../assets/storelogo.png';

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
                fontSize: { xs: 13, sm: 15 }
            }}
        >
            <Container maxWidth="lg" sx={{ px: { xs: 0.5, sm: 2 } }}>
                <Grid container spacing={{ xs: 2, md: 4 }} columns={12}>
                    {/* Şirket Bilgileri */}
                    <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }} sx={{ mb: { xs: 2, md: 0 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src={logo} alt="BulutStore" style={{ height: 28, width: 28, marginRight: 8, borderRadius: 6 }} />
                            <Typography variant="h6" gutterBottom sx={{ color: '#4285F4', fontWeight: 'bold', fontSize: { xs: 18, sm: 22 } }}>
                                BulutStore
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 2, fontSize: { xs: 12, sm: 14 } }}>
                            Bulutsoft Dev organizasyonunun uygulama mağazası.
                        </Typography>

                    </Grid>

                    {/* Hızlı Erişim Linkleri */}
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
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
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
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
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
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
                    {/* Diğer Çözümlerimiz */}
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
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
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
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
                    textAlign: { xs: 'center', sm: 'left' },
                    gap: { xs: 1, sm: 0 }
                }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: 12, sm: 14 } }}>
                        © {new Date().getFullYear()} BulutStore. Tüm hakları saklıdır.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: { xs: 1, sm: 0 } }}>
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
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
