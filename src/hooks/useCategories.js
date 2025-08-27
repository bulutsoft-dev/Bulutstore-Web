import { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categoryApi';

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Kategoriler yüklenemedi.');
        setLoading(false);
      });
  }, []);

  return { categories, loading, error };
}
