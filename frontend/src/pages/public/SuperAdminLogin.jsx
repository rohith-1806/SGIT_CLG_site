import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ShieldAlert, LogIn } from 'lucide-react';

const SuperAdminLogin = () => {
  const [email, setEmail] = useState('sadminedu.com');
  const [password, setPassword] = useState('sgit1997');
  const [loading, setLoading] = useState(false);
  const { superAdminLogin } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSuperAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await superAdminLogin(email, password);
    setLoading(false);
    if (res && res.success) {
      addToast('Super Admin Master Governance Access Granted', 'success');
      navigate('/sadmin/dashboard');
    } else {
      addToast(res.error || 'Invalid Super Admin Credentials', 'error');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', border: '1px solid rgba(227, 30, 36, 0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src="/assets/sgit-logo.jpg" 
            alt="SGIT AUTONOMOUS Logo" 
            style={{ width: '56px', height: '56px', borderRadius: '12px', marginBottom: '1rem', objectFit: 'cover', border: '2px solid var(--accent-primary)' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Super Admin Governance</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Master Campus Portal Access</p>
        </div>

        <form onSubmit={handleSuperAdminLogin}>
          <div className="form-group">
            <label className="form-label">Master Email / Identity</label>
            <input
              type="text"
              required
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sadminedu.com"
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
              placeholder="••••••••"
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
