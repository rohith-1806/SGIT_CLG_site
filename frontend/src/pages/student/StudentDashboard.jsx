import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Award, User, Calendar, CheckCircle2, ArrowRight, ShieldCheck, 
  BookOpen, Sparkles, Activity, Clock, Shield, Heart, Trophy, FileText, ChevronRight
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [academicData, setAcademicData] = useState(null);

  // Fetch Academic Summary from Backend API
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch('/api/student/cgpa', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (data.success && data.data) {
          setAcademicData(data.data);
        }
      } catch (err) {
        console.error('Error loading dashboard summary:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const cgpa = academicData?.cgpa || 8.50;
  const sgpa = academicData?.currentSGPA || 8.75;
  const completedCredits = academicData?.completedCredits || 106;
  const totalRequiredCredits = 160;
  const remainingCredits = Math.max(0, totalRequiredCredits - completedCredits);
  const degreeClass = academicData?.degreeClass || 'First Class with Distinction';
  const standing = academicData?.academicStanding || 'Outstanding';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. WELCOME BANNER */}
      <div className="glass-panel" style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(227, 30, 36, 0.2) 0%, rgba(18, 18, 21, 0.95) 100%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(227, 30, 36, 0.35)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        <div>
          <div className="badge badge-red" style={{ marginBottom: '0.5rem' }}>
            SGIT AUTONOMOUS STUDENT PORTAL
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
            Welcome back, SGITian <span className="text-gradient">{user?.name || 'Student'}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.35rem', maxWidth: '650px' }}>
            Department of {user?.department || 'Computer Science & Engineering'} • {user?.year || '3rd Year'} ({user?.semester || '6th Semester'})
          </p>
        </div>

        {/* Quick Profile Summary Badge */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <img 
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
            alt={user?.name} 
            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }}
            onError={(e) => { e.target.src = '/assets/sgit-logo.jpg'; }}
          />
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>ENROLLMENT ID</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {user?.enrollmentId || user?.enrollmentNo || 'SGIT-2024-DEMO'}
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--accent-emerald)', fontWeight: 700, marginTop: '0.15rem' }}>
              ✓ Verified SGIT Scholar
            </div>
          </div>
        </div>
      </div>

      {/* 2. COMPACT ACADEMIC SUMMARY CARD (CLICKABLE -> /academic-progress) */}
      <div 
        onClick={() => navigate('/academic-progress')}
        className="glass-card" 
        style={{
          padding: '1.75rem',
          cursor: 'pointer',
          border: '1px solid var(--border-glow)',
          boxShadow: 'var(--shadow-glass), var(--shadow-glow)',
          background: 'linear-gradient(135deg, rgba(28, 28, 35, 0.8) 0%, rgba(18, 18, 21, 0.95) 100%)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Award size={22} style={{ color: 'var(--accent-gold)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
              Academic Performance Summary
            </h3>
          </div>
          <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            View Full Ledger <ChevronRight size={16} />
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem'
        }}>
          <div style={{ background: 'rgba(227, 30, 36, 0.08)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(227, 30, 36, 0.2)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>CURRENT CGPA</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-primary)', lineHeight: 1.1, marginTop: '0.2rem' }}>
              {cgpa.toFixed(2)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, marginTop: '0.35rem' }}>
              Out of 10.0 Grade Scale
            </div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>CURRENT SGPA</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-emerald)', lineHeight: 1.1, marginTop: '0.2rem' }}>
              {sgpa.toFixed(2)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
              Last Semester Performance
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>COMPLETED CREDITS</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1, marginTop: '0.2rem' }}>
              {completedCredits}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              {remainingCredits} Credits Remaining
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>DEGREE CLASS</div>
            <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--accent-gold)', marginTop: '0.4rem' }}>
              {degreeClass}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.35rem', fontWeight: 700 }}>
              Standing: {standing}
            </div>
          </div>
        </div>
      </div>

      {/* 3. ACADEMIC INFORMATION & ATTENDANCE ROW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>

        {/* Student Academic Details Card */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} style={{ color: 'var(--accent-primary)' }} />
            Academic Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>DEPARTMENT</span>
              <strong style={{ color: 'var(--text-primary)' }}>{user?.department || 'CSE'}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>YEAR / SEMESTER</span>
              <strong style={{ color: 'var(--text-primary)' }}>{user?.year || '3rd Year'} ({user?.semester || '6th Sem'})</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>ENROLLMENT ID</span>
              <strong style={{ color: 'var(--text-primary)' }}>{user?.enrollmentId || user?.enrollmentNo || 'SGIT-2024-DEMO'}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>CAREER GOAL</span>
              <strong style={{ color: 'var(--accent-primary)' }}>{user?.careerGoal || 'Software Engineer'}</strong>
            </div>
          </div>
        </div>

        {/* Attendance & Participation Card */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={18} style={{ color: 'var(--accent-emerald)' }} />
            Attendance & Institutional Status
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Semester Attendance</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Required Minimum: 75%</div>
              </div>
              <div className="badge badge-emerald" style={{ fontSize: '0.85rem' }}>
                94.5% (Good)
              </div>
            </div>

            <div style={{ width: '100%', height: '8px', background: 'var(--bg-card)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '94.5%', height: '100%', background: 'var(--accent-emerald)', borderRadius: '4px' }}></div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ padding: '0.4rem 0.75rem', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={14} /> Academic Status: Active Scholar
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. RECENT ACADEMIC ACHIEVEMENTS & CERTIFICATES */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Trophy size={18} style={{ color: 'var(--accent-gold)' }} />
          Recent Academic Achievements & Certificates
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {user?.achievements && user.achievements.length > 0 ? (
            user.achievements.map((ach, i) => (
              <div key={i} className="glass-card" style={{ padding: '1rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
                  {ach}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Verified SGIT Institutional Achievement
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card" style={{ padding: '1rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
                SGIT Academic Honor Roll
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                First Class with Distinction Award
              </div>
            </div>
          )}

          <div className="glass-card" style={{ padding: '1rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)' }} />
              Full-Stack Engineering Certification
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Issued by SGIT Autonomous Placement Cell
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;
