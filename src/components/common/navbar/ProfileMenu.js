import React from 'react';
import { Menu, MenuItem, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ProfileMenu = ({
    anchorEl,
    open,
    onClose,
    onLogout
}) => (
    <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        PaperProps={{
            elevation: 3,
            sx: { mt: 1.5, minWidth: 180 }
        }}
    >
        <MenuItem onClick={onClose} component={RouterLink} to="/profile">Profil</MenuItem>
        <MenuItem onClick={onClose} component={RouterLink} to="/account">Hesabım</MenuItem>
        <Divider />
        <MenuItem onClick={onLogout}>Çıkış Yap</MenuItem>
    </Menu>
);

export default ProfileMenu;

