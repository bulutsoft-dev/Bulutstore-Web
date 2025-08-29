import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Container,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Menu as MenuIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import useApps from '../../hooks/useApps';
import SearchBar from './navbar/SearchBar';
import ProfileMenu from './navbar/ProfileMenu';
import MobileMenu from './navbar/MobileMenu';
import NavLinks from './navbar/NavLinks';
import UserActions from './navbar/UserActions';

// Stil bileşenleri
const Navbar = () => {
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const searchInputRef = useRef(null);
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated, logout } = useAuthContext();
    const { apps } = useApps();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
                        px: 0,
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
                                    color: '#4285F4',
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
                            <NavLinks user={user} />
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
                            <SearchBar
                                isSearchOpen={isSearchOpen}
                                isMobile={isMobile}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                showResults={showResults}
                                setShowResults={setShowResults}
                                filteredApps={filteredApps}
                                handleResultClick={handleResultClick}
                                handleSearchOpen={handleSearchOpen}
                                handleSearchClose={handleSearchClose}
                                searchInputRef={searchInputRef}
                                searchContainerRef={searchContainerRef}
                            />
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexShrink: 0,
                                gap: { xs: 0, md: 1 }
                            }}>
                                <UserActions
                                    isAuthenticated={isAuthenticated}
                                    location={location}
                                    handleLogout={handleLogout}
                                    handleProfileMenuOpen={handleProfileMenuOpen}
                                />
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <ProfileMenu
                anchorEl={profileAnchorEl}
                open={isProfileMenuOpen}
                onClose={handleProfileMenuClose}
                onLogout={handleLogout}
            />
            <MobileMenu
                anchorEl={mobileMenuAnchorEl}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
                onLogout={handleLogout}
                isAuthenticated={isAuthenticated}
                user={user}
            />
        </Box>
    );
};

export default Navbar;
