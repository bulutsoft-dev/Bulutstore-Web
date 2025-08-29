import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppEditForm from '../components/apps/AppEditForm';
import { getAppById, updateApp } from '../api/appApi';
import useAppSubmission from '../hooks/useAppSubmission';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import AppBreadcrumbs from '../components/common/Breadcrumbs';

export default function AppEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loadingApp, setLoadingApp] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [editSuccess, setEditSuccess] = useState(false);
  const [editError, setEditError] = useState('');
  const [appName, setAppName] = useState('');

  const appSubmission = useAppSubmission(user, true); // true = edit mode

  useEffect(() => {
    setLoadingApp(true);
    getAppById(id)
      .then(res => {
        const app = res.data;
        setAppName(app.name || '...');
        appSubmission.setForm({
          name: app.name || '',
          shortDescription: app.shortDescription || '',
          description: app.description || '',
          version: app.version || app.versionName || '',
          iconUrl: app.iconUrl || '',
          screenshotUrls: app.screenshotUrls || [],
          fileUrl: app.fileUrl || '',
          categoryId: app.category?.id || '',
          tagIds: Array.isArray(app.tags) ? app.tags.map(t => t.id) : [],
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
    console.log('[DEBUG] handleSubmit called');
    appSubmission.setLoading(true);
    setEditError('');
    setEditSuccess(false);
    try {
      // Build payload to match backend spec
      const form = appSubmission.form;
      const payload = {
        name: form.name,
        description: form.description,
        shortDescription: form.shortDescription,
        version: form.version,
        versionName: form.version, // versionName de gönder
        iconUrl: form.iconUrl,
        screenshotUrls: form.screenshotUrls,
        fileUrl: form.fileUrl,
        categoryId: Number(form.categoryId),
        status: 'PENDING',
        tagIds: (form.tagIds || []).map(Number)
      };
      console.log('[DEBUG] updateApp about to be called', id, JSON.stringify(payload, null, 2));
      const response = await updateApp(id, payload);
      console.log('[DEBUG] updateApp response:', JSON.stringify(response.data, null, 2));
      setEditSuccess(true);
      setTimeout(() => navigate('/my-apps'), 1500);
    } catch (e) {
      console.log('[DEBUG] updateApp error:', e);
      setEditError('Güncelleme başarısız.');
    } finally {
      console.log('[DEBUG] handleSubmit finally, setting loading false');
      appSubmission.setLoading(false);
    }
  };

  if (loadingApp) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh"><CircularProgress /></Box>;
  }
  if (fetchError) {
    return <Box color="error.main" textAlign="center" mt={6} px={{ xs: 2, sm: 4 }} fontSize={18}>{fetchError}</Box>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <AppBreadcrumbs extraLabels={[null, appName, 'Düzenle']} />
      <Box sx={{ maxWidth: 600, mx: 'auto', px: { xs: 1, sm: 3 }, py: { xs: 2, sm: 4 }, width: '100%' }}>
        <AppEditForm
          {...appSubmission}
          handleSubmit={handleSubmit}
          success={editSuccess}
          error={editError}
        />
      </Box>
    </Box>
  );
}
