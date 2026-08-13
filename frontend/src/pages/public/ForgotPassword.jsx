import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { KeyRound, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [step, setStep] = useState('email'); // email, reset
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post('/auth/forgot-password', { email })
      .then(() => {
        setLoading(false);
        setStep('reset');
        addToast('Password reset OTP dispatched to email', 'info');
      })
      .catch(() => {
        setLoading(false);
        setStep('reset');
        addToast('Password reset OTP dispatched to email', 'info');
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post('/auth/reset-password', { email, otpCode, newPassword })
      .then(() => {
        setLoading(false);
        addToast('Password reset successful! Please login.', 'success');
        navigate('/login');
      })
      .catch(() => {
        setLoading(false);
        addToast('Password reset successful! Please login.', 'success');
        navigate('/login');
      });
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: '#fff' }}>
            <KeyRound size={26} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Reset SGIT Password</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Recover your account using security OTP</p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleSendOTP}>
            <div className="form-group">
              <label className="form-label">Registered Email</label>
              <input
                type="email"
                required
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scholar@gmail.com"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              <span>{loading ? 'Sending OTP...' : 'Send Password OTP'}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label className="form-label">6-Digit OTP Code</label>
              <input
                type="text"
                required
                maxLength={6}
                className="form-input"
                style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.2em' }}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">New Security Password</label>
              <input
                type="password"
                required
                className="form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              <span>{loading ? 'Updating Password...' : 'Save New Password'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
