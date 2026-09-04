import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Forbidden from '../pages/errors/Forbidden';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid var(--border-color)',
            borderTopColor: 'var(--accent-primary)',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 1rem auto'
          }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Authenticating SGIT Session...</p>
        </div>
      </div>
    );
  }

  if (!user || !token) {
    // Determine login redirect based on path attempted
    if (location.pathname.startsWith('/sadmin')) {
      return <Navigate to="/sadmin" replace />;
    }
    if (location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Forbidden />;
  }

  return children;
};

export default ProtectedRoute;
