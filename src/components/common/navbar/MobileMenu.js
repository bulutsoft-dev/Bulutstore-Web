import React from 'react';
import { Menu, MenuItem, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const MobileMenu = ({
    anchorEl,
    open,
    onClose,
    onLogout,
    isAuthenticated,
    user
}) => (
    <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { width: 250, maxWidth: '100%' } }}
    >
        <MenuItem onClick={onClose} component={RouterLink} to="/">Anasayfa</MenuItem>
        <MenuItem onClick={onClose} component={RouterLink} to="/apps">Uygulamalar</MenuItem>
        {user?.role?.toUpperCase() === 'ADMIN' && (
            <MenuItem onClick={onClose} component={RouterLink} to="/admin">Admin Panel</MenuItem>
        )}
        <Divider />
        {isAuthenticated ? (
            [
                <MenuItem key="profile-mobile" onClick={onClose} component={RouterLink} to="/profile">Profil</MenuItem>,
                <MenuItem key="account-mobile" onClick={onClose} component={RouterLink} to="/account">Hesabım</MenuItem>,
                <MenuItem key="logout-mobile" onClick={onLogout}>Çıkış Yap</MenuItem>
            ]
        ) : (
            [
                <MenuItem key="login-mobile" onClick={onClose} component={RouterLink} to="/login">Giriş Yap</MenuItem>,
                <MenuItem key="register-mobile" onClick={onClose} component={RouterLink} to="/register">Kayıt Ol</MenuItem>
            ]
        )}
    </Menu>
);

export default MobileMenu;

