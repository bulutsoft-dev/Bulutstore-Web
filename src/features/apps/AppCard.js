import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Typography,
    Box,
    Avatar,
    Chip,
    Tooltip
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
                {/* Paylaş butonu sağ üst köşe, sade icon olarak */}
                <Tooltip title="Paylaş">
                  <IconButton
                    onClick={handleShareClick}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 2,
                      color: '#888',
                      background: '#fff',
                      border: '1px solid #eee',
                      p: 0.5,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                      '&:hover': {
                        background: '#f5f5f5',
                        color: '#222',
                        borderColor: '#d0d0d0'
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
                            bgcolor: '#f5f5f5',
                            border: '1px solid #eee',
                            fontSize: 20,
                            fontWeight: 600,
                            mr: 1.5,
                            color: '#888'
                        }}
                    >
                        {(!app.iconUrl && !app.image) ? app.name?.[0]?.toUpperCase() : null}
                    </Avatar>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 700,
                                fontSize: 15,
                                lineHeight: 1.3,
                                mb: 0.2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                color: '#222'
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
                                display: 'block',
                                color: '#888'
                            }}
                        >
                            {(typeof app.developer === 'object' && app.developer !== null) ? (app.developer.displayName || app.developer.username || 'Geliştirici Bilinmiyor') : (app.developer || app.developerName || 'Geliştirici Bilinmiyor')}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                                {renderStars(app.rating)}
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 11, ml: 0.5, color: '#888' }}>
                                    {app.rating ? app.rating.toFixed(1) : '0.0'}
                                </Typography>
                            </Box>

                            {app.isPremium && (
                                <Chip
                                    label="Premium"
                                    size="small"
                                    sx={{
                                        bgcolor: '#f5f5f5',
                                        color: '#888',
                                        fontWeight: '600',
                                        fontSize: '10px',
                                        height: '18px',
                                        ml: 'auto',
                                        borderRadius: 1,
                                        border: '1px solid #eee'
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
                        mb: 1.5,
                        color: '#888',
                        maxWidth: '100%',
                        whiteSpace: 'normal',
                    }}
                >
                    {app.shortDescription || (app.description && app.description.length > 60 ? app.description.substring(0, 60) + '...' : app.description || 'Bu uygulama için kısa açıklama bulunmamaktadır.')}
                </Typography>
            </Box>

            {/* Alt Bilgi ve İstatistikler */}
            <Box
                sx={{
                    bgcolor: '#fafbfc',
                    borderTop: '1px solid #eee',
                    p: 1.5,
                    pt: 1
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {app.category && (
                            <Tooltip title={typeof app.category === 'object' && app.category !== null ? app.category.name : app.category}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1.5 }}>
                                    <CategoryIcon sx={{ fontSize: 14, color: '#b0b0b0', mr: 0.5 }} />
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, color: '#b0b0b0' }}>
                                        {typeof app.category === 'object' && app.category !== null ? (app.category.name?.length > 10 ? `${app.category.name.substring(0, 10)}...` : app.category.name) : (app.category.length > 10 ? `${app.category.substring(0, 10)}...` : app.category)}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        )}

                        {app.updatedAt && (
                            <Tooltip title={`Güncelleme: ${new Date(app.updatedAt).toLocaleDateString('tr-TR')}`}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarMonthIcon sx={{ fontSize: 14, color: '#b0b0b0', mr: 0.5 }} />
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, color: '#b0b0b0' }}>
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
                                color: '#888',
                                p: 0.5,
                                ml: 1,
                                background: '#f5f5f5',
                                '&:hover': {
                                    background: '#eee',
                                    color: '#222'
                                }
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
                                <DownloadIcon sx={{ fontSize: 14, color: '#b0b0b0', mr: 0.5 }} />
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11, fontWeight: 500, color: '#b0b0b0' }}>
                                    {formatDownloads(app.downloads)}
                                </Typography>
                            </Box>
                        </Tooltip>
                    )}
                </Box>

                {/* Kategori Bilgisi */}
                {/* Removed duplicate category rendering here. If you want to show version info, move it elsewhere. */}
                {app.versionName && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Sürüm: {app.versionName}
                    </Typography>
                  </Box>
                )}
                {/* Tags rendering */}
                {Array.isArray(app.tags) && app.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {app.tags.map(tag => (
                      <Chip key={tag.id} label={`#${tag.name}`} size="small" variant="outlined" sx={{ fontSize: 10, height: 18 }} />
                    ))}
                  </Box>
                )}
            </Box>
        </Card>
    );
};

export default AppCard;
