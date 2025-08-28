import React from 'react';
import Stack from '@mui/material/Stack';
import NewReviewForm from './NewReviewForm';
import LoginPrompt from './LoginPrompt';
import ReviewCard from './ReviewCard';

const ReviewList = ({ reviews, currentUser, onDelete, onEdit, onLoginRequest, onSubmitNewReview }) => {
    const [editId, setEditId] = React.useState(null);
    const [editText, setEditText] = React.useState('');
    const [editRating, setEditRating] = React.useState(0);
    const [newReviewText, setNewReviewText] = React.useState('');
    const [newReviewRating, setNewReviewRating] = React.useState(0);

    // Kullanıcının daha önce yorum yapıp yapmadığını kontrol et
    const hasUserReviewed = currentUser && reviews.some(review => review.username === currentUser.username);

    // Kendi yorumunu en üste al
    let sortedReviews = reviews;
    if (currentUser) {
        const own = reviews.find(r => r.username === currentUser.username);
        const others = reviews.filter(r => r.username !== currentUser.username);
        sortedReviews = own ? [own, ...others] : others;
    }

    // Edit logic
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
    // New review logic
    const submitNewReview = () => {
        if (onSubmitNewReview) {
            onSubmitNewReview({
                comment: newReviewText,
                rating: newReviewRating
            });
            setNewReviewText('');
            setNewReviewRating(0);
        }
    };

    return (
        <Stack spacing={3}>
            {/* Yeni Yorum Bölümü - Sadece giriş yapmış ve henüz yorum yapmamış kullanıcılar için */}
            {currentUser && !hasUserReviewed && (
                <NewReviewForm
                    value={newReviewText}
                    rating={newReviewRating}
                    onTextChange={e => setNewReviewText(e.target.value)}
                    onRatingChange={setNewReviewRating}
                    onSubmit={submitNewReview}
                    disabled={newReviewText.trim() === '' || newReviewRating === 0}
                />
            )}
            {/* Giriş yapmamış kullanıcılar için yorum yapma teşviki */}
            {!currentUser && (
                <LoginPrompt onLoginRequest={onLoginRequest} />
            )}
            {/* Mevcut Yorumlar Listesi */}
            {sortedReviews.map((review, idx) => {
                const isOwn = currentUser && review.username === currentUser.username;
                const isEditing = editId === review.id;
                return (
                    <ReviewCard
                        key={review.id || idx}
                        review={review}
                        isOwn={isOwn}
                        isEditing={isEditing}
                        editText={editText}
                        editRating={editRating}
                        onEditStart={() => startEdit(review)}
                        onEditCancel={cancelEdit}
                        onEditSave={() => submitEdit(review.id)}
                        onDelete={() => onDelete(review.id)}
                        onEditTextChange={e => setEditText(e.target.value)}
                        onEditRatingChange={setEditRating}
                        currentUser={currentUser}
                    />
                );
            })}
        </Stack>
    );
};

export default ReviewList;
