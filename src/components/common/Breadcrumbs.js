import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';

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

// Map path segments to icons
const PATH_ICONS = {
  '': <HomeIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle', mb: '2px', color: 'primary.main' }} />,
  'apps': <AppsIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle', mb: '2px', color: 'primary.main' }} />,
  'profile': <AccountCircleIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle', mb: '2px', color: 'primary.main' }} />,
  'admin': <AdminPanelSettingsIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle', mb: '2px', color: 'primary.main' }} />,
  'users': <GroupIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle', mb: '2px', color: 'primary.main' }} />,
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

const AppBreadcrumbs = ({ extraLabels = [], user }) => {
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
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        '.MuiBreadcrumbs-separator': {
          mx: 0.5,
          color: 'text.disabled',
          fontSize: 18,
          fontWeight: 700,
          verticalAlign: 'middle',
        },
      }}
      separator={<ChevronRightIcon sx={{ fontSize: 18, color: '#bdbdbd', fontWeight: 700, verticalAlign: 'middle' }} />}
    >
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;
        const label = crumb.name?.length > 22 ? crumb.name.slice(0, 20) + '…' : crumb.name;
        let icon = PATH_ICONS[crumb.to.split('/').pop()] || null;
        // Show avatar if on profile page and user has avatar
        if (crumb.to === '/profile' && user?.avatarUrl) {
          icon = <img src={user.avatarUrl} alt="Profil" style={{ width: 22, height: 22, borderRadius: '50%', marginRight: 6, verticalAlign: 'middle', objectFit: 'cover', display: 'inline-block' }} />;
        }
        return isLast ? (
          <Tooltip title={crumb.name} key={crumb.to}>
            <Typography
              color="primary.main"
              sx={{
                fontWeight: 700,
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
              aria-current="page"
            >
              {icon}{label}
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
              {icon}{label}
            </Link>
          </Tooltip>
        );
      })}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
