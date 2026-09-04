import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { UserPlus } from 'lucide-react';

const DEPARTMENT_OPTIONS = [
  { label: 'Computer Science & Engineering (CSE)', code: 'CSE' },
  { label: 'Electronics & Communication Engineering (ECE)', code: 'ECE' },
  { label: 'Artificial Intelligence & Machine Learning (AIML)', code: 'AIML' },
  { label: 'Artificial Intelligence & Data Science (AIDS)', code: 'AIDS' },
  { label: 'Computer Science & Design (CSD)', code: 'CSD' },
  { label: 'Civil Engineering (CIVIL)', code: 'CIVIL' },
  { label: 'Mechanical Engineering (MECH)', code: 'MECH' },
  { label: 'Electrical & Electronics Engineering (EEE)', code: 'EEE' }
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: 'CSE',
    enrollmentNo: '',
    year: '3rd Year',
    semester: '6th Semester'
  });

  const { register, loading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match. Please verify.', 'error');
      return;
    }

    const res = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      department: formData.department,
      enrollmentNo: formData.enrollmentNo,
      year: formData.year,
      semester: formData.semester
    });

    if (res && res.success) {
      addToast('Registration successful! Verification OTP generated.', 'success');
      navigate('/verify-otp', { state: { email: res.email || formData.email, otpCode: res.otpCode } });
    } else {
      addToast(res?.error || 'Registration failed', 'error');
    }
  };

  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '540px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img 
            src="/assets/sgit-logo.jpg" 
            alt="SGIT AUTONOMOUS Logo" 
            style={{ width: '56px', height: '56px', borderRadius: '12px', marginBottom: '1rem', objectFit: 'cover', border: '2px solid var(--accent-primary)' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>SGIT Scholar Registration</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Join SGIT AUTONOMOUS student network</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. SGIT Scholar Name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              required
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="student@sgit.edu"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                required
                className="form-input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                required
                className="form-input"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Engineering Department *</label>
            <select
              className="form-input"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              {DEPARTMENT_OPTIONS.map(dept => (
                <option key={dept.code} value={dept.code}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Enrollment ID</label>
              <input
                type="text"
                className="form-input"
                value={formData.enrollmentNo}
                onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
                placeholder="SGIT-2024-089"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Academic Year</label>
              <select
                className="form-input"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Semester</label>
              <select
                className="form-input"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={`${s}th Semester`}>{s}th Semester</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            <UserPlus size={18} /> <span>{loading ? 'Registering...' : 'Register'}</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Already registered? <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: 700, textDecoration: 'none' }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
