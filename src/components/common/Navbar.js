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
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
      <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} component={RouterLink} to="/profile">Profil</MenuItem>
        <MenuItem onClick={handleMenuClose} component={RouterLink} to="/account">Hesabım</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>Çıkış Yap</MenuItem>
      </Menu>
  );

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'white', color: '#5f6368', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Toolbar sx={{ minHeight: '64px', justifyContent: 'space-between' }}>
            {/* Logo - Sol Tarafta */}
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
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
                    display: { xs: 'none', sm: 'block' }
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
                  to="/games"
                  sx={{
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(66, 133, 244, 0.08)',
                      color: '#4285F4'
                    }
                  }}
              >
                Oyunlar
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

              {/* Kullanıcı İşlemleri */}
              <IconButton color="inherit" sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}>
                <ShoppingCart />
              </IconButton>

              {/* Giriş/Kayıt butonları */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Button
                    color="inherit"
                    component={RouterLink}
                    to="/login"
                    sx={{
                      borderRadius: '4px',
                      mr: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(66, 133, 244, 0.08)',
                        color: '#4285F4'
                      }
                    }}
                >
                  Giriş Yap
                </Button>
                <Button
                    variant="contained"
                    component={RouterLink}
                    to="/register"
                    sx={{
                      backgroundColor: '#4285F4',
                      borderRadius: '4px',
                      '&:hover': {
                        backgroundColor: '#3367d6'
                      }
                    }}
                >
                  Kayıt Ol
                </Button>
              </Box>

              {/* Mobil menü butonu */}
              <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{ display: { xs: 'block', sm: 'none' } }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
  );
};

export default Navbar;
