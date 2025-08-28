import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu'; // Yeni import
import { useAuthContext } from '../../context/AuthContext';

// Arama çubuğu için stil
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5f6368',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '250px', // Daha kısa arama çubuğu
        },
    },
}));

/**
 * Google Play benzeri navbar tasarımı
 * Logo solda, navigasyon tam ortada, kullanıcı işlemleri sağda
 */
const Navbar = () => {
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
    const isProfileMenuOpen = Boolean(profileAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
    const { user, isAuthenticated, logout } = useAuthContext();

    const handleProfileMenuOpen = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleProfileMenuClose();
    };

    const profileMenuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-mobile-menu';

    const renderProfileMenu = (
        <Menu
            anchorEl={profileAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={profileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuClose} component={RouterLink} to="/profile">Profil</MenuItem>
            <MenuItem onClick={handleProfileMenuClose} component={RouterLink} to="/account">Hesabım</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMenuAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleMobileMenuClose} component={RouterLink} to="/">Anasayfa</MenuItem>
            <MenuItem onClick={handleMobileMenuClose} component={RouterLink} to="/apps">Uygulamalar</MenuItem>
            {user && String(user.role).toUpperCase() === 'ADMIN' && (
                <MenuItem onClick={handleMobileMenuClose} component={RouterLink} to="/admin">Admin Panel</MenuItem>
            )}
            <Divider />
            {user ? [
                <MenuItem key="profile" onClick={handleMobileMenuClose} component={RouterLink} to="/profile">Profil</MenuItem>,
                <MenuItem key="logout" onClick={() => { handleMobileMenuClose(); handleLogout(); }}>Çıkış Yap</MenuItem>
            ] : [
                <MenuItem key="login" onClick={handleMobileMenuClose} component={RouterLink} to="/login">Giriş Yap</MenuItem>,
                <MenuItem key="register" onClick={handleMobileMenuClose} component={RouterLink} to="/register">Kayıt Ol</MenuItem>
            ]}
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white', color: '#5f6368', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Toolbar sx={{ minHeight: '64px', justifyContent: 'space-between' }}>
                    {/* Logo - Sol Tarafta */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="open menu"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                            sx={{ display: { xs: 'block', md: 'none' }, mr: 1 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <StoreIcon sx={{ color: '#4285F4', mr: 1, fontSize: 30 }} />
                        <Typography
                            variant="h6"
                            component={RouterLink}
                            to="/"
                            sx={{
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                color: '#5f6368',
                                '&:hover': {
                                    color: '#4285F4'
                                },
                            }}
                        >
                            BulutStore
                        </Typography>
                    </Box>

                    {/* Navigasyon Linkleri - Tam Ortada */}
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center',
                        flex: 1,
                        gap: 1
                    }}>
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/"
                            sx={{
                                borderRadius: '4px',
                                '&:hover': {
                                    backgroundColor: 'rgba(66, 133, 244, 0.08)',
                                    color: '#4285F4'
                                }
                            }}
                        >
                            Anasayfa
                        </Button>

                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/apps"
                            sx={{
                                borderRadius: '4px',
                                '&:hover': {
                                    backgroundColor: 'rgba(66, 133, 244, 0.08)',
                                    color: '#4285F4'
                                }
                            }}
                        >
                            Uygulamalar
                        </Button>
                        {user && String(user.role).toUpperCase() === 'ADMIN' && (
                            <Button
                                color="inherit"
                                component={RouterLink}
                                to="/admin"
                                sx={{
                                    borderRadius: '4px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(66, 133, 244, 0.08)',
                                        color: '#4285F4'
                                    }
                                }}
                            >
                                Admin Panel
                            </Button>
                        )}
                    </Box>

                    {/* Sağ Bölüm - Arama ve Kullanıcı İşlemleri */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flex: 1,
                        gap: 1
                    }}>
                        {/* Arama Çubuğu */}
                        <Search sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Ara..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>


                        {/* Giriş/Kayıt veya Profil/Çıkış butonları */}
                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            {isAuthenticated ? (
                                <>
                                    <Button
                                        color="inherit"
                                        component={RouterLink}
                                        to="/profile"
                                        sx={{ borderRadius: '4px', mr: 1 }}
                                    >
                                        Profil
                                    </Button>
                                    <Button
                                        color="inherit"
                                        onClick={handleLogout}
                                        sx={{ borderRadius: '4px' }}
                                    >
                                        Çıkış Yap
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        color="inherit"
                                        component={RouterLink}
                                        to="/login"
                                        sx={{ borderRadius: '4px', mr: 1 }}
                                    >
                                        Giriş Yap
                                    </Button>
                                    <Button
                                        color="inherit"
                                        component={RouterLink}
                                        to="/register"
                                        sx={{ borderRadius: '4px' }}
                                    >
                                        Kayıt Ol
                                    </Button>
                                </>
                            )}
                        </Box>

                        {/* Mobilde gösterilecek arama ve profil ikonları */}
                        <IconButton color="inherit" sx={{ display: { xs: 'flex', sm: 'none' } }}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={profileMenuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            sx={{ display: { xs: 'flex', sm: 'none' } }}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderProfileMenu}
            {renderMobileMenu}
        </Box>
    );
};

export default Navbar;
