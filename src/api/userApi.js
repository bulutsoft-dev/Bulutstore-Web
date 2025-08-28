import axiosInstance from './axiosConfig';

export const getUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axiosInstance.post('/users', user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axiosInstance.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};

export const registerUser = async (user) => {
  const response = await axiosInstance.post('/auth/register', user);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const applyForDeveloper = async (applicationText) => {
  const response = await axiosInstance.post('/users/apply-developer', { applicationText });
  return response.data;
};

export const approveDeveloper = async (userId) => {
  const response = await axiosInstance.post(`/users/approve-developer/${userId}`);
  return response.data;
};

export const rejectDeveloper = async (userId) => {
  const response = await axiosInstance.post(`/users/reject-developer/${userId}`);
  return response.data;
};

export const getDeveloperApplications = async () => {
  const response = await axiosInstance.get('/users/developer-applications');
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};

export const getOwnDeveloperApplication = async () => {
  const response = await axiosInstance.get('/users/developer-application/me');
  return response.data;
};
