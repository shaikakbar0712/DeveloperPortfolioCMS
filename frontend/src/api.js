import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);
export const getUser = (id) => API.get(`/users/${id}`);
export const uploadResume = (id, formData) => API.post(`/users/${id}/resume`, formData);

export const getProjects = (userId) => API.get(`/projects/user/${userId}`);
export const addProject = (userId, data) => API.post(`/projects/user/${userId}`, data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const getSkills = (userId) => API.get(`/skills/user/${userId}`);
export const addSkill = (userId, data) => API.post(`/skills/user/${userId}`, data);
export const updateSkill = (id, data) => API.put(`/skills/${id}`, data);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

export const getCertifications = (userId) => API.get(`/certifications/user/${userId}`);
export const addCertification = (userId, data) => API.post(`/certifications/user/${userId}`, data);
export const updateCertification = (id, data) => API.put(`/certifications/${id}`, data);
export const deleteCertification = (id) => API.delete(`/certifications/${id}`);

export const getSocialLinks = (userId) => API.get(`/social-links/user/${userId}`);
export const addSocialLink = (userId, data) => API.post(`/social-links/user/${userId}`, data);
export const updateSocialLink = (id, data) => API.put(`/social-links/${id}`, data);
export const deleteSocialLink = (id) => API.delete(`/social-links/${id}`);

export const getPortfolio = (userId) => API.get(`/portfolio/${userId}`);
