import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

/**
 * Uygulamanın üst kısmında yer alan navigasyon çubuğu (Navbar).
 * Tüm sayfalarda görünür. MUI ile responsive ve şık bir görünüm sağlar.
 */
const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BulutStore
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">Anasayfa</Button>
          <Button color="inherit" component={RouterLink} to="/users">Kullanıcılar</Button>
          <Button color="inherit" component={RouterLink} to="/tags">Etiketler</Button>
          <Button color="inherit" component={RouterLink} to="/apps">Uygulamalar</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

