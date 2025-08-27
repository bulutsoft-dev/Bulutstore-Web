import { useState, useCallback } from 'react';
import { registerUser, loginUser } from '../api/userApi';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(userData);
      setUser(data.user || null);
      setToken(data.token || null);
      if (data.token) localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(credentials);
      setUser(data.user || null);
      setToken(data.token || null);
      if (data.token) localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  return { user, token, loading, error, register, login, logout };
};

