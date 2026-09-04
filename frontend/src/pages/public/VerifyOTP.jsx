import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { verifyOTP } = useAuth();
  
  const initialEmail = location.state?.email || 'student@gmail.com';
  const initialOTP = location.state?.otpCode || '';
  const [email] = useState(initialEmail);
  const [otpCode, setOtpCode] = useState(initialOTP);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await verifyOTP(email, otpCode);
    setLoading(false);
    if (res && res.success) {
      addToast('Account Verified Successfully!', 'success');
      navigate('/dashboard');
    } else {
      addToast(res?.error || 'Verification failed', 'error');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: '#fff' }}>
          <ShieldCheck size={28} />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>Verify Email OTP</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '2rem' }}>
          Enter the 6-digit security code sent to <strong>{email}</strong>
        </p>

        {initialOTP && (
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--accent-gold)' }}>
            Dev Hint OTP Code: <strong>{initialOTP}</strong>
          </div>
        )}

        <form onSubmit={handleVerify}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <input
              type="text"
              required
              maxLength={6}
              className="form-input"
              style={{ textAlign: 'center', fontSize: '1.8rem', letterSpacing: '0.35em', fontWeight: 800 }}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="123456"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <span>{loading ? 'Verifying OTP...' : 'Complete Verification'}</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
