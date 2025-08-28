import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/userSlice';
import {
  applyForDeveloper,
  approveDeveloper,
  rejectDeveloper,
  getDeveloperApplications
} from '../api/userApi';

export const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  return { users, status, error };
};

export const useDeveloperApplications = () => {
  const [applications, setApplications] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDeveloperApplications();
      setApplications(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { applications, fetchApplications, loading, error };
};

export const useApplyForDeveloper = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const apply = useCallback(async (applicationText) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await applyForDeveloper(applicationText);
      setSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { apply, loading, error, success };
};

export const useApproveRejectDeveloper = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const approve = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await approveDeveloper(userId);
      setSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const reject = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await rejectDeveloper(userId);
      setSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { approve, reject, loading, error, success };
};
