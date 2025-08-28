import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Stack,
  Chip
} from '@mui/material';

const DeveloperRequestsTable = ({ applications, onApprove, onReject, actionLoading, actionError }) => {
  const getStatusChip = (status) => {
    switch (String(status).toUpperCase()) {
      case 'APPROVED':
        return <Chip label="Onaylandı" color="success" size="small" />;
      case 'REJECTED':
        return <Chip label="Reddedildi" color="error" size="small" />;
      case 'PENDING':
      default:
        return <Chip label="Bekliyor" color="warning" size="small" />;
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Application Text</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications && applications.length > 0 ? (
            applications.map((app) => {
              const id = app.id;
              const status = String(app.status).toLowerCase();
              return (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{app.username || '-'}</TableCell>
                  <TableCell>{app.email || '-'}</TableCell>
                  <TableCell>{app.developerApplicationText || '-'}</TableCell>
                  <TableCell>{getStatusChip(app.status)}</TableCell>
                  <TableCell>{app.createdAt ? new Date(app.createdAt).toLocaleString() : '-'}</TableCell>
                  <TableCell>
                    {status === 'pending' ? (
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          color="success"
                          variant="contained"
                          disabled={actionLoading[id]}
                          onClick={() => onApprove(id)}
                        >
                          {actionLoading[id] ? <CircularProgress size={18} color="inherit" /> : 'Onayla'}
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="contained"
                          disabled={actionLoading[id]}
                          onClick={() => onReject(id)}
                        >
                          {actionLoading[id] ? <CircularProgress size={18} color="inherit" /> : 'Reddet'}
                        </Button>
                      </Stack>
                    ) : (
                      getStatusChip(app.status)
                    )}
                    {actionError[id] && (
                      <Typography color="error" variant="caption">{actionError[id]}</Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="body2" color="text.secondary">
                  No developer requests found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeveloperRequestsTable;
