import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Save, Upload, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

const StudentProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const { addToast } = useToast();
  const [profileData, setProfileData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    phone: user?.phone || '+1 (555) 234-5678',
    department: user ? user.department : 'Computer Science & Engineering',
    enrollmentNo: user ? user.enrollmentNo : 'CSE-2024-089',
    bio: user?.bio || 'Enthusiastic Learner & Aspiring Software Engineer',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile(profileData);
    addToast('Profile changes saved successfully!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Account & Scholar Profile</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Manage personal details, avatar, and academic credentials</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={profileData.avatar}
            alt={profileData.name}
            style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--accent-primary)', marginBottom: '1rem' }}
          />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{profileData.name}</h2>
          <span className="badge badge-indigo" style={{ margin: '0.5rem 0 1rem 0' }}>{user?.role}</span>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{profileData.department}</p>
        </div>

        <form onSubmit={handleSave} className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email (Read Only)</label>
              <input type="email" disabled className="form-input" value={profileData.email} style={{ opacity: 0.7 }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input type="text" className="form-input" value={profileData.department} onChange={(e) => setProfileData({ ...profileData, department: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Enrollment ID</label>
              <input type="text" className="form-input" value={profileData.enrollmentNo} onChange={(e) => setProfileData({ ...profileData, enrollmentNo: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Bio Summary</label>
            <textarea rows={3} className="form-input" value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            <Save size={18} /> <span>Save Profile Changes</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
