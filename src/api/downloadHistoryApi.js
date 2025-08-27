import axios from './axiosConfig';

export const getAllDownloadHistories = () => axios.get('/download-histories');
export const getDownloadHistoryById = (id) => axios.get(`/download-histories/${id}`);
export const createDownloadHistory = (data) => axios.post('/download-histories', data);
export const updateDownloadHistory = (id, data) => axios.put(`/download-histories/${id}`, data);
export const deleteDownloadHistory = (id) => axios.delete(`/download-histories/${id}`);
