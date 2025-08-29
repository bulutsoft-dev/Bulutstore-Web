import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';

// Helper to map path segments to readable names
const PATH_NAMES = {
  '': 'Anasayfa',
  'apps': 'Uygulamalar',
  'app': 'Uygulama',
  'edit': 'Düzenle',
  'profile': 'Profil',
  'admin': 'Admin',
  'users': 'Kullanıcılar',
  'submit': 'Uygulama Ekle',
  // Add more as needed
};

function getBreadcrumbs(location, extra) {
  const pathnames = location.pathname.split('/').filter(x => x);
  const crumbs = [
    { name: PATH_NAMES[''], to: '/' },
    ...pathnames.map((seg, idx) => {
      const to = '/' + pathnames.slice(0, idx + 1).join('/');
      let name = PATH_NAMES[seg] || seg;
      // If extra info (like app name) is provided for this segment, use it
      if (extra && extra[idx]) name = extra[idx];
      return { name, to };
    })
  ];
  return crumbs;
}

const AppBreadcrumbs = ({ extraLabels = [] }) => {
  const location = useLocation();
  const crumbs = getBreadcrumbs(location, extraLabels);
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        mb: 2,
        fontSize: { xs: 13, sm: 15 },
        fontWeight: 500,
        letterSpacing: 0.1,
        alignItems: 'center',
        '.MuiBreadcrumbs-separator': {
          mx: 0.5,
          color: 'text.disabled',
          fontSize: 18,
          fontWeight: 700,
          verticalAlign: 'middle',
        },
      }}
      separator={<span style={{ fontSize: 18, color: '#bdbdbd', fontWeight: 700, margin: '0 2px', verticalAlign: 'middle' }}>/</span>}
    >
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;
        const label = crumb.name?.length > 22 ? crumb.name.slice(0, 20) + '…' : crumb.name;
        const content = idx === 0 ? (
          <HomeIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle', mb: '2px', color: isLast ? 'text.primary' : 'primary.main' }} />
        ) : null;
        return isLast ? (
          <Tooltip title={crumb.name} key={crumb.to}>
            <Typography
              color="text.primary"
              sx={{
                fontWeight: 600,
                maxWidth: 160,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                verticalAlign: 'middle',
                fontSize: { xs: 13, sm: 15 },
                lineHeight: 1.7,
                transition: 'color 0.2s',
                px: 0.5,
                py: 0.1,
              }}
            >
              {content}{label}
            </Typography>
          </Tooltip>
        ) : (
          <Tooltip title={crumb.name} key={crumb.to}>
            <Link
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={crumb.to}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                fontWeight: idx === 0 ? 700 : 500,
                maxWidth: 160,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: { xs: 13, sm: 15 },
                lineHeight: 1.7,
                px: 0.5,
                py: 0.1,
                verticalAlign: 'middle',
                transition: 'color 0.2s',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                },
              }}
            >
              {content}{label}
            </Link>
          </Tooltip>
        );
      })}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
