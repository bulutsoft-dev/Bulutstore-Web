import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function MyAppsTable({
  apps,
  onDelete,
  deleting,
  selectedApp
}) {
  const navigate = useNavigate();

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
            <TableCell>Geliştirici</TableCell>
            <TableCell>Etiketler</TableCell>
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
              <TableCell>{app.description ? (app.description.length > 60 ? app.description.substring(0, 60) + '...' : app.description) : '-'}</TableCell>
              <TableCell>{app.category?.name || '-'}</TableCell>
              <TableCell>{app.versionName || '-'}</TableCell>
              <TableCell>{app.status || 'Bilinmiyor'}</TableCell>
              <TableCell>{app.downloadsCount ?? app.downloadCount ?? '-'}</TableCell>
              <TableCell>{typeof app.avgRating === 'number' ? app.avgRating.toFixed(2) : (app.averageRating ? app.averageRating.toFixed(2) : '-')}</TableCell>
              <TableCell>{app.createdAt ? new Date(app.createdAt).toLocaleDateString('tr-TR') : '-'}</TableCell>
              <TableCell>{app.developer?.displayName || app.developer?.username || '-'}</TableCell>
              <TableCell>{Array.isArray(app.tags) && app.tags.length > 0 ? app.tags.map(tag => tag.name).join(', ') : '-'}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => navigate(`/apps/edit/${app.id || app._id}`)}><EditIcon /></IconButton>
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
