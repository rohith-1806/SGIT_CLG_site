import React from 'react';
import { Link } from 'react-router-dom';
import { ServerCrash, RefreshCw, Home } from 'lucide-react';

const ServerError = () => {
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
          <ServerCrash size={40} />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, lineHeight: '1', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>500</h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>Internal Server Error</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          An unexpected server error occurred. Our engineering team has logged the event.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={() => window.location.reload()} className="btn-secondary">
            <RefreshCw size={18} /> <span>Reload Page</span>
          </button>
          <Link to="/" className="btn-primary">
            <Home size={18} /> <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
