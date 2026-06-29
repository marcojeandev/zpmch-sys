import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (email: string, password: string) => api.post('/login', { email, password }),
  register: (data: any) => api.post('/register', data),
  forgotPassword: (email: string) => api.post('/forgot-password', { email }),
  resetPassword: (data: any) => api.post('/reset-password', data),
};

export default api;