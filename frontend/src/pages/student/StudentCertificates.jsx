import React from 'react';
import { Award, Sparkles, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const StudentCertificates = () => {
  const { user } = useAuth();

  const certificates = [
    {
      id: 1,
      title: 'Full-Stack Web Engineering Certification',
      issuer: 'SGIT Autonomous Placement & Career Cell',
      date: 'August 2026',
      badge: 'Professional',
      description: 'Certified mastery in React 18, Node.js, Express microservices, and MongoDB database architecture.'
    },
    {
      id: 2,
      title: 'Python & AI Fundamentals',
      issuer: 'SGIT Department of Computer Science & Engineering',
      date: 'June 2026',
      badge: 'Academic',
      description: 'Completed hands-on machine learning data pipelines and PyTorch neural network training.'
    },
    {
      id: 3,
      title: 'NCC B-Certificate Honor',
      issuer: '186 COY NCC Senior Division Unit',
      date: 'March 2026',
      badge: 'Defense',
      description: 'Passed 2-year military drill, weapon marksmanship, and Annual Training Camp (ATC).'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div className="badge badge-gold" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Sparkles size={14} /> VERIFIED INSTITUTIONAL CREDENTIALS
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
          My Certificates & Achievements
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
          Official academic, technical, and institutional achievements issued to {user?.name || 'Student'} by SGIT AUTONOMOUS.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {certificates.map((cert) => (
          <div key={cert.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-red">{cert.badge}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>{cert.date}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                {cert.title}
              </h3>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
                {cert.issuer}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {cert.description}
              </p>
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <ShieldCheck size={15} /> Verified Credential
              </span>
              <button className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', gap: '0.25rem' }}>
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCertificates;
