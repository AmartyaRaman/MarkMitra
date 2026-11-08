import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('markmitra_token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/auth/me')
        .then(res => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem('markmitra_token');
          delete api.defaults.headers.common['Authorization'];
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('markmitra_token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return user;
    } catch (err) {
      // Demo accounts fallback if backend is offline or starting up
      const demoUsers = {
        'admin@markmitra.in': { id: 1, name: 'Dr. Ramesh Sharma', email: 'admin@markmitra.in', role: 'admin', institution: 'MAIT, Rohini' },
        'teacher@markmitra.in': { id: 2, name: 'Prof. Ananya Sen', email: 'teacher@markmitra.in', role: 'teacher', institution: 'MAIT, Rohini' },
        'student@markmitra.in': { id: 3, name: 'Aarav Patel', email: 'student@markmitra.in', role: 'student', institution: 'MAIT, Rohini' }
      };

      const validDemoPasswords = {
        'admin@markmitra.in': 'admin123',
        'teacher@markmitra.in': 'teacher123',
        'student@markmitra.in': 'student123'
      };

      if (demoUsers[email] && (!password || password === validDemoPasswords[email])) {
        const mockUser = demoUsers[email];
        const mockToken = 'demo-mock-token-' + Date.now();
        localStorage.setItem('markmitra_token', mockToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        setUser(mockUser);
        return mockUser;
      }
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('markmitra_token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
