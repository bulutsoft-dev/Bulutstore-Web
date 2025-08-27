import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import AppsPage from "../pages/AppsPage";
import AppDetailPage from '../pages/AppDetailPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/apps" element={<AppsPage />} />
    <Route path="/apps/:id" element={<AppDetailPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
