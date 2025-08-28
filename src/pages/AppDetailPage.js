import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AppHeader from '../components/apps/AppHeader';
import AppScreenshots from '../components/apps/AppScreenshots';
import AppDescription from '../components/apps/AppDescription';
import AppTags from '../components/apps/AppTags';
import { useAuthContext } from '../context/AuthContext';
import { getAllReviews, createReview, updateReview, deleteReview } from '../api/reviewApi';
import ReviewList from '../components/comment/ReviewList';
import ReviewForm from '../components/comment/ReviewForm';
import useApp from '../hooks/useApp';

const AppDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { app, loading, error } = useApp(id);
  const { user, loading: authLoading } = useAuthContext();

  // Cache screenshots only on first load for each app id
  const [cachedScreenshots, setCachedScreenshots] = React.useState([]);
  const prevAppId = React.useRef();

  React.useEffect(() => {
    if (app && id !== prevAppId.current) {
      setCachedScreenshots(Array.isArray(app.screenshotUrls) ? app.screenshotUrls : []);
      prevAppId.current = id;
    }
  }, [app, id]);

  const [reviews, setReviews] = React.useState([]);
  const [reviewText, setReviewText] = React.useState('');
  const [reviewLoading, setReviewLoading] = React.useState(false);
  const [reviewError, setReviewError] = React.useState(null);

  React.useEffect(() => {
    getAllReviews()
      .then(res => {
        // Debug log for id and appId
        console.log('DEBUG | useParams id:', id, '| reviews:', res.data);
        // Filter reviews for this app
        const filtered = Array.isArray(res.data) ? res.data.filter(r => r.appId === Number(id)) : [];
        console.log('DEBUG | Filtered reviews:', filtered);
        setReviews(filtered);
      })
      .catch(() => setReviews([]));
  }, [id]);

  const handleReviewSubmit = async (e, rating) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewError(null);
    if (!user?.id) {
      setReviewError('Yorum göndermek için giriş yapmalısınız.');
      setReviewLoading(false);
      return;
    }
    try {
      await createReview({
        appId: Number(id), // appId artık integer olarak gönderiliyor
        userId: user.id,
        rating,
        comment: reviewText
      });
      // Yorum eklendikten sonra güncel listeyi API'den çek
      const res = await getAllReviews();
      const filtered = Array.isArray(res.data) ? res.data.filter(r => r.appId === Number(id)) : [];
      setReviews(filtered);
      setReviewText('');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setReviewError('Bu uygulamaya zaten yorum yaptınız.');
      } else {
        setReviewError(err.response?.data?.message || err.message);
      }
    } finally {
      setReviewLoading(false);
    }
  };

  // Review silme
  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (err) {
      setReviewError('Failed to delete review.');
    }
  };

  // Review düzenleme
  const handleEditReview = async (reviewId, data) => {
    try {
      const payload = {
        appId: Number(id),
        userId: user && user.id ? user.id : null,
        rating: data.rating,
        comment: data.comment
      };
      console.log('DEBUG | Edit review payload:', payload);
      await updateReview(reviewId, payload);
      // Edit sonrası güncel listeyi API'den çek
      const res = await getAllReviews();
      const filtered = Array.isArray(res.data) ? res.data.filter(r => r.appId === Number(id)) : [];
      setReviews(filtered);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setReviewError('Bu uygulamaya zaten bir yorumunuz var. (Aynı yorumu güncelleyemezsiniz.)');
      } else {
        setReviewError('Failed to update review.');
      }
    }
  };

  // Kullanıcı bu uygulamaya zaten yorum yaptı mı?
  const userAlreadyReviewed = user && reviews.some(r => r.username === user.username);

  // Giriş yapma isteği fonksiyonu
  const handleLoginRequest = () => {
    navigate('/login');
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }
  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }
  if (!app) {
    return null;
  }


  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 1, sm: 3 }, py: { xs: 2, sm: 4 }, width: '100%' }}>
      <AppHeader app={app} />
      <AppScreenshots screenshots={cachedScreenshots} />
      <AppDescription shortDescription={app.shortDescription} description={app.description} />
      <AppTags tags={app.tags} tagIds={app.tagIds} />

      {/* Reviews Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>Reviews</Typography>
        {reviews.length === 0 && (
          <Typography color="text.secondary" sx={{ mb: 2 }}>No reviews yet.</Typography>
        )}
        <ReviewList
          reviews={reviews}
          currentUser={user}
          onDelete={handleDeleteReview}
          onEdit={handleEditReview}
          onLoginRequest={handleLoginRequest}
        />
        {reviews.length > 0 && <Divider sx={{ my: 3 }} />}
        {/* Review Form for logged-in users */}
        {authLoading ? (
          <Typography color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
            Loading user info...
          </Typography>
        ) : user && !userAlreadyReviewed ? (
          <ReviewForm
            reviewText={reviewText}
            setReviewText={setReviewText}
            reviewLoading={reviewLoading}
            reviewError={reviewError}
            onSubmit={handleReviewSubmit}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default AppDetailPage;
