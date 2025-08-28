import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import AppsPage from "../pages/AppsPage";
import AppDetailPage from '../pages/AppDetailPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import AdminPanelPage from '../pages/AdminPanelPage';
import AppSubmitPage from '../pages/AppSubmitPage';
import MyAppsPage from '../pages/MyAppsPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/apps" element={<AppsPage />} />
    <Route path="/apps/:id" element={<AppDetailPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/admin" element={<AdminPanelPage />} />
    <Route path="/apps/submit" element={<AppSubmitPage />} />
    <Route path="/my-apps" element={<MyAppsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
