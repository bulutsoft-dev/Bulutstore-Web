import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function MyAppsTable({
  apps,
  categories,
  onEdit,
  onDelete,
  deleting,
  selectedApp
}) {
  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId || c._id === categoryId);
    return cat ? cat.name : '-';
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Resim</TableCell>
            <TableCell>Adı</TableCell>
            <TableCell>Açıklama</TableCell>
            <TableCell>Kategori</TableCell>
            <TableCell>Sürüm</TableCell>
            <TableCell>Durum</TableCell>
            <TableCell>İndirme</TableCell>
            <TableCell>Puan</TableCell>
            <TableCell>Oluşturulma</TableCell>
            <TableCell align="right">İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app.id || app._id}>
              <TableCell>
                {app.iconUrl || app.imageUrl ? (
                  <img src={app.iconUrl || app.imageUrl} alt={app.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                ) : (
                  <Box sx={{ width: 56, height: 56, bgcolor: '#eee', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 24 }}>
                    ?
                  </Box>
                )}
              </TableCell>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.description || '-'}</TableCell>
              <TableCell>{getCategoryName(app.category || app.categoryId)}</TableCell>
              <TableCell>{app.version || '-'}</TableCell>
              <TableCell>{app.status || 'Bilinmiyor'}</TableCell>
              <TableCell>{app.downloadsCount ?? app.downloadCount ?? '-'}</TableCell>
              <TableCell>{typeof app.avgRating === 'number' ? app.avgRating.toFixed(2) : (app.averageRating ? app.averageRating.toFixed(2) : '-')}</TableCell>
              <TableCell>{app.createdAt ? new Date(app.createdAt).toLocaleDateString('tr-TR') : '-'}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onEdit(app)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => onDelete(app)} disabled={deleting && selectedApp && (selectedApp.id || selectedApp._id) === (app.id || app._id)}>
                  {deleting && selectedApp && (selectedApp.id || selectedApp._id) === (app.id || app._id) ? <CircularProgress size={20} /> : <DeleteIcon />}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyAppsTable;

