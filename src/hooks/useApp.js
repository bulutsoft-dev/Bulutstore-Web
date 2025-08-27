import { useEffect, useState } from 'react';
import { getAppById } from '../api/appApi';

export default function useApp(appId) {
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!appId) return;
    setLoading(true);
    setError(null);
    getAppById(appId)
      .then(res => {
        setApp(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Uygulama yüklenemedi.');
        setLoading(false);
      });
  }, [appId]);

  return { app, loading, error };
}

