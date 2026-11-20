import axios from 'axios';

export const TOKEN_KEY = 'markmitra_token';
export const DEMO_USER_KEY = 'markmitra_demo_user';
export const DEMO_TOKEN_PREFIX = 'demo-mock-token-';

export const isDemoSession = () =>
  (localStorage.getItem(TOKEN_KEY) || '').startsWith(DEMO_TOKEN_PREFIX);

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Requests whose 401s are handled by the caller (AuthContext), not by a global redirect.
const AUTH_ENDPOINTS = ['/auth/login', '/auth/me'];

api.interceptors.response.use(
  res => res,
  err => {
    const url = err.config?.url || '';
    const isAuthCall = AUTH_ENDPOINTS.some(p => url.includes(p));

    // A demo (offline) session has a fake token the backend will always reject.
    // Let pages fall back to mock data instead of kicking the user out.
    if (err.response?.status === 401 && !isAuthCall && !isDemoSession()) {
      localStorage.removeItem(TOKEN_KEY);
      if (window.location.pathname !== '/login') {
        window.location.replace('/login');
      }
    }
    return Promise.reject(err);
  }
);

export default api;
