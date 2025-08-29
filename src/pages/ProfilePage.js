import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { updateUser, getCurrentUser, applyForDeveloper } from '../api/userApi';
import {
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import ProfileSidebar from '../components/users/ProfileSidebar';
import ProfileEditForm from '../components/users/ProfileEditForm';
import DeveloperApplicationForm from '../components/users/DeveloperApplicationForm';
import AppBreadcrumbs from '../components/common/Breadcrumbs';

const ProfilePage = () => {
    const { user, setUser, loading } = useAuthContext();
    const navigate = useNavigate();
    const [applying, setApplying] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ description: '' });
    const [profileData, setProfileData] = useState({
        username: user?.username || '',
        displayName: user?.displayName || '',
        website: user?.website || ''
    });
    const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
    const [profileUpdateError, setProfileUpdateError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [fetching, setFetching] = useState(true);

    React.useEffect(() => {
        const fetchUser = async () => {
            setFetching(true);
            try {
                const latestUser = await getCurrentUser();
                setUser(latestUser);
                setProfileData({
                    username: latestUser.username || '',
                    displayName: latestUser.displayName || '',
                    website: latestUser.website || ''
                });
            } catch (err) {
                setProfileUpdateError('Kullanıcı bilgileri alınamadı. Lütfen tekrar deneyin.');
            } finally {
                setFetching(false);
            }
        };
        fetchUser();
        // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        if (!user && !loading) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    if (fetching || !user) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleDeveloperApplicationSubmit = async (e) => {
        e.preventDefault();
        setApplying(true);
        setError(null);
        setSuccess(false);
        try {
            await applyForDeveloper({ description: form.description });
            setSuccess(true);
        } catch (err) {
            setError('Başvuru gönderilemedi. Lütfen tekrar deneyin.');
        } finally {
            setApplying(false);
        }
    };

    const handleSaveProfile = async () => {
        setProfileUpdateSuccess(false);
        setProfileUpdateError(null);
        if (!user || !(user._id || user.id)) return;
        try {
            const userId = user._id || user.id;
            const updatedUser = await updateUser(userId, {
                username: profileData.username,
                displayName: profileData.displayName,
                website: profileData.website
            });
            setUser(updatedUser);
            setProfileData({
                username: updatedUser.username || '',
                displayName: updatedUser.displayName || '',
                website: updatedUser.website || ''
            });
            setProfileUpdateSuccess(true);
            // Refetch latest user data
            const latestUser = await getCurrentUser();
            setUser(latestUser);
            setProfileData({
                username: latestUser.username || '',
                displayName: latestUser.displayName || '',
                website: latestUser.website || ''
            });
        } catch (err) {
            setProfileUpdateError(err.message || 'Profil güncellenemedi. Lütfen tekrar deneyin.');
        }
    };

    console.log('ProfilePage user:', user); // DEBUG: Log user object

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 1, sm: 3 }, py: { xs: 2, sm: 4 }, width: '100%' }}>
            <AppBreadcrumbs extraLabels={[null, 'Profil']} user={user} />
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
                    gap: { xs: 2, md: 4 }
                }}
            >
                <Box>
                    <ProfileSidebar user={user} />
                </Box>
                <Box>
                    <ProfileEditForm
                        user={user}
                        profileData={profileData}
                        editMode={editMode}
                        profileUpdateError={profileUpdateError}
                        profileUpdateSuccess={profileUpdateSuccess}
                        setEditMode={setEditMode}
                        setProfileData={setProfileData}
                        handleProfileChange={handleProfileChange}
                        handleSaveProfile={handleSaveProfile}
                    />
                    {!user.isDeveloper && (
                        user.developer_application_status || user.developer_application_date ? (
                            <Alert severity="info" sx={{ mb: 2 }}>
                                Başvuru zaten yaptınız.
                            </Alert>
                        ) : (
                            <DeveloperApplicationForm
                                form={form}
                                handleChange={handleChange}
                                handleSubmit={handleDeveloperApplicationSubmit}
                                applying={applying}
                                error={error}
                                success={success}
                                show={true}
                            />
                        )
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
