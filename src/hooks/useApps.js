import { useEffect, useState } from 'react';
import { getAllApps, getAppsByCategory } from '../api/appApi';

export default function useApps(categoryId) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId || categoryId === 'all') {
      setLoading(true);
      setError(null);
      getAllApps()
        .then(res => {
          setApps(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError('Uygulamalar yüklenemedi.');
          setLoading(false);
        });
      return;
    }
    setLoading(true);
    setError(null);
    getAppsByCategory(categoryId)
      .then(res => {
        // Only include approved apps
        const approvedApps = res.data.filter(app => app.status === 'APPROVED');
        setApps(approvedApps);
        setLoading(false);
      })
      .catch(() => {
        setError('Uygulamalar yüklenemedi.');
        setLoading(false);
      });
  }, [categoryId]);

  return { apps, loading, error };
}
