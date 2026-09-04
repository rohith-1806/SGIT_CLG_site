import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldOff, Home, LogIn } from 'lucide-react';

const Forbidden = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', padding: '3rem', textAlign: 'center', border: '1px solid rgba(227, 30, 36, 0.4)' }}>
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
          <ShieldOff size={40} />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, lineHeight: '1', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>403</h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>Access Forbidden</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          You do not have the required role privileges to access this SGIT AUTONOMOUS module.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/login" className="btn-secondary">
            <LogIn size={18} /> <span>Re-Authenticate</span>
          </Link>
          <Link to="/" className="btn-primary">
            <Home size={18} /> <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
