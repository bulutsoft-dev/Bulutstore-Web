import { useEffect, useState } from 'react';
import { getAppsByCategory } from '../api/appApi';

export default function useApps(categoryId) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) {
      setApps([]);
      return;
    }
    setLoading(true);
    setError(null);
    getAppsByCategory(categoryId)
      .then(res => {
        setApps(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Uygulamalar yüklenemedi.');
        setLoading(false);
      });
  }, [categoryId]);

  return { apps, loading, error };
}

