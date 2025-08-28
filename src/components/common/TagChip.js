import React from 'react';
import { Chip } from '@mui/material';

const TagChip = ({ label }) => (
  <Chip label={`#${label}`} size="small" variant="outlined" />
);

export default TagChip;

