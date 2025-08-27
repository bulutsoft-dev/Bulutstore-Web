import axios from './axiosConfig';

export const getAllDownloadHistories = () => axios.get('/api/download-histories');
export const getDownloadHistoryById = (id) => axios.get(`/api/download-histories/${id}`);
export const createDownloadHistory = (data) => axios.post('/api/download-histories', data);
export const updateDownloadHistory = (id, data) => axios.put(`/api/download-histories/${id}`, data);
export const deleteDownloadHistory = (id) => axios.delete(`/api/download-histories/${id}`);

