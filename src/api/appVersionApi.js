import axios from './axiosConfig';

export const getAllAppVersions = () => axios.get('/api/app-versions');
export const getAppVersionById = (id) => axios.get(`/api/app-versions/${id}`);
export const createAppVersion = (data) => axios.post('/api/app-versions', data);
export const updateAppVersion = (id, data) => axios.put(`/api/app-versions/${id}`, data);
export const deleteAppVersion = (id) => axios.delete(`/api/app-versions/${id}`);

