import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const instance = axios.create({ baseURL: API_BASE, headers: { 'Content-Type': 'application/json' } });

instance.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('ecorent_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const authApi = { register: (payload) => instance.post('/auth/register', payload), login: (payload) => instance.post('/auth/login', payload) };
export const containerApi = { getAll: () => instance.get('/containers'), getById: (id) => instance.get(`/containers/${id}`), create: (data) => instance.post('/containers', data), update: (id,data) => instance.put(`/containers/${id}`, data) };
export const rentalApi = { create: (data) => instance.post('/rentals', data), my: () => instance.get('/rentals/my'), return: (id, data) => instance.post(`/rentals/${id}/return`, data) };
export const walletApi = { balance: () => instance.get('/wallet'), add: (amount) => instance.post('/wallet/add', { amount }), transactions: () => instance.get('/wallet/transactions') };
export const statsApi = { co2: () => instance.get('/stats/co2'), vendor: () => instance.get('/stats/vendor') };

export default instance;
