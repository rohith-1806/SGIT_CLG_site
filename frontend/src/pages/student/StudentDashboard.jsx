import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  FileText, CheckSquare, Mic, Briefcase, Calendar, Code, 
  TrendingUp, Award, ArrowUpRight, Sparkles, BookOpen 
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Welcome Back Scholar</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{user?.name}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user?.department} • ID: {user?.enrollmentNo || 'CSE-2024-089'}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/student/resume" className="btn-primary" style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}>
            <FileText size={18} /> <span>Edit Resume</span>
          </Link>
          <Link to="/student/ats-checker" className="btn-secondary" style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}>
            <CheckSquare size={18} /> <span>ATS Scanner</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <span>ATS Resume Score</span>
            <TrendingUp size={16} style={{ color: 'var(--accent-emerald)' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>92 / 100</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>High match rate for Full Stack Engineer</div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <span>Mock Interview Score</span>
            <Mic size={16} style={{ color: 'var(--accent-secondary)' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>88%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Completed 3 AI Mock Sessions</div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <span>Applied Internships</span>
            <Briefcase size={16} style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>4 Active</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>1 Interview Scheduled @ Stripe</div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <span>Skill Roadmaps</span>
            <Code size={16} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>75% Done</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Full Stack Web Track</div>
        </div>
      </div>

      {/* Quick Launchpad & Recommended Actions */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>AI Career Tools Launchpad</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <Link to="/student/mock-interview" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', color: 'var(--accent-secondary)' }}>
                <Mic size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>AI Mock Interview</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Simulate Technical & HR questions</p>
              </div>
            </div>
          </Link>

          <Link to="/student/cover-letter" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}>
                <BookOpen size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>AI Cover Letter</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Generate targeted letters in seconds</p>
              </div>
            </div>
          </Link>

          <Link to="/student/cv" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
                <Award size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Academic CV Builder</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Format research & honors</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
