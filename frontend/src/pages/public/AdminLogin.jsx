import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, LogIn, KeyRound } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('@Branchhod123');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/admin-login', { email, password });
      setLoading(false);
      if (res.data.success) {
        localStorage.setItem('aura_token', res.data.token);
        localStorage.setItem('aura_user', JSON.stringify(res.data.user));
        addToast('Admin Authentication Successful', 'success');
        window.location.href = '/admin';
      }
    } catch (err) {
      setLoading(false);
      // Fallback auth
      const resAuth = await login(email, password);
      if (resAuth && resAuth.success) {
        addToast('Admin Authentication Successful', 'success');
        navigate('/admin');
      } else {
        addToast('Invalid Admin Credentials', 'error');
      }
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#fff' }}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>SGIT Admin Login</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Faculty & Branch Administration Portal</p>
        </div>

        <form onSubmit={handleAdminLogin}>
          <div className="form-group">
            <label className="form-label">Admin Email</label>
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
            <LogIn size={18} /> <span>{loading ? 'Verifying Admin...' : 'Authenticate Admin'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
