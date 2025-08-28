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
import AppSubmissionForm from '../components/apps/AppSubmissionForm';
import useAppSubmission from '../hooks/useAppSubmission';

const AppSubmitPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [localAlert, setLocalAlert] = useState(location.state?.alert || null);

  // Helper: check if user is developer
  const isDeveloper = user && (user.role === 'developer' || (Array.isArray(user.roles) && user.roles.includes('developer')));

  // Use custom hook for all form logic
  const appSubmission = useAppSubmission(user);

  useEffect(() => {
    if (!user) return;
    if (!isDeveloper) {
      navigate('/profile', { state: { alert: 'Uygulama eklemek için geliştirici olmalısınız.' } });
    }
  }, [user, isDeveloper, navigate]);

  return (
    <Container maxWidth="md">
      {/* Show alert if redirected or local */}
      {localAlert && (
        <Alert severity="warning" onClose={() => setLocalAlert(null)} sx={{ mb: 2 }}>{localAlert}</Alert>
      )}
      <Box mt={4} mb={2}>
        <Typography variant="h4" align="center">App Submission</Typography>
      </Box>
      <AppSubmissionForm {...appSubmission} />
    </Container>
  );
};

export default AppSubmitPage;
