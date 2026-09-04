import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { KeyRound } from 'lucide-react';

const ForgotPassword = () => {
  const [step, setStep] = useState('email'); // email, reset
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { forgotPassword, resetPassword } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await forgotPassword(email);
    setLoading(false);
    if (res && res.success) {
      setStep('reset');
      if (res.otpCode) setDevOtp(res.otpCode);
      addToast(res.message || 'Password reset OTP sent to email', 'info');
    } else {
      addToast(res?.error || 'Account not found with this email', 'error');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await resetPassword(email, otpCode, newPassword);
    setLoading(false);
    if (res && res.success) {
      addToast('Password reset successful! Please log in.', 'success');
      navigate('/login');
    } else {
      addToast(res?.error || 'Password reset failed', 'error');
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
                placeholder="student@gmail.com"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              <span>{loading ? 'Sending OTP...' : 'Send Password OTP'}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            {devOtp && (
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--accent-gold)' }}>
                Dev Hint OTP Code: <strong>{devOtp}</strong>
              </div>
            )}
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
                placeholder="123456"
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
