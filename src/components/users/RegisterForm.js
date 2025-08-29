import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AppLogo from '../../assets/storelogo.png';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const RegisterForm = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  const { register, loading, error } = useAuthContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword((show) => !show);

  const validate = () => {
    if (!form.username || !form.email || !form.password) {
      setFormError('Tüm alanlar zorunludur.');
      return false;
    }
    // Basit e-posta kontrolü
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setFormError('Geçerli bir e-posta adresi giriniz.');
      return false;
    }
    if (form.password.length < 6) {
      setFormError('Şifre en az 6 karakter olmalıdır.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const data = await register(form);
    if (data && data.token) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <Box component={Paper} elevation={6} sx={{ p: { xs: 2, sm: 4 }, maxWidth: 420, mx: 'auto', mt: 6, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
          <LockOpenIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Kayıt Ol
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'center' }}>
          BulutStore'a katıl, uygulamaları keşfet ve topluluğa dahil ol!
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
        {(error || formError) && (
          <Alert severity="error" sx={{ mb: 2 }}>{error || formError}</Alert>
        )}
        {success && <Alert severity="success" sx={{ mb: 2 }}>Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Kullanıcı Adı"
          name="username"
          autoComplete="username"
          value={form.username}
          onChange={handleChange}
          error={!!formError && !form.username}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          error={!!formError && (!form.email || formError.includes('e-posta'))}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Şifre"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          error={!!formError && (!form.password || formError.includes('Şifre'))}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end" aria-label="şifreyi göster/gizle">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 1 }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block', ml: 1 }}>
          Şifre en az 6 karakter olmalıdır.
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<HowToRegIcon />}
          sx={{ mt: 2, mb: 2, py: 1.2, fontWeight: 600, fontSize: 16 }}
          disabled={loading}
        >
          {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
        </Button>
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Link component={RouterLink} to="/login" variant="body2">
            Zaten hesabınız var mı? <b>Giriş Yap</b>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
