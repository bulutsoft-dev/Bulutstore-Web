import axios from './axiosConfig';

export const getAllReviews = () => axios.get('/reviews');
export const getReviewById = (id) => axios.get(`/reviews/${id}`);
export const createReview = (data) => axios.post('/reviews', data);
export const updateReview = (id, data) => axios.put(`/reviews/${id}`, data);
export const deleteReview = (id) => axios.delete(`/reviews/${id}`);
