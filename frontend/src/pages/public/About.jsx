import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import CMSEditModal from '../../components/common/CMSEditModal';
import { Award, ShieldCheck, Target, Edit3 } from 'lucide-react';

const About = () => {
  const { user } = useAuth();
  const [cmsAbout, setCmsAbout] = useState({
    title: 'About SGIT AUTONOMOUS',
    subtitle: 'Excellence & Innovation',
    heading: 'Empowering Next-Gen Technical Scholars',
    description: 'SGIT AUTONOMOUS is a premier technical institution combining rigorous academic excellence, AI-driven career acceleration, and industry-grade engineering practices.'
  });
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    API.get('/cms/content/about')
      .then(res => {
        if (res.data.success && res.data.content && res.data.content.title) {
          setCmsAbout(res.data.content);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Super Admin Edit Banner */}
      {user?.role === 'superadmin' && (
        <div style={{
          background: 'rgba(227, 30, 36, 0.12)',
          border: '1px solid rgba(227, 30, 36, 0.35)',
          borderRadius: '12px',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
            Super Admin CMS Mode Enabled
          </span>
          <button 
            onClick={() => setEditModalOpen(true)} 
            className="btn-primary" 
            style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
          >
            <Edit3 size={14} /> <span>Edit About Section</span>
          </button>
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <div className="badge badge-red" style={{ marginBottom: '1rem' }}>{cmsAbout.subtitle}</div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
          {cmsAbout.heading}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.7 }}>
          {cmsAbout.description}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass-card">
          <Target size={32} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Our Mission</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            To bridge the gap between higher education and tier-1 tech industry standards through hands-on learning, production project building, and AI-enabled career mentoring.
          </p>
        </div>

        <div className="glass-card">
          <ShieldCheck size={32} style={{ color: 'var(--accent-emerald)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Accreditation & Standards</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            A++ NAAC Grade Accreditation, NBA Certified Engineering Programs, and FERPA/ISO 27001 data governance security protocols.
          </p>
        </div>

        <div className="glass-card">
          <Award size={32} style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Global Alumni Community</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Over 15,000+ alumni engineering leaders working across Stripe, Google, Amazon, Microsoft, Netflix, OpenAI, and Y-Combinator startups.
          </p>
        </div>
      </div>

      <CMSEditModal 
        sectionKey="about"
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSaveSuccess={(updatedContent) => setCmsAbout(updatedContent)}
        defaultData={cmsAbout}
      />
    </div>
  );
};

export default About;
