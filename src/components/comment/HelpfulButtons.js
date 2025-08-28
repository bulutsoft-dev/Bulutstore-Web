import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

const HelpfulButtons = ({ isHelpful, onHelpful, onNotHelpful, disabled }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
    <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
      Bu yorum faydalı oldu mu?
    </Typography>
    <IconButton
      size="small"
      sx={{ color: isHelpful ? 'primary.main' : 'inherit' }}
      onClick={onHelpful}
      disabled={disabled}
    >
      <ThumbUpAltOutlinedIcon fontSize="small" />
    </IconButton>
    <IconButton
      size="small"
      onClick={onNotHelpful}
      disabled={disabled}
    >
      <ThumbDownAltOutlinedIcon fontSize="small" />
    </IconButton>
  </Box>
);

export default HelpfulButtons;

