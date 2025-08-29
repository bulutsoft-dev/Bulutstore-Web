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
    alpha,
    Container
} from '@mui/material';
import {
    AccountCircle,
    Search,
    Menu as MenuIcon,
    Close
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import useApps from '../../hooks/useApps';

// Stil bileşenleri
const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    flexGrow: 1,
    maxWidth: 600,
    [theme.breakpoints.down('md')]: {
        marginRight: 0,
        maxWidth: '100%'
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
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%'
        }
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
    const location = useLocation();

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

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'white',
                    color: '#5f6368',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            >
                <Container maxWidth="lg" sx={{ px: { xs: 0.5, sm: 2 } }}>
                    <Toolbar sx={{
                        minHeight: 64,
                        px: 0, // Remove horizontal padding, Container handles it
                        flexWrap: 'nowrap'
                    }}>
                        {/* Left: Hamburger, Logo */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexGrow: 0,
                            minWidth: 0,
                            flexShrink: 1,
                            mr: 2
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
                            <Typography
                                variant="h6"
                                component={RouterLink}
                                to="/"
                                sx={{
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    color: '#4285F4', // Footer ile uyumlu renk
                                    fontSize: { xs: 18, sm: 22 },
                                    '&:hover': { color: '#3367d6' },
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    letterSpacing: 0.5
                                }}
                            >
                                BulutStore
                            </Typography>
                        </Box>

                        {/* Center: Navigation links (desktop/tablet) */}
                        <Box sx={{
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'center',
                            flexGrow: 0,
                            gap: 1,
                            mx: 2
                        }}>
                            <Button
                                color="inherit"
                                component={RouterLink}
                                to="/"
                                sx={{
                                    borderBottom: location.pathname === '/' ? '2px solid #4285F4' : '2px solid transparent',
                                    borderRadius: 0,
                                }}
                            >
                                Anasayfa
                            </Button>
                            <Button
                                color="inherit"
                                component={RouterLink}
                                to="/apps"
                                sx={{
                                    borderBottom: location.pathname.startsWith('/apps') ? '2px solid #4285F4' : '2px solid transparent',
                                    borderRadius: 0,
                                }}
                            >
                                Uygulamalar
                            </Button>
                            {user?.role?.toUpperCase() === 'ADMIN' && (
                                <Button
                                    color="inherit"
                                    component={RouterLink}
                                    to="/admin"
                                    sx={{
                                        borderBottom: location.pathname.startsWith('/admin') ? '2px solid #4285F4' : '2px solid transparent',
                                        borderRadius: 0,
                                    }}
                                >
                                    Admin Panel
                                </Button>
                            )}
                        </Box>

                        {/* Right: Search & User actions */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            flexGrow: 1,
                            minWidth: 0,
                            gap: 1
                        }}>
                            {/* Responsive Search */}
                            <SearchContainer
                                ref={searchContainerRef}
                                sx={{
                                    width: {
                                        xs: isSearchOpen ? '100%' : 'auto',
                                        md: isSearchOpen ? '100%' : 250
                                    },
                                    maxWidth: { md: isSearchOpen ? 400 : 250 },
                                    position: { xs: isSearchOpen ? 'absolute' : 'relative', md: 'relative' },
                                    left: { xs: isSearchOpen ? 0 : 'auto', md: 'auto' },
                                    top: { xs: isSearchOpen ? 0 : 'auto', md: 'auto' },
                                    zIndex: isSearchOpen ? (theme) => theme.zIndex.modal + 1 : 'auto',
                                    background: { xs: isSearchOpen ? 'white' : 'none', md: 'none' },
                                    margin: { xs: isSearchOpen ? 0 : '0 4px', md: '0 4px' },
                                    height: { xs: isSearchOpen ? '100%' : 'auto', md: 'auto' },
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {isSearchOpen || !isMobile ? (
                                    <ClickAwayListener onClickAway={isMobile ? handleSearchClose : () => {}}>
                                        <Box sx={{
                                            position: 'relative',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <StyledInputBase
                                                placeholder="Uygulama ara…"
                                                inputProps={{ 'aria-label': 'search' }}
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                                inputRef={searchInputRef}
                                                onFocus={() => setShowResults(!!searchQuery)}
                                                sx={{
                                                    backgroundColor: 'rgba(0,0,0,0.04)',
                                                    borderRadius: 2,
                                                    pl: 4,
                                                    pr: 2,
                                                    py: 0.5,
                                                    width: '100%',
                                                    flexGrow: 1,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0,0,0,0.06)',
                                                    },
                                                }}
                                                autoFocus={isMobile && isSearchOpen}
                                            />
                                            <Search
                                                sx={{
                                                    position: 'absolute',
                                                    left: 8,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    color: 'text.secondary'
                                                }}
                                            />
                                            {showResults && filteredApps.length > 0 && (
                                                <SearchResults>
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
                                                </SearchResults>
                                            )}
                                            {/* Close button for mobile search */}
                                            {isMobile && isSearchOpen && (
                                                <IconButton
                                                    onClick={handleSearchClose}
                                                    sx={{
                                                        color: 'text.secondary',
                                                        ml: 1
                                                    }}
                                                    aria-label="Kapat"
                                                >
                                                    <Close />
                                                </IconButton>
                                            )}
                                        </Box>
                                    </ClickAwayListener>
                                ) : (
                                    <IconButton
                                        onClick={handleSearchOpen}
                                        color="inherit"
                                        aria-label="Uygulama ara"
                                        sx={{ ml: 1 }}
                                    >
                                        <Search />
                                    </IconButton>
                                )}
                            </SearchContainer>

                            {/* User actions (desktop/tablet) */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexShrink: 0,
                                gap: { xs: 0, md: 1 }
                            }}>
                                {isAuthenticated ? (
                                    <>
                                        <ActionButton
                                            color="inherit"
                                            component={RouterLink}
                                            to="/profile"
                                            sx={{
                                                borderBottom: location.pathname.startsWith('/profile') ? '2px solid #4285F4' : '2px solid transparent',
                                                borderRadius: 0,
                                            }}
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
                                            sx={{ display: { xs: 'flex', md: 'none' } }}
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
                                            sx={{ borderBottom: location.pathname === '/login' ? '2px solid #4285F4' : '2px solid transparent', borderRadius: 0 }}
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
                                                },
                                                borderBottom: location.pathname === '/register' ? '2px solid #4285F4' : '2px solid transparent',
                                                borderRadius: 0,
                                            }}
                                        >
                                            Kayıt Ol
                                        </ActionButton>
                                        <IconButton
                                            edge="end"
                                            onClick={handleProfileMenuOpen}
                                            color="inherit"
                                            aria-label="Kullanıcı menüsü"
                                            sx={{ display: { xs: 'flex', md: 'none' } }}
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {renderProfileMenu}
            {renderMobileMenu}
        </Box>
    );
};

export default Navbar;
