import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  User, Save, Mail, Phone, Github, Linkedin, Globe, Shield, 
  Heart, Trophy, Sparkles, Award, Code, CheckCircle2, RefreshCw 
} from 'lucide-react';

const StudentProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const { addToast } = useToast();

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    enrollmentId: user?.enrollmentId || user?.enrollmentNo || 'SGIT-2024-DEMO',
    department: user?.department || 'CSE',
    year: user?.year || '3rd Year',
    semester: user?.semester || '6th Semester',
    phone: user?.phone || '+91 98765 43210',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: user?.bio || 'Enthusiastic Learner & Aspiring Software Engineer @ SGIT AUTONOMOUS',
    careerGoal: user?.careerGoal || 'Software Developer & Defense Tech Specialist',
    skills: user?.skills ? user.skills.join(', ') : 'JavaScript, React, Python, SQL, Git',
    certifications: user?.certifications ? user.certifications.join(', ') : 'Full-Stack Web Engineering, Python Fundamentals',
    achievements: user?.achievements ? user.achievements.join(', ') : 'Selected for State Parade (LRDC Camp)',
    nccStatus: user?.nccStatus || 'CQMS (State Parade Selected)',
    nssStatus: user?.nssStatus || 'Active Volunteer',
    github: user?.socialLinks?.github || 'https://github.com/sgit-student',
    linkedin: user?.socialLinks?.linkedin || 'https://linkedin.com/in/sgit-student',
    portfolio: user?.socialLinks?.portfolio || 'https://student.sgit.edu'
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        enrollmentId: user.enrollmentId || user.enrollmentNo || prev.enrollmentId,
        department: user.department || prev.department,
        year: user.year || prev.year,
        semester: user.semester || prev.semester,
        phone: user.phone || prev.phone,
        avatar: user.avatar || prev.avatar,
        bio: user.bio || prev.bio,
        careerGoal: user.careerGoal || prev.careerGoal,
        skills: Array.isArray(user.skills) ? user.skills.join(', ') : prev.skills,
        certifications: Array.isArray(user.certifications) ? user.certifications.join(', ') : prev.certifications,
        achievements: Array.isArray(user.achievements) ? user.achievements.join(', ') : prev.achievements,
        nccStatus: user.nccStatus || prev.nccStatus,
        nssStatus: user.nssStatus || prev.nssStatus,
        github: user.socialLinks?.github || prev.github,
        linkedin: user.socialLinks?.linkedin || prev.linkedin,
        portfolio: user.socialLinks?.portfolio || prev.portfolio
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const token = localStorage.getItem('token');

      const payload = {
        name: formData.name,
        phone: formData.phone,
        avatar: formData.avatar,
        bio: formData.bio,
        department: formData.department,
        year: formData.year,
        semester: formData.semester,
        enrollmentId: formData.enrollmentId,
        enrollmentNo: formData.enrollmentId,
        careerGoal: formData.careerGoal,
        nccStatus: formData.nccStatus,
        nssStatus: formData.nssStatus,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        certifications: formData.certifications.split(',').map(s => s.trim()).filter(Boolean),
        achievements: formData.achievements.split(',').map(s => s.trim()).filter(Boolean),
        socialLinks: {
          github: formData.github,
          linkedin: formData.linkedin,
          portfolio: formData.portfolio
        }
      };

      const res = await fetch('/api/student/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        if (updateUserProfile) updateUserProfile(data.data);
        addToast('Student profile updated successfully in database!', 'success');
      } else {
        addToast(data.error || 'Failed to update profile', 'error');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      addToast('Network error while saving profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page Title */}
      <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
          My Student Profile
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Manage your personal details, academic credentials, skills, social links, and institutional achievements.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Column: Avatar & Quick Card */}
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={formData.avatar}
            alt={formData.name}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid var(--accent-primary)',
              boxShadow: 'var(--shadow-glow)',
              marginBottom: '1rem'
            }}
            onError={(e) => { e.target.src = '/assets/sgit-logo.jpg'; }}
          />

          <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
            {formData.name}
          </h3>

          <div className="badge badge-red" style={{ margin: '0.5rem 0 1rem 0' }}>
            {user?.role === 'student' ? 'SGIT SCHOLAR' : user?.role}
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
            {formData.department} • {formData.year}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Enrollment: {formData.enrollmentId}
          </div>

          <div style={{
            width: '100%',
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            textAlign: 'left',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <Mail size={16} style={{ color: 'var(--accent-primary)' }} />
              <span>{formData.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <Phone size={16} style={{ color: 'var(--accent-emerald)' }} />
              <span>{formData.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <Shield size={16} style={{ color: 'var(--accent-gold)' }} />
              <span>NCC: {formData.nccStatus}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <Heart size={16} style={{ color: 'var(--accent-emerald)' }} />
              <span>NSS: {formData.nssStatus}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Full Profile Edit Form */}
        <form onSubmit={handleSave} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} style={{ color: 'var(--accent-primary)' }} />
            Personal & Academic Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address (Read Only)</label>
              <input type="email" disabled className="form-input" value={formData.email} style={{ opacity: 0.7 }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Enrollment ID</label>
              <input type="text" name="enrollmentId" className="form-input" value={formData.enrollmentId} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <select name="department" className="form-input" value={formData.department} onChange={handleChange}>
                <option value="CSE">Computer Science & Engineering (CSE)</option>
                <option value="AI & ML">AI & Machine Learning (AI & ML)</option>
                <option value="CSD">Computer Science & Design (CSD)</option>
                <option value="ECE">Electronics & Communication (ECE)</option>
                <option value="EEE">Electrical & Electronics (EEE)</option>
                <option value="Civil">Civil Engineering</option>
                <option value="Mechanical">Mechanical Engineering</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Year</label>
              <select name="year" className="form-input" value={formData.year} onChange={handleChange}>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Semester</label>
              <select name="semester" className="form-input" value={formData.semester} onChange={handleChange}>
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="4th Semester">4th Semester</option>
                <option value="5th Semester">5th Semester</option>
                <option value="6th Semester">6th Semester</option>
                <option value="7th Semester">7th Semester</option>
                <option value="8th Semester">8th Semester</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="text" name="phone" className="form-input" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Profile Photo URL</label>
              <input type="text" name="avatar" className="form-input" value={formData.avatar} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Career Goal</label>
            <input type="text" name="careerGoal" className="form-input" value={formData.careerGoal} onChange={handleChange} placeholder="e.g. Full-Stack Developer & AI Specialist" />
          </div>

          <div className="form-group">
            <label className="form-label">Bio Summary</label>
            <textarea name="bio" rows={2} className="form-input" value={formData.bio} onChange={handleChange} />
          </div>

          {/* Institutional Activities & Skills */}
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
            Institutional Status & Skills
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">NCC Status</label>
              <input type="text" name="nccStatus" className="form-input" value={formData.nccStatus} onChange={handleChange} placeholder="e.g. CQMS Cadet" />
            </div>

            <div className="form-group">
              <label className="form-label">NSS Status</label>
              <input type="text" name="nssStatus" className="form-input" value={formData.nssStatus} onChange={handleChange} placeholder="e.g. Volunteer" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Technical Skills (Comma Separated)</label>
            <input type="text" name="skills" className="form-input" value={formData.skills} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Achievements (Comma Separated)</label>
            <input type="text" name="achievements" className="form-input" value={formData.achievements} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Certifications (Comma Separated)</label>
            <input type="text" name="certifications" className="form-input" value={formData.certifications} onChange={handleChange} />
          </div>

          {/* Social Links */}
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
            Social & Portfolio Links
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">GitHub URL</label>
              <input type="text" name="github" className="form-input" value={formData.github} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">LinkedIn URL</label>
              <input type="text" name="linkedin" className="form-input" value={formData.linkedin} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Portfolio URL</label>
              <input type="text" name="portfolio" className="form-input" value={formData.portfolio} onChange={handleChange} />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.75rem 1.5rem' }}
          >
            <Save size={18} />
            <span>{saving ? 'Saving Changes...' : 'Save Changes'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
