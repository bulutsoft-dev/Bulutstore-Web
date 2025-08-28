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
              const id = app.userId || app.id || app._id;
              // Show actions if not approved or rejected
              const status = String(app.status).toLowerCase();
              const isActionable = status !== 'approved' && status !== 'rejected';
              let statusLabel = null;
              if (status === 'approved') {
                statusLabel = <Chip label="Approved" color="success" size="small" />;
              } else if (status === 'rejected') {
                statusLabel = <Chip label="Rejected" color="error" size="small" />;
              }
              return (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{app.username || '-'}</TableCell>
                  <TableCell>{app.email || '-'}</TableCell>
                  <TableCell>{app.developerApplicationText || app.applicationText || '-'}</TableCell>
                  <TableCell>{app.status || '-'}</TableCell>
                  <TableCell>{app.createdAt ? new Date(app.createdAt).toLocaleString() : '-'}</TableCell>
                  <TableCell>
                    {isActionable ? (
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          color="success"
                          variant="contained"
                          disabled={actionLoading[id]}
                          onClick={() => onApprove(id)}
                        >
                          {actionLoading[id] ? <CircularProgress size={18} color="inherit" /> : 'Approve'}
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="contained"
                          disabled={actionLoading[id]}
                          onClick={() => onReject(id)}
                        >
                          {actionLoading[id] ? <CircularProgress size={18} color="inherit" /> : 'Reject'}
                        </Button>
                      </Stack>
                    ) : statusLabel}
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
