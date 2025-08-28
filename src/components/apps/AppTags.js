import React from 'react';
import { Box, Typography } from '@mui/material';
import TagChip from '../common/TagChip';

const AppTags = ({ tags, tagIds }) => {
  if (Array.isArray(tags) && tags.length > 0) {
    return (
      <Box sx={{ mt: 3, mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1976d2', mr: 1 }}>Etiketler:</Typography>
        {tags.map((tag) => (
          <TagChip key={tag.id} label={tag.name} />
        ))}
      </Box>
    );
  } else if (Array.isArray(tagIds) && tagIds.length > 0) {
    return (
      <Box sx={{ mt: 3, mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1976d2', mr: 1 }}>Etiketler:</Typography>
        {tagIds.map((tagId, idx) => (
          <TagChip key={tagId || idx} label={tagId} />
        ))}
      </Box>
    );
  }
  return null;
};

export default AppTags;
