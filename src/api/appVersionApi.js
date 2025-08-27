import axios from './axiosConfig';

export const getAllAppVersions = () => axios.get('/app-versions');
export const getAppVersionById = (id) => axios.get(`/app-versions/${id}`);
export const createAppVersion = (data) => axios.post('/app-versions', data);
export const updateAppVersion = (id, data) => axios.put(`/app-versions/${id}`, data);
export const deleteAppVersion = (id) => axios.delete(`/app-versions/${id}`);
