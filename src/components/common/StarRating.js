import React from 'react';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const StarRating = ({ rating = 0, size = 14 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<StarIcon key={i} sx={{ color: '#FFB400', fontSize: size }} />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<StarHalfIcon key={i} sx={{ color: '#FFB400', fontSize: size }} />);
    } else {
      stars.push(<StarBorderIcon key={i} sx={{ color: '#DDD', fontSize: size }} />);
    }
  }
  return <Box sx={{ display: 'flex', alignItems: 'center' }}>{stars}</Box>;
};

export default StarRating;

