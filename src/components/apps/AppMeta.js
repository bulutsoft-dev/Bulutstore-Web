import React from 'react';
import { Box, Chip } from '@mui/material';

const AppMeta = ({ category, status, isPremium, version }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 1 }}>
    {category && <Chip label={category.name} size="small" sx={{ fontWeight: 600, fontSize: 13 }} />}
    {status && <Chip label={status} size="small" sx={{ fontWeight: 600, fontSize: 13 }} />}
    {isPremium && <Chip label="Premium" size="small" color="warning" sx={{ fontWeight: 600, fontSize: 13 }} />}
    {version && <Chip label={`v${version}`} size="small" sx={{ fontWeight: 600, fontSize: 13 }} />}
  </Box>
);

export default AppMeta;

