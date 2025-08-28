import React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chip from '@mui/material/Chip';

const ReviewList = ({ reviews, currentUser, onDelete, onEdit }) => {
    const [editId, setEditId] = React.useState(null);
    const [editText, setEditText] = React.useState('');
    const [editRating, setEditRating] = React.useState(0);

    // Kendi yorumunu en üste al
    let sortedReviews = reviews;
    if (currentUser) {
        const own = reviews.find(r => r.username === currentUser.username);
        const others = reviews.filter(r => r.username !== currentUser.username);
        sortedReviews = own ? [own, ...others] : others;
    }

    const startEdit = (review) => {
        setEditId(review.id);
        setEditText(review.comment);
        setEditRating(review.rating);
    };
    const cancelEdit = () => {
        setEditId(null);
        setEditText('');
        setEditRating(0);
    };
    const submitEdit = (id) => {
        onEdit(id, { comment: editText, rating: editRating });
        cancelEdit();
    };

    return (
        <Stack spacing={2}>
            {sortedReviews.map((review, idx) => {
                const isOwn = currentUser && review.username === currentUser.username;
                const isHelpful = Math.random() > 0.5; // Rastgele "faydalı" durumu (gerçek uygulamada API'den gelmeli)

                return (
                    <Card
                        key={review.id || idx}
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
                                    value={editId === review.id ? editRating : review.rating || 0}
                                    readOnly={editId !== review.id}
                                    onChange={(_, v) => setEditRating(v)}
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

                            {/* Yorum içeriği */}
                            {editId === review.id ? (
                                <Box sx={{ mb: 2 }}>
                                    <TextField
                                        value={editText}
                                        onChange={e => setEditText(e.target.value)}
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        size="small"
                                        sx={{ mb: 1 }}
                                    />
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Button variant="outlined" size="small" onClick={cancelEdit}>
                                            İptal
                                        </Button>
                                        <Button variant="contained" size="small" onClick={() => submitEdit(review.id)}>
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
                            {review.developerReply && (
                                <Box sx={{
                                    mt: 1,
                                    p: 1.5,
                                    bgcolor: '#f8f9fa',
                                    borderRadius: 1,
                                    borderLeft: '3px solid',
                                    borderColor: 'primary.main'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                        <ReplyIcon sx={{ fontSize: 16, color: 'primary.main', mr: 0.5 }} />
                                        <Typography variant="caption" fontWeight={600} color="primary.main">
                                            Geliştirici Yanıtı
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                            {review.replyDate && new Date(review.replyDate).toLocaleDateString('tr-TR')}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {review.developerReply}
                                    </Typography>
                                </Box>
                            )}

                            {/* Faydalı butonları */}
                            {editId !== review.id && (
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                        Bu yorum faydalı oldu mu?
                                    </Typography>
                                    <IconButton size="small" sx={{ color: isHelpful ? 'primary.main' : 'inherit' }}>
                                        <ThumbUpAltOutlinedIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small">
                                        <ThumbDownAltOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>

                        {/* Düzenleme ve silme butonları */}
                        {isOwn && editId !== review.id && (
                            <IconButton
                                size="small"
                                sx={{ position: 'absolute', top: 8, right: 8 }}
                                onClick={(e) => {
                                    // Burada bir menü açılabilir, şimdilik doğrudan düzenlemeye yönlendiriyoruz
                                    startEdit(review);
                                }}
                            >
                                <MoreVertIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Card>
                );
            })}
        </Stack>
    );
};

export default ReviewList;
