export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.message || data.error || 'Request failed';
    const err = new Error(message);
    err.response = data;
    throw err;
  }
  return data;
}

export const api = {
  auth: {
    register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  },
  containers: {
    getAll: () => request('/containers'),
    getById: (id) => request(`/containers/${id}`),
    create: (data) => request('/containers', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/containers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  },
  rentals: {
    create: (data) => request('/rentals', { method: 'POST', body: JSON.stringify(data) }),
    getMyRentals: () => request('/rentals/my'),
    returnContainer: (id, data) => request(`/rentals/${id}/return`, { method: 'POST', body: JSON.stringify(data) }),
  },
  wallet: {
    getBalance: () => request('/wallet'),
    addFunds: (amount) => request('/wallet/add', { method: 'POST', body: JSON.stringify({ amount }) }),
  },
  stats: {
    getCO2Stats: () => request('/stats/co2'),
    getVendorStats: () => request('/stats/vendor'),
  }
};
