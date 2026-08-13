import React from 'react';
import { Award, ShieldCheck, Target, Heart, CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '1rem' }}>Excellence & Innovation</div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
          Empowering Next-Gen Technical Scholars
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.7 }}>
          Aura College is a premier technical institution combining rigorous academic excellence, AI-driven career acceleration, and industry-grade engineering practices.
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
            A+ NAAC Grade Accreditation, NBA Certified Engineering Programs, and FERPA/ISO 27001 data governance security protocols.
          </p>
        </div>

        <div className="glass-card">
          <Award size={32} style={{ color: 'var(--accent-secondary)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Global Alumni Community</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Over 15,000+ alumni engineering leaders working across Stripe, Google, Amazon, Microsoft, Netflix, OpenAI, and Y-Combinator startups.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
