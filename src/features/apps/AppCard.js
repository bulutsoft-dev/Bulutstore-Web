import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Typography,
    Box,
    Avatar,
    Chip,
    Tooltip,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Star as StarIcon,
    StarBorder as StarBorderIcon,
    StarHalf as StarHalfIcon,
    Download as DownloadIcon,
    Category as CategoryIcon,
    CalendarMonth as CalendarMonthIcon,
    Share as ShareIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const AppCard = ({ app, onShare }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // Yıldız derecelendirmesi oluşturma
    const renderStars = (rating = 0) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<StarIcon key={i} sx={{ color: '#FFB400', fontSize: 14 }} />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<StarHalfIcon key={i} sx={{ color: '#FFB400', fontSize: 14 }} />);
            } else {
                stars.push(<StarBorderIcon key={i} sx={{ color: '#DDD', fontSize: 14 }} />);
            }
        }

        return stars;
    };

    // Tarih formatlama
    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        const d = new Date(dateStr);
        const now = new Date();
        const diffTime = Math.abs(now - d);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Dün';
        if (diffDays < 7) return `${diffDays} gün önce`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} hafta önce`;

        return d.toLocaleDateString('tr-TR');
    };

    // İndirme sayısı formatlama
    const formatDownloads = (downloads) => {
        if (!downloads) return '0';
        if (downloads >= 1000000) return (downloads / 1000000).toFixed(1) + 'M';
        if (downloads >= 1000) return (downloads / 1000).toFixed(1) + 'B';
        return downloads.toString();
    };

    const handleShareClick = (e) => {
        e.stopPropagation();
        if (onShare) onShare(app);
    };

    return (
        <Card
            sx={{
                width: isSmallScreen ? '100%' : 240,
                minWidth: 200,
                maxWidth: 260,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                borderRadius: 3,
                p: 0,
                background: '#fff',
                border: '1px solid #f0f0f0',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.12)',
                },
            }}
            onClick={() => navigate(`/apps/${app.id}`)}
        >
            <Box sx={{ p: 2, pb: 1.5, position: 'relative' }}>
                {/* Paylaş butonu sağ üst köşe, sade icon olarak */}
                <Tooltip title="Paylaş">
                  <IconButton
                    onClick={handleShareClick}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 2,
                      color: '#636363',
                      background: 'none',
                      border: 'none',
                      p: 0.5,
                      '&:hover': {
                        background: 'rgba(25, 118, 210, 0.08)'
                      }
                    }}
                  >
                    <ShareIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Tooltip>
                {/* Uygulama Görseli ve Temel Bilgiler */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                    <Avatar
                        src={app.iconUrl || app.image || ''}
                        alt={app.name}
                        sx={{
                            width: 52,
                            height: 52,
                            bgcolor: '#f8f9fa',
                            border: '1px solid #e9ecef',
                            fontSize: 20,
                            fontWeight: 600,
                            mr: 1.5
                        }}
                    >
                        {(!app.iconUrl && !app.image) ? app.name?.[0]?.toUpperCase() : null}
                    </Avatar>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                fontSize: 15,
                                lineHeight: 1.3,
                                mb: 0.2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {app.name}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                fontSize: 11,
                                lineHeight: 1.2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: 'block'
                            }}
                        >
                            {app.developer || app.developerName || 'Geliştirici Bilinmiyor'}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                                {renderStars(app.rating)}
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 11, ml: 0.5, color: '#666' }}>
                                    {app.rating ? app.rating.toFixed(1) : '0.0'}
                                </Typography>
                            </Box>

                            {app.isPremium && (
                                <Chip
                                    label="Premium"
                                    size="small"
                                    sx={{
                                        bgcolor: 'rgba(255, 193, 7, 0.15)',
                                        color: '#E6B800',
                                        fontWeight: '600',
                                        fontSize: '10px',
                                        height: '18px',
                                        ml: 'auto'
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* Açıklama */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: 12,
                        lineHeight: 1.4,
                        height: 40,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        mb: 1.5
                    }}
                >
                    {app.description || 'Bu uygulama için açıklama bulunmamaktadır.'}
                </Typography>
            </Box>

            {/* Alt Bilgi ve İstatistikler */}
            <Box
                sx={{
                    bgcolor: '#f9f9f9',
                    borderTop: '1px solid #f0f0f0',
                    p: 1.5,
                    pt: 1
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {app.category && (
                            <Tooltip title={app.category}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1.5 }}>
                                    <CategoryIcon sx={{ fontSize: 14, color: '#6c757d', mr: 0.5 }} />
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
                                        {app.category.length > 10 ? `${app.category.substring(0, 10)}...` : app.category}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        )}

                        {app.updatedAt && (
                            <Tooltip title={`Güncelleme: ${new Date(app.updatedAt).toLocaleDateString('tr-TR')}`}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarMonthIcon sx={{ fontSize: 14, color: '#6c757d', mr: 0.5 }} />
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
                                        {formatDate(app.updatedAt)}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        )}
                    </Box>
                    <Tooltip title="Detaylar">
                        <IconButton
                            onClick={e => {
                                e.stopPropagation();
                                navigate(`/apps/${app.id}`);
                            }}
                            sx={{
                                color: '#1976d2',
                                p: 0.5,
                                ml: 1
                            }}
                            size="small"
                        >
                            <ChevronRightIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {app.downloads && (
                        <Tooltip title="İndirme sayısı">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <DownloadIcon sx={{ fontSize: 14, color: '#6c757d', mr: 0.5 }} />
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11, fontWeight: 500 }}>
                                    {formatDownloads(app.downloads)}
                                </Typography>
                            </Box>
                        </Tooltip>
                    )}
                    {/* Detaylar ve paylaş butonları kaldırıldı */}
                </Box>
            </Box>
        </Card>
    );
};

export default AppCard;
