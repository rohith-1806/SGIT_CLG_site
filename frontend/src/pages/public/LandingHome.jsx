import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { 
  GraduationCap, Award, Briefcase, BookOpen, Users, ArrowRight, ShieldCheck, 
  CheckCircle, Zap, Star, FileText, Mic, CheckSquare, Layers, Building 
} from 'lucide-react';

const LandingHome = () => {
  const [stats, setStats] = useState({
    totalStudents: 3450,
    totalDepartments: 7,
    totalProjects: 580,
    totalInternships: 120,
    placementRate: 94.8,
    highestPackage: '45 LPA',
    averagePackage: '12.5 LPA'
  });

  useEffect(() => {
    API.get('/public/stats')
      .then(res => {
        if (res.data.success) setStats(res.data.stats);
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '5rem 2rem 3rem 2rem',
        textAlign: 'center',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        <div className="badge badge-red" style={{ marginBottom: '1.5rem', padding: '0.5rem 1.25rem' }}>
          <GraduationCap size={16} /> SGIT AUTONOMOUS College Career & Learning Ecosystem
        </div>
        <h1 style={{
          fontSize: '3.8rem',
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem'
        }}>
          Architecting Next-Gen <br />
          <span className="text-gradient">Engineers, Leaders & Careers</span>
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          maxWidth: '750px',
          margin: '0 auto 2.5rem auto',
          lineHeight: '1.7'
        }}>
          Elevate campus education at SGIT AUTONOMOUS with an enterprise SaaS ecosystem featuring AI Resume Builders, ATS Scoring engines, Mock Interview Studios, Internship Portals, and Realtime Analytics.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem' }}>
            <span>Apply / Student Registration</span>
            <ArrowRight size={20} />
          </Link>
          <Link to="/login" className="btn-secondary" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem' }}>
            <span>Student Sign In</span>
          </Link>
        </div>

        {/* Live Counters Banner */}
        <div className="glass-panel" style={{
          marginTop: '4rem',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--accent-primary)' }}>{stats.placementRate}%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Placement Record</div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--accent-emerald)' }}>{stats.highestPackage}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Highest Global Offer</div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--accent-cyan)' }}>{stats.totalStudents}+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>SGIT Scholars</div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--accent-gold)' }}>7</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Autonomous Wings</div>
          </div>
        </div>
      </section>

      {/* AI Career Suite */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-red" style={{ marginBottom: '0.75rem' }}>Core AI Tools</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>AI Career Acceleration Suite</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Empowering SGIT Scholars to pass corporate ATS algorithms and secure tier-1 offers.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(227, 30, 36, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <FileText size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Resume & CV Builder</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Drag and drop section builder, professional templates, instant AI content polish, and single-click vector PDF generation.
            </p>
            <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <span>Build SGIT Resume</span> <ArrowRight size={16} />
            </Link>
          </div>

          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <CheckSquare size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>ATS Matrix Analyzer</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Scan your resume against target job descriptions. Get instant match scores, missing keyword suggestions, and readability audits.
            </p>
            <Link to="/login" style={{ color: 'var(--accent-emerald)', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <span>Scan ATS Score</span> <ArrowRight size={16} />
            </Link>
          </div>

          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Mic size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>AI Mock Interview Studio</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Simulate technical, HR, and system design interviews with voice/text responses, realtime scoring, and STAR framework feedback.
            </p>
            <Link to="/login" style={{ color: 'var(--accent-gold)', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <span>Start Practice Round</span> <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingHome;
