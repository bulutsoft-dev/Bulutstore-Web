import React from 'react';
import { Button, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const ActionButton = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const UserActions = ({ isAuthenticated, location, handleLogout, handleProfileMenuOpen }) => (
    <>
        {isAuthenticated ? (
            <>
                <ActionButton
                    color="inherit"
                    component={RouterLink}
                    to="/profile"
                    sx={{
                        borderBottom: location.pathname.startsWith('/profile') ? '2px solid #4285F4' : '2px solid transparent',
                        borderRadius: 0,
                    }}
                >
                    Profil
                </ActionButton>
                <ActionButton color="inherit" onClick={handleLogout}>Çıkış Yap</ActionButton>
                <IconButton
                    edge="end"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    aria-label="Kullanıcı menüsü"
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                    <AccountCircle />
                </IconButton>
            </>
        ) : (
            <>
                <ActionButton
                    color="inherit"
                    component={RouterLink}
                    to="/login"
                    sx={{
                        borderBottom: location.pathname === '/login' ? '2px solid #4285F4' : '2px solid transparent',
                        borderRadius: 0,
                        fontWeight: 500,
                        fontSize: 15,
                        letterSpacing: 0.2,
                        textTransform: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.7,
                    }}
                >
                    <LoginIcon sx={{ fontSize: 18, mb: '2px', mr: 0.5 }} /> Giriş Yap
                </ActionButton>
                <ActionButton
                    color="inherit"
                    component={RouterLink}
                    to="/register"
                    sx={{
                        backgroundColor: '#4285F4',
                        color: 'white',
                        '&:hover': { backgroundColor: '#3367d6' },
                        borderBottom: location.pathname === '/register' ? '2px solid #4285F4' : '2px solid transparent',
                        borderRadius: 0,
                        fontWeight: 500,
                        fontSize: 15,
                        letterSpacing: 0.2,
                        textTransform: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.7,
                    }}
                >
                    <PersonAddAltIcon sx={{ fontSize: 18, mb: '2px', mr: 0.5 }} /> Kayıt Ol
                </ActionButton>
                <IconButton
                    edge="end"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    aria-label="Kullanıcı menüsü"
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                    <AccountCircle />
                </IconButton>
            </>
        )}
    </>
);

export default UserActions;
