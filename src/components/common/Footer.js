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
                        <Link href="/apps" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Uygulamalar
                        </Link>
                        <Link href="/categories" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Kategoriler
                        </Link>
                    </Grid>

                    {/* Hesap İşlemleri */}
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Hesap
                        </Typography>
                        <Link href="/login" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Giriş Yap
                        </Link>
                        <Link href="/register" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Kayıt Ol
                        </Link>
                        <Link href="/profile" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Hesabım
                        </Link>
                        <Link href="/my-apps" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Uygulamalarım
                        </Link>
                    </Grid>

                    {/* Destek ve Yardım */}
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Yardım
                        </Typography>
                        <Link href="/help" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Sıkça Sorulan Sorular
                        </Link>
                        <Link href="/help" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Müşteri Hizmetleri
                        </Link>
                        <Link href="/help" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            İade Politikası
                        </Link>
                        <Link href="/help" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2">
                            Gizlilik Politikası
                        </Link>
                    </Grid>
                    {/* Diğer Çözümlerimiz */}
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Ürünlerimiz
                        </Typography>
                        <Link href="https://yurttaye.onrender.com/" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2" target="_blank" rel="noopener">
                            YurttaYe
                        </Link>
                        <Link href="https://transmind.onrender.com/" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2" target="_blank" rel="noopener">
                            TransMind
                        </Link>
                        <Link href="https://www.petsolive.com.tr/" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2" target="_blank" rel="noopener">
                            PetSoLive
                        </Link>
                        <Link href="https://bulutstore.vercel.app/" color="inherit" display="block" sx={{ mb: 1, display: 'block' }} variant="body2" target="_blank" rel="noopener">
                            BulutStore
                        </Link>
                    </Grid>

                    {/* İletişim */}
                    <Grid gridColumn={{ xs: 'span 6', sm: 'span 3', md: 'span 2' }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            İletişim
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            bulutsoftdev@gmail.com
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
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
