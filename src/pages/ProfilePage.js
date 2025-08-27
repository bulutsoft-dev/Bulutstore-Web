import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { becomeDeveloper, updateUser, getCurrentUser, applyForDeveloper } from '../api/userApi';
import {
    Box,
    Container,
    CircularProgress,
    Alert
} from '@mui/material';
import ProfileSidebar from '../components/users/ProfileSidebar';
import ProfileEditForm from '../components/users/ProfileEditForm';
import DeveloperApplicationForm from '../components/users/DeveloperApplicationForm';
import DeveloperStats from '../components/users/DeveloperStats';

const ProfilePage = () => {
    const { user, setUser, loading } = useAuthContext();
    const [applying, setApplying] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ description: '' });
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
        skills: user?.skills || []
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
                    name: latestUser.name || latestUser.displayName || '',
                    bio: latestUser.bio || '',
                    skills: latestUser.skills || []
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApplying(true);
        setError(null);
        try {
            const updatedUser = await becomeDeveloper(form);
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setSuccess(true);
            setForm({ description: '' });
        } catch (err) {
            setError(err.message || 'Başvuru başarısız. Lütfen daha sonra tekrar deneyin.');
        } finally {
            setApplying(false);
        }
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
                name: profileData.name,
                bio: profileData.bio,
                skills: profileData.skills
            });
            setUser(updatedUser);
            setProfileData({
                name: updatedUser.name || '',
                bio: updatedUser.bio || '',
                skills: updatedUser.skills || []
            });
            setProfileUpdateSuccess(true);
            // Refetch latest user data
            const latestUser = await getCurrentUser();
            setUser(latestUser);
            setProfileData({
                name: latestUser.name || '',
                bio: latestUser.bio || '',
                skills: latestUser.skills || []
            });
        } catch (err) {
            setProfileUpdateError(err.message || 'Profil güncellenemedi. Lütfen tekrar deneyin.');
        }
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
                    gap: 4
                }}
            >
                {/* Sol Taraf - Profil Bilgileri */}
                <Box>
                    <ProfileSidebar user={user} />
                </Box>

                {/* Sağ Taraf - İçerik */}
                <Box>
                    {/* Profil Düzenleme */}
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
                    {/* Geliştirici başvuru formu veya başvuru durumu mesajı */}
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
                    {/* Geliştirici istatistikleri (sadece geliştiriciler için) */}
                    {user.isDeveloper && (
                        <DeveloperStats />
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default ProfilePage;
