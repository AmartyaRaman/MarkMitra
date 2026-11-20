import { createContext, useContext, useState, useEffect } from 'react';
import api, { TOKEN_KEY, DEMO_USER_KEY, DEMO_TOKEN_PREFIX } from '../lib/api';

const AuthContext = createContext(null);

const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(DEMO_USER_KEY);
  delete api.defaults.headers.common['Authorization'];
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    // Demo sessions can't be validated by the backend; restore them locally.
    if (token.startsWith(DEMO_TOKEN_PREFIX)) {
      try {
        const demoUser = JSON.parse(localStorage.getItem(DEMO_USER_KEY));
        if (demoUser) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setUser(demoUser);
        } else {
          clearSession();
        }
      } catch {
        clearSession();
      }
      setLoading(false);
      return;
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.get('/auth/me')
      .then(res => setUser(res.data.user))
      .catch(clearSession)
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.removeItem(DEMO_USER_KEY);
      localStorage.setItem(TOKEN_KEY, token);
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
        const mockToken = DEMO_TOKEN_PREFIX + Date.now();
        localStorage.setItem(TOKEN_KEY, mockToken);
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockUser));
        api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        setUser(mockUser);
        return mockUser;
      }
      throw err;
    }
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
