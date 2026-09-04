import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { LogIn, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('student@sgit.edu');
  const [password, setPassword] = useState('SgitStudent@1997');
  const { login, loading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res && res.success) {
      addToast('Welcome back to SGIT, SGITian!', 'success');
      if (res.user.role === 'superadmin') navigate('/sadmin/dashboard');
      else if (res.user.role === 'admin') navigate('/admin/dashboard');
      else navigate('/dashboard');
    } else {
      addToast(res?.error || 'Invalid credentials provided', 'error');
    }
  };

  const fillQuickDemo = (role) => {
    if (role === 'superadmin') {
      setEmail('sadminedu.com');
      setPassword('sgit1997');
    } else if (role === 'admin') {
      setEmail('admin@edu.com');
      setPassword('1997');
    } else {
      setEmail('student@sgit.edu');
      setPassword('SgitStudent@1997');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src="/assets/sgit-logo.jpg" 
            alt="SGIT AUTONOMOUS Logo" 
            style={{ width: '56px', height: '56px', borderRadius: '12px', marginBottom: '1rem', objectFit: 'cover', border: '2px solid var(--accent-primary)' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>SGIT Student Portal</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Access your personalized engineering portal</p>
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
            Super Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email / User ID</label>
            <input
              type="text"
              required
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@gmail.com"
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
              placeholder="••••••••"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.8rem' }}>
            <Link to="/forgot-password" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>Forgot Password?</Link>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
            <LogIn size={18} /> <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: 700, textDecoration: 'none' }}>Register Student Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
