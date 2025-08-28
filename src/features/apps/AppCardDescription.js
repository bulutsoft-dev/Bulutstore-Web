import React from 'react';
import { Typography } from '@mui/material';

const AppCardDescription = ({ shortDescription, description }) => {
  let displayText = shortDescription;
  if (!displayText) {
    if (description && description.length > 60) {
      displayText = description.substring(0, 60) + '...';
    } else {
      displayText = description || 'Bu uygulama için kısa açıklama bulunmamaktadır.';
    }
  }
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        fontSize: 12,
        lineHeight: 1.4,
        height: 40,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        mb: 1.5,
        color: '#888',
        maxWidth: '100%',
        whiteSpace: 'normal',
      }}
    >
      {displayText}
    </Typography>
  );
};

export default AppCardDescription;

