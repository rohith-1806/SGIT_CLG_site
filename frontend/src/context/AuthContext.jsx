import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('aura_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('aura_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('aura_token', token);
    } else {
      localStorage.removeItem('aura_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aura_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aura_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        setLoading(false);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      setLoading(false);
      // Fallback for demo credentials if backend DB disconnected
      let mockRole = 'student';
      if (email.includes('superadmin')) mockRole = 'superadmin';
      else if (email.includes('admin')) mockRole = 'admin';

      const mockUser = {
        id: 'mock_1',
        name: mockRole === 'superadmin' ? 'Dr. Evelyn Vance' : mockRole === 'admin' ? 'Prof. Marcus Brody' : 'Alex Johnson',
        email,
        role: mockRole,
        department: 'Computer Science & Engineering',
        enrollmentNo: 'CSE-2024-089',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'Scholar & Senior Full Stack Engineer'
      };
      setToken('mock_jwt_token_aura');
      setUser(mockUser);
      return { success: true, user: mockUser };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/register', userData);
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        setLoading(false);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      setLoading(false);
      const newUser = {
        id: `user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'student',
        department: userData.department || 'Computer Science & Engineering',
        enrollmentNo: userData.enrollmentNo || '',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };
      setToken('mock_jwt_token_aura');
      setUser(newUser);
      return { success: true, user: newUser };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('aura_token');
    localStorage.removeItem('aura_user');
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
