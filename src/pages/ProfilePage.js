import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { becomeDeveloper, updateUser, getUserById } from '../api/userApi';
import {
    Box,
    Container,
    Grid,
    Paper,
    CircularProgress,
    Fade,
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
                const latestUser = await getUserById(user._id || user.id);
                setUser(latestUser);
                setProfileData({
                    name: latestUser.name || '',
                    bio: latestUser.bio || '',
                    skills: latestUser.skills || []
                });
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

    const handleSaveProfile = async () => {
        setProfileUpdateSuccess(false);
        setProfileUpdateError(null);
        try {
            const updatedUser = await updateUser(user._id || user.id, {
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
            const latestUser = await getUserById(user._id || user.id);
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
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* Sol Taraf - Profil Bilgileri */}
                <Grid item xs={12} md={4}>
                    <ProfileSidebar user={user} />
                </Grid>

                {/* Sağ Taraf - İçerik */}
                <Grid item xs={12} md={8}>
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
                    {/* Geliştirici başvuru formu */}
                    {!user.isDeveloper && (
                        <DeveloperApplicationForm
                            form={form}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            applying={applying}
                            error={error}
                            success={success}
                            show={!user.isDeveloper}
                        />
                    )}
                    {/* Geliştirici istatistikleri (sadece geliştiriciler için) */}
                    {user.isDeveloper && (
                        <DeveloperStats />
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfilePage;
