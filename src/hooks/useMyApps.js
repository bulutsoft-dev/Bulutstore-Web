import { useState, useCallback } from 'react';
import { getAppsByDeveloper, deleteApp } from '../api/appApi';

export default function useMyApps(user) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchApps = useCallback(async () => {
    setError(null);
    setRefreshing(true);
    if (!user || !(user.id || user._id)) {
      setError('Kullanıcı bulunamadı.');
      setLoading(false);
      setRefreshing(false);
      return;
    }
    try {
      const developerId = user.id || user._id;
      const response = await getAppsByDeveloper(developerId);
      setApps(response.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Uygulamalar alınamadı.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  const handleDeleteApp = useCallback(async (app) => {
    setDeleting(true);
    try {
      await deleteApp(app.id || app._id);
      setApps(prev => prev.filter(a => (a.id || a._id) !== (app.id || app._id)));
      setSelectedApp(null);
    } catch (err) {
      setError('Uygulama silinemedi.');
    } finally {
      setDeleting(false);
    }
  }, []);

  return {
    apps,
    loading,
    error,
    refreshing,
    deleting,
    selectedApp,
    setSelectedApp,
    fetchApps,
    handleDeleteApp,
    setError,
  };
}

