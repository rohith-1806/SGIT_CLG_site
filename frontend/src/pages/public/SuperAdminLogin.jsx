import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ShieldAlert, LogIn, KeyRound } from 'lucide-react';

const SuperAdminLogin = () => {
  const [email, setEmail] = useState('superadmin@gmail.com');
  const [password, setPassword] = useState('@Sgit1997');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSuperAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/super-admin-login', { email, password });
      setLoading(false);
      if (res.data.success) {
        localStorage.setItem('aura_token', res.data.token);
        localStorage.setItem('aura_user', JSON.stringify(res.data.user));
        addToast('Super Admin Authentication Granted', 'success');
        window.location.href = '/superadmin';
      }
    } catch (err) {
      setLoading(false);
      const resAuth = await login(email, password);
      if (resAuth && resAuth.success) {
        addToast('Super Admin Authentication Granted', 'success');
        navigate('/superadmin');
      } else {
        addToast('Invalid Super Admin Credentials', 'error');
      }
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', border: '1px solid rgba(227, 30, 36, 0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#fff', boxShadow: 'var(--shadow-glow)' }}>
            <ShieldAlert size={30} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Super Admin Governance</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Master Campus Portal Access</p>
        </div>

        <form onSubmit={handleSuperAdminLogin}>
          <div className="form-group">
            <label className="form-label">Master Email</label>
            <input
              type="email"
              required
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Master Password</label>
            <input
              type="password"
              required
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            <LogIn size={18} /> <span>{loading ? 'Authenticating Master...' : 'Enter Master Command Center'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
