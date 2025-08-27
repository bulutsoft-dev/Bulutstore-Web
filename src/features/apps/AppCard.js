import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const AppCard = ({ app }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 1, borderRadius: 2 }}>
    <CardContent sx={{ p: 1.5 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, fontSize: 15 }}>
        {app.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: 13 }}>
        {app.description || 'Açıklama yok.'}
      </Typography>
    </CardContent>
  </Card>
);

export default AppCard;

