import axios from './axiosConfig';

export const getAllApps = () => axios.get('/api/apps');
export const getAppById = (id) => axios.get(`/api/apps/${id}`);
export const createApp = (data) => axios.post('/api/apps', data);
export const updateApp = (id, data) => axios.put(`/api/apps/${id}`, data);
export const deleteApp = (id) => axios.delete(`/api/apps/${id}`);
export const searchAppsByName = (name) => axios.get(`/api/apps/search?name=${encodeURIComponent(name)}`);
export const getAppsByDeveloper = (developerId) => axios.get(`/api/apps/developer/${developerId}`);
export const getAppsByCategory = (categoryId) => axios.get(`/api/apps/category/${categoryId}`);

