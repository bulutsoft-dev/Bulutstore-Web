import axios from './axiosConfig';

export const getAllApps = () => axios.get('/apps/approved');
export const getAppById = (id) => axios.get(`/apps/${id}`);
export const createApp = (data) => axios.post('/apps', data);
export const updateApp = (id, data) => axios.put(`/apps/${id}`, data);
export const deleteApp = (id) => axios.delete(`/apps/${id}`);
export const searchAppsByName = (name) => axios.get(`/apps/search?name=${encodeURIComponent(name)}`);
export const getAppsByDeveloper = (developerId) => axios.get(`/apps/developer/${developerId}`);
export const getAppsByCategory = (categoryId) => axios.get(`/apps/category/${categoryId}`);
