import axios from './axiosConfig';

export const getAllTags = () => axios.get('/api/tags');
export const getTagById = (id) => axios.get(`/api/tags/${id}`);
export const createTag = (data) => axios.post('/api/tags', data);
export const updateTag = (id, data) => axios.put(`/api/tags/${id}`, data);
export const deleteTag = (id) => axios.delete(`/api/tags/${id}`);

