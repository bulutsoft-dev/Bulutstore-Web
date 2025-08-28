import React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const ReviewList = ({ reviews }) => (
  <Stack spacing={2}>
    {reviews.map((review, idx) => (
      <Card key={review.id || idx} variant="outlined" sx={{ p: 2, borderRadius: 3, boxShadow: 0 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: '#1976d2', width: 40, height: 40 }}>
            {review.username ? review.username[0].toUpperCase() : 'U'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle1" fontWeight={500}>
                {review.username || 'User'}
              </Typography>
              <Rating value={review.rating || 0} readOnly size="small" sx={{ ml: 1 }} />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {review.comment}
            </Typography>
            {review.createdAt && (
              <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        </Stack>
      </Card>
    ))}
  </Stack>
);

export default ReviewList;
