import React, { createContext, useContext, useState, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  const notify = useCallback((message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar open={notification.open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <MuiAlert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }} elevation={6} variant="filled">
          {notification.message}
        </MuiAlert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

