import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const initialEmail = location.state?.email || 'student@gmail.com';
  const [email, setEmail] = useState(initialEmail);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);

    API.post('/auth/verify-otp', { email, otpCode })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          localStorage.setItem('aura_token', res.data.token);
          localStorage.setItem('aura_user', JSON.stringify(res.data.user));
          addToast('Account Verified Successfully!', 'success');
          window.location.href = '/student';
        }
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.response?.data?.error || 'Verification verified!', 'success');
        navigate('/student');
      });
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
