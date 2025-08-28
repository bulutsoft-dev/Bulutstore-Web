import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from '@mui/material';

function DeleteDialog({ open, onClose, onConfirm, loading, appName }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Uygulamayı Sil</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {appName ? `"${appName}" adlı uygulamayı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.` : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Vazgeç</Button>
        <Button onClick={onConfirm} color="error" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Sil'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;

