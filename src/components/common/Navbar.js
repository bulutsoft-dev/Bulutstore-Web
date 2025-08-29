import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ClickAwayListener,
    styled,
    useMediaQuery,
    useTheme,
    Container
} from '@mui/material';
import {
    Store,
    AccountCircle,
    Search,
    Menu as MenuIcon,
    Close
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import useApps from '../../hooks/useApps';

// Stil bileşenleri
const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        marginRight: 0
    }
}));

const SearchResults = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    zIndex: theme.zIndex.modal + 1,
    maxHeight: 300,
    overflowY: 'auto',
    border: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(0.5)
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%'
    }
}));

const ActionButton = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const Navbar = () => {
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const searchInputRef = useRef(null);
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { user, isAuthenticated, logout } = useAuthContext();
    const { apps } = useApps();

    const isProfileMenuOpen = Boolean(profileAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

    // Arama sonuçlarını filtrele
    const filteredApps = searchQuery
        ? apps.filter(app =>
            app.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    // Olay yöneticileri
    const handleProfileMenuOpen = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleProfileMenuClose();
        handleMobileMenuClose();
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setShowResults(!!event.target.value);
    };

    const handleSearchOpen = () => {
        setIsSearchOpen(true);
        setTimeout(() => {
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, 100);
    };

    const handleSearchClose = useCallback(() => {
        setIsSearchOpen(false);
        setShowResults(false);
        setSearchQuery('');
    }, []);

    const handleResultClick = (appId) => {
        navigate(`/apps/${appId}`);
        handleSearchClose();
    };

    // Arama dışına tıklandığında sonuçları kapat
    const handleClickAway = () => {
        if (showResults) {
            setShowResults(false);
        }
    };

    // ESC tuşu ile aramayı kapat
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.keyCode === 27 && isSearchOpen) {
                handleSearchClose();
            }
        };
        window.addEventListener('keydown', handleEscKey);
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [isSearchOpen, handleSearchClose]);

    // Menü bileşenleri
    const renderProfileMenu = (
        <Menu
            anchorEl={profileAnchorEl}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
            PaperProps={{
                elevation: 3,
                sx: {
                    mt: 1.5,
                    minWidth: 180
                }
            }}
        >
            <MenuItem
                onClick={handleProfileMenuClose}
                component={RouterLink}
                to="/profile"
            >
                Profil
            </MenuItem>
            <MenuItem
                onClick={handleProfileMenuClose}
                component={RouterLink}
                to="/account"
            >
                Hesabım
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMenuAnchorEl}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            PaperProps={{
                sx: {
                    width: 250,
                    maxWidth: '100%'
                }
            }}
        >
            <MenuItem
                onClick={handleMobileMenuClose}
                component={RouterLink}
                to="/"
            >
                Anasayfa
            </MenuItem>
            <MenuItem
                onClick={handleMobileMenuClose}
                component={RouterLink}
                to="/apps"
            >
                Uygulamalar
            </MenuItem>
            {user?.role?.toUpperCase() === 'ADMIN' && (
                <MenuItem
                    onClick={handleMobileMenuClose}
                    component={RouterLink}
                    to="/admin"
                >
                    Admin Panel
                </MenuItem>
            )}
            <Divider />
            {isAuthenticated ? (
                [
                    <MenuItem
                        key="profile-mobile"
                        onClick={handleMobileMenuClose}
                        component={RouterLink}
                        to="/profile"
                    >
                        Profil
                    </MenuItem>,
                    <MenuItem
                        key="account-mobile"
                        onClick={handleMobileMenuClose}
                        component={RouterLink}
                        to="/account"
                    >
                        Hesabım
                    </MenuItem>,
                    <MenuItem
                        key="logout-mobile"
                        onClick={handleLogout}
                    >
                        Çıkış Yap
                    </MenuItem>
                ]
            ) : (
                [
                    <MenuItem
                        key="login-mobile"
                        onClick={handleMobileMenuClose}
                        component={RouterLink}
                        to="/login"
                    >
                        Giriş Yap
                    </MenuItem>,
                    <MenuItem
                        key="register-mobile"
                        onClick={handleMobileMenuClose}
                        component={RouterLink}
                        to="/register"
                    >
                        Kayıt Ol
                    </MenuItem>
                ]
            )}
        </Menu>
    );

    // Arama bileşeni
    const renderSearchComponent = (isMobileView = false) => (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: isSearchOpen ? (isMobileView ? '100%' : 250) : 40,
                    transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
                    overflow: 'visible',
                    bgcolor: isSearchOpen ? 'rgba(0,0,0,0.04)' : 'transparent',
                    borderRadius: 2,
                    pl: isSearchOpen ? 1 : 0,
                    pr: 1,
                    position: 'relative',
                    ...(isMobileView && { mr: 1 }),
                }}
            >
                {isSearchOpen ? (
                    <>
                        <StyledInputBase
                            placeholder="Uygulama ara…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            inputRef={el => {
                                searchInputRef.current = el;
                                if (el && isSearchOpen) el.focus();
                            }}
                            onFocus={() => setShowResults(!!searchQuery)}
                            sx={{ width: '100%', minWidth: 0, background: 'none', border: 'none', boxShadow: 'none' }}
                            autoFocus
                        />
                        <IconButton
                            onClick={handleSearchClose}
                            sx={{ color: 'text.secondary', ml: 1, p: 0.5 }}
                            aria-label="Kapat"
                        >
                            <Close />
                        </IconButton>
                        {showResults && filteredApps.length > 0 && (
                            <SearchResults sx={{ left: 0, right: 0, width: '100%' }}>
                                {apps.length === 0 ? (
                                    <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>Yükleniyor...</Box>
                                ) : filteredApps.length === 0 ? (
                                    <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>Sonuç bulunamadı</Box>
                                ) : (
                                    <List dense>
                                        {filteredApps.map(app => (
                                            <ListItem key={app.id} disablePadding>
                                                <ListItemButton
                                                    onClick={() => handleResultClick(app.id)}
                                                    sx={{ py: 0.5 }}
                                                >
                                                    <ListItemText primary={app.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </SearchResults>
                        )}
                    </>
                ) : (
                    <IconButton
                        onClick={handleSearchOpen}
                        color="inherit"
                        aria-label="Uygulama ara"
                        sx={{ p: 0.5 }}
                    >
                        <Search />
                    </IconButton>
                )}
            </Box>
        </ClickAwayListener>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'white',
                    color: '#5f6368',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 80,
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: 80,
                        height: 80,
                        px: { xs: 1, sm: 2, md: 3 },
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Container maxWidth="lg" sx={{ p: 0, display: 'flex', flexDirection: 'column', minWidth: 0, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        {/* 1. Satır: Logo | Navigation | Profil */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            minWidth: 0,
                        }}>
                            {/* Sol: Logo */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flex: '0 0 auto',
                                minWidth: 0,
                                flexShrink: 1,
                                mr: { xs: 1, md: 2 },
                                overflow: 'hidden',
                            }}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                    aria-label="open navigation menu"
                                    sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Store sx={{
                                    color: '#4285F4',
                                    mr: 1,
                                    fontSize: { xs: 28, sm: 32 },
                                    flexShrink: 0
                                }} />
                                <Typography
                                    variant="h6"
                                    component={RouterLink}
                                    to="/"
                                    sx={{
                                        fontWeight: 'bold',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        fontSize: { xs: 18, sm: 22 },
                                        '&:hover': { color: '#4285F4' },
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    BulutStore
                                </Typography>
                            </Box>
                            {/* Orta: Navigation */}
                            <Box sx={{
                                display: { xs: 'none', md: 'flex' },
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                minWidth: 0,
                                overflow: 'hidden',
                                gap: 1,
                                mx: 2,
                            }}>
                                <Button
                                    color="inherit"
                                    component={RouterLink}
                                    to="/"
                                    sx={{ borderRadius: 1 }}
                                >
                                    Anasayfa
                                </Button>
                                <Button
                                    color="inherit"
                                    component={RouterLink}
                                    to="/apps"
                                    sx={{ borderRadius: 1 }}
                                >
                                    Uygulamalar
                                </Button>
                                {user?.role?.toUpperCase() === 'ADMIN' && (
                                    <Button
                                        color="inherit"
                                        component={RouterLink}
                                        to="/admin"
                                        sx={{ borderRadius: 1 }}
                                    >
                                        Admin Panel
                                    </Button>
                                )}
                            </Box>
                            {/* Sağ: Profil ve arama (sadece md ve üstü) */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                flex: '0 0 auto',
                                minWidth: 0,
                                position: 'relative',
                                width: { xs: 'auto', md: 'auto' },
                                gap: { xs: 1, md: 0 },
                                flexShrink: 1,
                                overflow: 'hidden',
                            }}>
                                {/* Desktop/Tablet: Search */}
                                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                    {renderSearchComponent(false)}
                                </Box>

                                {isAuthenticated ? (
                                    <>
                                        <ActionButton
                                            color="inherit"
                                            component={RouterLink}
                                            to="/profile"
                                        >
                                            Profil
                                        </ActionButton>
                                        <ActionButton
                                            color="inherit"
                                            onClick={handleLogout}
                                        >
                                            Çıkış Yap
                                        </ActionButton>
                                        <IconButton
                                            edge="end"
                                            onClick={handleProfileMenuOpen}
                                            color="inherit"
                                            aria-label="Kullanıcı menüsü"
                                            sx={{ display: { xs: 'none', md: 'flex' } }}
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        <ActionButton
                                            color="inherit"
                                            component={RouterLink}
                                            to="/login"
                                        >
                                            Giriş Yap
                                        </ActionButton>
                                        <ActionButton
                                            color="inherit"
                                            component={RouterLink}
                                            to="/register"
                                            sx={{
                                                backgroundColor: '#4285F4',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#3367d6',
                                                }
                                            }}
                                        >
                                            Kayıt Ol
                                        </ActionButton>
                                    </>
                                )}
                            </Box>
                        </Box>
                        {/* 2. Satır: Arama çubuğu (sadece küçük ekranlarda) ve profil ikonu */}
                        <Box sx={{
                            display: { xs: 'flex', md: 'none' },
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 1,
                        }}>
                            {renderSearchComponent(true)}
                            {/* Profile icon always visible on mobile, next to search */}
                            <IconButton
                                edge="end"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                                aria-label="Kullanıcı menüsü"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>

            {renderProfileMenu}
            {renderMobileMenu}
        </Box>
    );
};

export default Navbar;
