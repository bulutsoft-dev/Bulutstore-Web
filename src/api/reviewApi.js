import axios from './axiosConfig';

export const getAllReviews = () => axios.get('/api/reviews');
export const getReviewById = (id) => axios.get(`/api/reviews/${id}`);
export const createReview = (data) => axios.post('/api/reviews', data);
export const updateReview = (id, data) => axios.put(`/api/reviews/${id}`, data);
export const deleteReview = (id) => axios.delete(`/api/reviews/${id}`);

