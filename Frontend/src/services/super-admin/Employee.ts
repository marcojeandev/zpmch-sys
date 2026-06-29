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

export const employeeApi = {
  getAll: () =>
    api.get('/super-admin/employees'),

  getById: (id: number) =>
    api.get(`/super-admin/employees/${id}`),

  create: (data: any) =>
    api.post('/super-admin/employees', data),

  update: (id: number, data: any) =>
    api.put(`/super-admin/employees/${id}`, data),

  delete: (id: number) =>
    api.delete(`/super-admin/employees/${id}`),

  approve: (id: number) =>
    api.put(`/super-admin/employees/${id}/approve`),

  disapprove: (id: number) =>
    api.put(`/super-admin/employees/${id}/disapprove`),

  getByStatus: (status: string) =>
    api.get(`/super-admin/employees/status/${status}`),

  getSummary: () =>
    api.get('/super-admin/employees/summary'),
};


export default api;

