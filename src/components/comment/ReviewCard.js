import React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeveloperReply from './DeveloperReply';
import HelpfulButtons from './HelpfulButtons';

const ReviewCard = ({
  review,
  isOwn,
  isEditing,
  editText,
  editRating,
  onEditStart,
  onEditCancel,
  onEditSave,
  onDelete,
  onEditTextChange,
  onEditRatingChange,
  currentUser
}) => {
  const isHelpful = Math.random() > 0.5; // Placeholder logic

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 'none',
        borderColor: 'grey.200',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}
    >
      <Avatar
        sx={{
          bgcolor: '#1976d2',
          width: 40,
          height: 40,
          fontSize: 16,
          mr: 2,
          mt: 0.5
        }}
      >
        {review.username ? review.username[0].toUpperCase() : 'U'}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        {/* Kullanıcı adı ve tarih */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {review.username || 'User'}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {review.createdAt && new Date(review.createdAt).toLocaleDateString('tr-TR')}
          </Typography>
        </Box>
        {/* Rating ve cihaz bilgisi */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
          <Rating
            value={isEditing ? editRating : review.rating || 0}
            readOnly={!isEditing}
            onChange={(_, v) => onEditRatingChange(v)}
            size="small"
            sx={{ mr: 1 }}
          />
          {review.deviceInfo && (
            <Chip
              label={review.deviceInfo}
              size="small"
              variant="outlined"
              sx={{ height: 20, fontSize: '0.7rem' }}
            />
          )}
        </Box>
        {/* Yorum içeriği veya edit alanı */}
        {isEditing ? (
          <Box sx={{ mb: 2 }}>
            <TextField
              value={editText}
              onChange={onEditTextChange}
              fullWidth
              multiline
              minRows={3}
              size="small"
              sx={{ mb: 1 }}
            />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button variant="outlined" size="small" onClick={onEditCancel}>
                İptal
              </Button>
              <Button variant="contained" size="small" onClick={onEditSave}>
                Kaydet
              </Button>
            </Stack>
          </Box>
        ) : (
          <Typography variant="body2" color="text.primary" sx={{ mb: 2, lineHeight: 1.5 }}>
            {review.comment}
          </Typography>
        )}
        {/* Geliştirici yanıtı */}
        <DeveloperReply reply={review.developerReply} replyDate={review.replyDate} />
        {/* Faydalı butonları */}
        {!isEditing && (
          <HelpfulButtons
            isHelpful={isHelpful}
            onHelpful={() => {}}
            onNotHelpful={() => {}}
            disabled={!currentUser}
          />
        )}
      </Box>
      {/* Düzenleme ve silme butonları */}
      {isOwn && !isEditing && (
        <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
          <IconButton size="small" onClick={onEditStart}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

export default ReviewCard;

