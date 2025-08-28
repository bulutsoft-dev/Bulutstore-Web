import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';

const ReviewForm = ({ reviewText, setReviewText, reviewLoading, reviewError, onSubmit }) => {
  const [rating, setRating] = React.useState(0);
  const [showRatingError, setShowRatingError] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      setShowRatingError(true);
      return;
    }
    setShowRatingError(false);
    onSubmit(e, rating);
  };

  return (
    <Paper elevation={0} sx={{ background: '#fff', p: 2, mt: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
        Write a review
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            name="star-rating"
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue);
              setShowRatingError(false);
            }}
            size="large"
          />
          <Typography sx={{ ml: 1 }}>{rating > 0 ? rating : ''}</Typography>
        </Box>
        {showRatingError && (
          <Typography color="error" variant="caption" sx={{ mb: 1, display: 'block' }}>
            Please select a star rating.
          </Typography>
        )}
        <TextField
          label="Share your experience"
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          fullWidth
          multiline
          minRows={3}
          disabled={reviewLoading}
          required
          sx={{ mb: 1 }}
        />
        {reviewError && <Alert severity="error" sx={{ mb: 1 }}>{reviewError}</Alert>}
        <Button
          type="submit"
          variant="contained"
          disabled={reviewLoading || !reviewText.trim() || !rating}
          size="medium"
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          {reviewLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ReviewForm;
