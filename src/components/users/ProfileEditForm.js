import React, { useState } from 'react';
import { Alert, Box, Button, Paper, TextField, Typography, Stack } from '@mui/material';
import { updateUser } from '../../api/userApi';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ProfileEditForm = ({
    user,
    setUser, // optional: to update parent user state
}) => {
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    // Local state for editable fields
    const [form, setForm] = useState({
        username: user.username || '',
        email: user.email || '',
        displayName: user.displayName || '',
        website: user.website || '',
        password: '' // yeni şifre için
    });
    const [showPassword, setShowPassword] = useState(false);

    // Update local form state when user prop changes
    React.useEffect(() => {
        setForm({
            username: user.username || '',
            email: user.email || '',
            displayName: user.displayName || '',
            website: user.website || '',
        });
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);
        // Zorunlu alanlar boşsa kaydetme
        if (!form.username || !form.email) {
            setError('Kullanıcı adı ve e-posta boş olamaz.');
            setLoading(false);
            return;
        }
        // Şifre zorunlu
        if (!form.password || form.password.trim() === "") {
            setError('Profil güncellemeleri için mevcut şifrenizi girmeniz gerekmektedir.');
            setLoading(false);
            return;
        }
        // Tüm alanları gönder (role ve status zorunlu ise ekle)
        const payload = {
            username: form.username,
            email: form.email,
            displayName: form.displayName,
            website: form.website,
            password: form.password,
            role: user.role, // zorunlu alan
            status: user.status // eğer backend istiyorsa
        };
        console.log('[ProfileEditForm] updateUser payload:', payload);
        try {
            const updated = await updateUser(user.id, payload);
            console.log('[ProfileEditForm] updateUser response:', updated);
            setSuccess(true);
            setEditMode(false);
            if (setUser) setUser(updated);
        } catch (err) {
            if (err.response) {
                console.error('[ProfileEditForm] updateUser error response:', err.response.data);
            }
            console.error('[ProfileEditForm] updateUser error:', err);
            setError('Profil güncellenemedi.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setForm({
            username: user.username || '',
            email: user.email || '',
            displayName: user.displayName || '',
            website: user.website || '',
            password: ''
        });
        setEditMode(false);
        setError('');
        setSuccess(false);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Profil Bilgilerini Düzenle
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>Profil başarıyla güncellendi.</Alert>
            )}
            <Stack spacing={2}>
                {/* Editable fields */}
                <TextField
                    label="Kullanıcı Adı"
                    name="username"
                    value={form.username || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !editMode }}
                />
                <TextField
                    label="E-posta"
                    name="email"
                    value={form.email || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !editMode }}
                />
                <TextField
                    label="Görünen Ad"
                    name="displayName"
                    value={form.displayName || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !editMode }}
                />
                <TextField
                    label="Web Sitesi"
                    name="website"
                    value={form.website || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !editMode }}
                />
                <TextField
                    label="Durum"
                    value={user.isDeveloper ? 'Geliştirici' : 'Normal Kullanıcı'}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                />
                {user.joinDate && (
                    <TextField
                        label="Üyelik Tarihi"
                        value={new Date(user.joinDate).toLocaleDateString('tr-TR')}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                )}
                <TextField
                    label="Şifre (değiştirmek istemiyorsan boş bırak)"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: !editMode,
                        endAdornment: (
                            <Button onClick={() => setShowPassword((v) => !v)} tabIndex={-1} size="small">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </Button>
                        )
                    }}
                    helperText="Şifreyi değiştirmek istemiyorsan boş bırak."
                />
                {/* Action buttons at the bottom */}
                <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                    {!editMode ? (
                        <Button variant="contained" onClick={() => setEditMode(true)}>
                            Düzenle
                        </Button>
                    ) : (
                        <>
                            <Button variant="contained" color="primary" onClick={handleSaveProfile} disabled={loading}>
                                Kaydet
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={handleCancel} disabled={loading}>
                                İptal
                            </Button>
                        </>
                    )}
                </Box>
            </Stack>
        </Paper>
    );
};

export default ProfileEditForm;
