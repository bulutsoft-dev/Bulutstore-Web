import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const NewReviewForm = ({ value, rating, onTextChange, onRatingChange, onSubmit, disabled }) => (
  <Card
    variant="outlined"
    sx={{ p: 2, borderRadius: 2, position: 'relative', overflow: 'hidden' }}
  >
    <Typography variant="h6" gutterBottom>
      Yorumunuz
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Rating
        value={rating}
        onChange={(_, value) => onRatingChange(value)}
        size="large"
        sx={{ mr: 1 }}
      />
      <Typography variant="body2" color="text.secondary">
        Derecelendirin
      </Typography>
    </Box>
    <TextField
      value={value}
      onChange={onTextChange}
      fullWidth
      multiline
      rows={4}
      placeholder="Deneyiminizi paylaşın..."
      variant="outlined"
      sx={{ mb: 2 }}
    />
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        variant="contained"
        onClick={onSubmit}
        disabled={disabled}
      >
        Yorumu Gönder
      </Button>
    </Box>
  </Card>
);

export default NewReviewForm;

