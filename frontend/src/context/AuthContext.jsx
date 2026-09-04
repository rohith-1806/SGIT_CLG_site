import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('sgit_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('sgit_token') || null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Sync token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('sgit_token', token);
    } else {
      localStorage.removeItem('sgit_token');
    }
  }, [token]);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('sgit_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sgit_user');
    }
  }, [user]);

  // Session verification on mount / refresh
  useEffect(() => {
    const checkAuthSession = async () => {
      const storedToken = localStorage.getItem('sgit_token');
      if (storedToken) {
        try {
          const res = await API.get('/auth/me');
          if (res.data.success && res.data.user) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.warn('[AuthContext] Session validation warning, using persisted local user session.');
        }
      }
      setAuthLoading(false);
    };

    checkAuthSession();
  }, []);

  const handleAuthSuccess = (resData) => {
    setToken(resData.token);
    setUser(resData.user);
    localStorage.setItem('sgit_token', resData.token);
    localStorage.setItem('sgit_user', JSON.stringify(resData.user));
    return { success: true, user: resData.user };
  };

  // Student / General Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      setLoading(false);
      if (res.data.success) {
        return handleAuthSuccess(res.data);
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.error || 'Invalid credentials or server unavailable';
      return { success: false, error: errorMsg };
    }
  };

  // Dedicated Admin Login
  const adminLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/admin-login', { email, password });
      setLoading(false);
      if (res.data.success) {
        return handleAuthSuccess(res.data);
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.error || 'Invalid Admin credentials';
      return { success: false, error: errorMsg };
    }
  };

  // Dedicated Super Admin Login
  const superAdminLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/super-admin-login', { email, password });
      setLoading(false);
      if (res.data.success) {
        return handleAuthSuccess(res.data);
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.error || 'Invalid Super Admin credentials';
      return { success: false, error: errorMsg };
    }
  };

  // Student Registration
  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/register', userData);
      setLoading(false);
      if (res.data.success) {
        return { success: true, requiresOTP: true, email: userData.email, otpCode: res.data.otpCode };
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.error || 'Registration failed';
      return { success: false, error: errorMsg };
    }
  };

  // Verify OTP
  const verifyOTP = async (email, otpCode) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/verify-otp', { email, otpCode });
      setLoading(false);
      if (res.data.success) {
        return handleAuthSuccess(res.data);
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.error || 'OTP Verification failed';
      return { success: false, error: errorMsg };
    }
  };

  // Forgot Password Request
  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/forgot-password', { email });
      setLoading(false);
      if (res.data.success) {
        return { success: true, message: res.data.message, otpCode: res.data.otpCode };
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.error || 'Password reset request failed';
      return { success: false, error: errorMsg };
    }
  };

  // Reset Password
  const resetPassword = async (email, otpCode, newPassword) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/reset-password', { email, otpCode, newPassword });
      setLoading(false);
      if (res.data.success) {
        return { success: true, message: res.data.message };
      }
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.error || 'Password reset failed';
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sgit_token');
    localStorage.removeItem('sgit_user');
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider value={{
      user, token, loading, authLoading,
      login, adminLogin, superAdminLogin,
      register, verifyOTP, forgotPassword, resetPassword,
      logout, updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
