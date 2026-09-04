import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, LogIn, Home } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', padding: '3rem', textAlign: 'center' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: 'var(--gradient-brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          color: '#ffffff',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <Lock size={40} />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, lineHeight: '1', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>401</h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>Authentication Required</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Please sign into your SGIT AUTONOMOUS account to access this page.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn-secondary">
            <Home size={18} /> <span>Home Page</span>
          </Link>
          <Link to="/login" className="btn-primary">
            <LogIn size={18} /> <span>Log In Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
