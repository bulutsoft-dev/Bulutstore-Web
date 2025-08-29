import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

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
                }}
            >
                Anasayfa
            </Button>
            <Button
                color="inherit"
                component={RouterLink}
                to="/apps"
                sx={{
                    borderBottom: location.pathname.startsWith('/apps') ? '2px solid #4285F4' : '2px solid transparent',
                    borderRadius: 0,
                }}
            >
                Uygulamalar
            </Button>
            {user?.role?.toUpperCase() === 'ADMIN' && (
                <Button
                    color="inherit"
                    component={RouterLink}
                    to="/admin"
                    sx={{
                        borderBottom: location.pathname.startsWith('/admin') ? '2px solid #4285F4' : '2px solid transparent',
                        borderRadius: 0,
                    }}
                >
                    Admin Panel
                </Button>
            )}
        </>
    );
};

export default NavLinks;

