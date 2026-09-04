import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, LogIn } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@edu.com');
  const [password, setPassword] = useState('1997');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await adminLogin(email, password);
    setLoading(false);
    if (res && res.success) {
      addToast('Admin Authentication Successful', 'success');
      navigate('/admin/dashboard');
    } else {
      addToast(res.error || 'Invalid Admin Credentials', 'error');
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
              placeholder="admin@edu.com"
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

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            <LogIn size={18} /> <span>{loading ? 'Verifying Admin...' : 'Authenticate Admin'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
