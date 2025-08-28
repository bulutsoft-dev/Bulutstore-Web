import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const LoginPrompt = ({ onLoginRequest }) => (
  <Card
    variant="outlined"
    sx={{
      p: 2,
      borderRadius: 2,
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#f5f5f5'
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
        textAlign: 'center'
      }}
    >
      <Typography variant="h6" color="text.secondary">
        Deneyiminizi paylaşmak ister misiniz?
      </Typography>
      <Button
        variant="contained"
        onClick={onLoginRequest}
        sx={{ borderRadius: 2 }}
        size="large"
      >
        Giriş Yap ve Yorum Yap
      </Button>
    </Box>
  </Card>
);

export default LoginPrompt;

