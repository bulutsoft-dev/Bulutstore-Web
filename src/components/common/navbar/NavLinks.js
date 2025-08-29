import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const NavLinks = ({ user }) => {
    const location = useLocation();
    return (
        <>
            <Button
                color="inherit"
                component={RouterLink}
                to="/"
                sx={{
                    borderBottom: location.pathname === '/' ? '2px solid #4285F4' : '2px solid transparent',
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
                <HomeIcon sx={{ fontSize: 18, mb: '2px' }} /> Anasayfa
            </Button>
            <Button
                color="inherit"
                component={RouterLink}
                to="/apps"
                sx={{
                    borderBottom: location.pathname.startsWith('/apps') ? '2px solid #4285F4' : '2px solid transparent',
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
                <AppsIcon sx={{ fontSize: 18, mb: '2px' }} /> Uygulamalar
            </Button>
            {user?.role?.toUpperCase() === 'ADMIN' && (
                <Button
                    color="inherit"
                    component={RouterLink}
                    to="/admin"
                    sx={{
                        borderBottom: location.pathname.startsWith('/admin') ? '2px solid #4285F4' : '2px solid transparent',
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
                    <AdminPanelSettingsIcon sx={{ fontSize: 18, mb: '2px' }} /> Admin Panel
                </Button>
            )}
        </>
    );
};

export default NavLinks;
