import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReplyIcon from '@mui/icons-material/Reply';

const DeveloperReply = ({ reply, replyDate }) => {
  if (!reply) return null;
  return (
    <Box
      sx={{
        mt: 1,
        p: 1.5,
        bgcolor: '#f8f9fa',
        borderRadius: 1,
        borderLeft: '3px solid',
        borderColor: 'primary.main'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <ReplyIcon sx={{ fontSize: 16, color: 'primary.main', mr: 0.5 }} />
        <Typography variant="caption" fontWeight={600} color="primary.main">
          Geliştirici Yanıtı
        </Typography>
        {replyDate && (
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            {new Date(replyDate).toLocaleDateString('tr-TR')}
          </Typography>
        )}
      </Box>
      <Typography variant="body2" color="text.secondary">
        {reply}
      </Typography>
    </Box>
  );
};

export default DeveloperReply;

