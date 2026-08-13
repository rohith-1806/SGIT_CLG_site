import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { LogIn, Sparkles, Shield, KeyRound, UserCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('student@college.edu');
  const [password, setPassword] = useState('password123');
  const { login, loading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res && res.success) {
      addToast(`Welcome back, ${res.user.name}!`, 'success');
      if (res.user.role === 'superadmin') navigate('/superadmin');
      else if (res.user.role === 'admin') navigate('/admin');
      else navigate('/student');
    } else {
      addToast('Invalid credentials provided', 'error');
    }
  };

  const fillQuickDemo = (role) => {
    if (role === 'superadmin') {
      setEmail('superadmin@college.edu');
      setPassword('password123');
    } else if (role === 'admin') {
      setEmail('admin@college.edu');
      setPassword('password123');
    } else {
      setEmail('student@college.edu');
      setPassword('password123');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#fff' }}>
            <Sparkles size={24} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Sign In to Ecosystem</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Access your personalized learning portal</p>
        </div>

        {/* Demo Quick Logins */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <button type="button" onClick={() => fillQuickDemo('student')} className="btn-secondary" style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}>
            Student Demo
          </button>
          <button type="button" onClick={() => fillQuickDemo('admin')} className="btn-secondary" style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}>
            Admin Demo
          </button>
          <button type="button" onClick={() => fillQuickDemo('superadmin')} className="btn-secondary" style={{ flex: 1, padding: '0.4rem', fontSize: '0.75rem', justifyContent: 'center' }}>
            SuperAdmin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            <LogIn size={18} /> <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: 700, textDecoration: 'none' }}>Apply Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
