import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Alert
} from '@mui/material';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import AppAddForm from '../components/apps/AppAddForm';
import useAppSubmission from '../hooks/useAppSubmission';

const AppSubmitPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [localAlert, setLocalAlert] = useState(location.state?.alert || null);

  // Always call hooks first!
  const appSubmission = useAppSubmission(user);

  // Helper: check if user is developer (case-insensitive)
  const isDeveloper = user && (
    (typeof user.role === 'string' && user.role.toLowerCase() === 'developer') ||
    (Array.isArray(user.roles) && user.roles.map(r => r.toLowerCase()).includes('developer'))
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!isDeveloper) {
      navigate('/profile', { state: { alert: 'Uygulama eklemek için geliştirici olmalısınız.' } });
    }
  }, [user, isDeveloper, navigate]);

  // If not logged in or not developer, don't render the form
  if (!user || !isDeveloper) return null;

  // Redirect to home page after successful submission
  useEffect(() => {
    if (appSubmission.success) {
      navigate('/', { state: { alert: 'Uygulamanız başarıyla gönderildi!' } });
    }
  }, [appSubmission.success, navigate]);

  return (
    <Container maxWidth="md">
      {/* Show alert if redirected or local */}
      {localAlert && (
        <Alert severity="warning" onClose={() => setLocalAlert(null)} sx={{ mb: 2 }}>{localAlert}</Alert>
      )}
      <AppAddForm {...appSubmission} />
    </Container>
  );
};

export default AppSubmitPage;
