import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Box
} from '@mui/material';
import AppCardHeader from './AppCardHeader';
import AppCardDescription from './AppCardDescription';
import AppCardMeta from './AppCardMeta';
import AppCardActions from './AppCardActions';

const AppCard = ({ app, onShare }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                width: 240,
                minWidth: 240,
                maxWidth: 240,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                borderRadius: 4,
                p: 0,
                background: '#fff',
                border: '1px solid #eee',
                transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
                cursor: 'pointer',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'translateY(-2px) scale(1.01)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.10)',
                    borderColor: '#d0d0d0',
                },
            }}
            onClick={() => navigate(`/apps/${app.id}`)}
        >
            <Box sx={{ p: 2, pb: 1.5, position: 'relative', background: '#fff' }}>
                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
                  <AppCardActions onShare={() => onShare && onShare(app)} onNavigate={() => navigate(`/apps/${app.id}`)} />
                </Box>
                <AppCardHeader app={app} />
                <AppCardDescription shortDescription={app.shortDescription} description={app.description} />
            </Box>
            <Box sx={{ bgcolor: '#fafbfc', borderTop: '1px solid #eee', p: 1.5, pt: 1 }}>
                <AppCardMeta category={app.category} updatedAt={app.updatedAt} downloadsCount={app.downloadsCount} />
            </Box>
        </Card>
    );
};

export default AppCard;
