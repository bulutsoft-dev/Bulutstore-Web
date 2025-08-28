import React from 'react';
import { Avatar, Box, Chip, Divider, Stack, Typography, Link as MuiLink, Button } from '@mui/material';
import { CheckCircle, Person, Email, Work, Description, Link as LinkIcon, Cancel } from '@mui/icons-material';

const ProfileSidebar = ({ user }) => (
    <Box component="aside">
        <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
                sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: 40, mb: 2 }}
            >
                {user.username?.[0]?.toUpperCase() || '?'}
            </Avatar>
        </Box>
        <Typography variant="h5" fontWeight={700} gutterBottom>
            {user.username}
        </Typography>
        {user.displayName && (
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                <Person sx={{ verticalAlign: 'middle', mr: 0.5 }} fontSize="small" />
                {user.displayName}
            </Typography>
        )}
        <Chip
            icon={user.isDeveloper ? <CheckCircle /> : <Person />}
            label={user.isDeveloper ? 'Geliştirici' : 'Kullanıcı'}
            color={user.isDeveloper ? 'success' : 'default'}
            variant="outlined"
            sx={{ mb: 2 }}
        />
        <Divider sx={{ my: 2 }} />
        {/* Uygulama Ekle button - only visible to developers */}
        {user.role === 'DEVELOPER' && (
            <Box sx={{ mb: 2, width: '100%', textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    href="/apps/submit"
                    sx={{ fontWeight: 'bold', fontSize: 16 }}
                >
                    Uygulama Ekle
                </Button>
            </Box>
        )}
        <Stack spacing={1.5} alignItems="flex-start">
            <Box display="flex" alignItems="center">
                <Email color="action" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                    {user.email}
                </Typography>
            </Box>
            {user.website && (
                <Box display="flex" alignItems="center">
                    <LinkIcon color="action" sx={{ mr: 1 }} />
                    <MuiLink href={user.website} target="_blank" rel="noopener" variant="body2">
                        {user.website}
                    </MuiLink>
                </Box>
            )}
            <Box display="flex" alignItems="center">
                <Work color="action" sx={{ mr: 1 }} />
                <Typography variant="body2">
                    <b>Rol:</b> {user.role || 'Bilinmiyor'}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center">
                {user.status === 'ACTIVE' ? (
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                ) : (
                    <Cancel color="error" sx={{ mr: 1 }} />
                )}
                <Typography variant="body2">
                    <b>Durum:</b> {user.status === 'ACTIVE' ? 'Aktif' : user.status || 'Bilinmiyor'}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <Work color="action" sx={{ mr: 1 }} />
                <Typography variant="body2">
                    <b>Geliştirici Statüsü:</b> {user.isDeveloper ? 'Aktif Geliştirici' : 'Geliştirici Adayı'}
                </Typography>
            </Box>
            {user.joinDate && (
                <Box display="flex" alignItems="center">
                    <Description color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                        <b>Üyelik:</b> {new Date(user.joinDate).toLocaleDateString('tr-TR')}
                    </Typography>
                </Box>
            )}
        </Stack>
    </Box>
);

export default ProfileSidebar;
