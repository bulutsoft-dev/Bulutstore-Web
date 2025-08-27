import axios from './axiosConfig';

export const getAllTags = () => axios.get('/tags');
export const getTagById = (id) => axios.get(`/tags/${id}`);
export const createTag = (data) => axios.post('/tags', data);
export const updateTag = (id, data) => axios.put(`/tags/${id}`, data);
export const deleteTag = (id) => axios.delete(`/tags/${id}`);
