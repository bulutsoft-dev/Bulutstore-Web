import React from 'react';
import { Box, ClickAwayListener, IconButton, InputBase, List, ListItem, ListItemButton, ListItemText, styled } from '@mui/material';
import { Search, Close } from '@mui/icons-material';

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

const SearchBar = ({
    isSearchOpen,
    isMobile,
    searchQuery,
    setSearchQuery,
    showResults,
    setShowResults,
    filteredApps,
    handleResultClick,
    handleSearchOpen,
    handleSearchClose,
    searchInputRef,
    searchContainerRef
}) => (
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
                <Box sx={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
                    <StyledInputBase
                        placeholder="Uygulama ara…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchQuery}
                        onChange={e => {
                            setSearchQuery(e.target.value);
                            setShowResults(!!e.target.value);
                        }}
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
                    <Search sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'text.secondary' }} />
                    {showResults && filteredApps.length > 0 && (
                        <SearchResults>
                            <List dense>
                                {filteredApps.map(app => (
                                    <ListItem key={app.id} disablePadding>
                                        <ListItemButton onClick={() => handleResultClick(app.id)} sx={{ py: 0.5 }}>
                                            <ListItemText primary={app.name} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </SearchResults>
                    )}
                    {isMobile && isSearchOpen && (
                        <IconButton onClick={handleSearchClose} sx={{ color: 'text.secondary', ml: 1 }} aria-label="Kapat">
                            <Close />
                        </IconButton>
                    )}
                </Box>
            </ClickAwayListener>
        ) : (
            <IconButton onClick={handleSearchOpen} color="inherit" aria-label="Uygulama ara" sx={{ ml: 1 }}>
                <Search />
            </IconButton>
        )}
    </SearchContainer>
);

export default SearchBar;

