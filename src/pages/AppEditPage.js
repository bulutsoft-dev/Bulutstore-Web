import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppEditForm from '../components/apps/AppEditForm';
import { getAppById, updateApp } from '../api/appApi';
import useAppSubmission from '../hooks/useAppSubmission';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export default function AppEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loadingApp, setLoadingApp] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState('');

  const appSubmission = useAppSubmission(user, true); // true = edit mode

  useEffect(() => {
    setLoadingApp(true);
    getAppById(id)
      .then(res => {
        const app = res.data;
        appSubmission.setForm({
          name: app.name || '',
          shortDescription: app.shortDescription || '',
          description: app.description || '',
          versionName: app.versionName || '',
          iconUrl: app.iconUrl || '',
          screenshotUrls: app.screenshotUrls || [],
          fileUrl: app.fileUrl || '',
          category: app.category || null, // category object
          tags: app.tags || [], // array of tag objects
          developer: app.developer || null, // developer object if needed
          developerWebsite: app.developer?.website || '',
          developerDisplayName: app.developer?.displayName || '',
        });
        setLoadingApp(false);
      })
      .catch(() => {
        setFetchError('Uygulama bulunamadı veya yüklenemedi.');
        setLoadingApp(false);
      });
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async () => {
    appSubmission.setLoading(true);
    setEditError('');
    setEditSuccess(false);
    try {
      await updateApp(id, appSubmission.form);
      setEditSuccess(true);
      setTimeout(() => navigate('/my-apps'), 1500);
    } catch (e) {
      setEditError('Güncelleme başarısız.');
    } finally {
      appSubmission.setLoading(false);
    }
  };

  if (loadingApp) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh"><CircularProgress /></Box>;
  }
  if (fetchError) {
    return <Box color="error.main" textAlign="center" mt={4}>{fetchError}</Box>;
  }

  return (
    <AppEditForm
      {...appSubmission}
      handleSubmit={handleSubmit}
      success={editSuccess}
      error={editError}
    />
  );
}
