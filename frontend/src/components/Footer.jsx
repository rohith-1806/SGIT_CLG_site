import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Shield, Github, Linkedin, Twitter, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      marginTop: 'auto',
      padding: '4rem 2.5rem 2rem 2.5rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>
        {/* Brand Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <GraduationCap size={20} />
            </div>
            <span style={{ fontWeight: 900, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
              SGIT <span className="text-gradient">AUTONOMOUS</span>
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Premier autonomous engineering ecosystem providing AI career builders, ATS analysis, and industry placement governance.
          </p>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
            <Github size={20} style={{ cursor: 'pointer' }} />
            <Linkedin size={20} style={{ cursor: 'pointer' }} />
            <Twitter size={20} style={{ cursor: 'pointer' }} />
            <Globe size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Navigation</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Home</Link></li>
            <li><Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>About SGIT</Link></li>
            <li><Link to="/departments" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Departments</Link></li>
            <li><Link to="/placements" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Placements</Link></li>
            <li><Link to="/faq" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>FAQ</Link></li>
            <li><Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Contact Us</Link></li>
          </ul>
        </div>

        {/* Career AI Tools */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>AI Career Tools</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Resume & CV Builder</Link></li>
            <li><Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>ATS Matrix Analyzer</Link></li>
            <li><Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>AI Mock Interview Studio</Link></li>
            <li><Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Project Showcase</Link></li>
          </ul>
        </div>

        {/* Portals */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Portals</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Student Portal</Link></li>
            <li><Link to="/admin/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Faculty Admin Login</Link></li>
            <li><Link to="/super-admin/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Super Admin Portal</Link></li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '3rem auto 0 auto',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '0.85rem',
        color: 'var(--text-muted)'
      }}>
        <div>
          © {new Date().getFullYear()} SGIT AUTONOMOUS. All Rights Reserved.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={14} style={{ color: 'var(--accent-emerald)' }} />
          <span>NBA Accredited & Autonomous Security Architecture</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
