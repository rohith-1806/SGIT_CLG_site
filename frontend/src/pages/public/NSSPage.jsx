import React from 'react';
import { FiHeart, FiUsers, FiCheckCircle, FiAward, FiSun, FiArrowLeft, FiGlobe } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NSSPage = () => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Back Link */}
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
        <FiArrowLeft size={16} /> Back to SGIT Home
      </Link>

      {/* Hero Banner */}
      <div className="glass-panel" style={{ padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div className="badge badge-red" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiHeart size={16} /> Community Responsibility & Leadership
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '1rem' }}>
          SGIT NSS Unit 🤝
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '750px', lineHeight: 1.7 }}>
          The National Service Scheme (NSS) at Dr. Samuel George Institute of Engineering & Technology (SGIT) provides students with hands-on exposure to social service, rural upliftment, environmental sustainability, and civic leadership.
        </p>

        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(227, 30, 36, 0.12)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(227,30,36,0.3)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>NSS Motto</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)' }}>"Not Me, But You"</div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.12)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>Campus Footprint</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>38-Acre Eco Campus</div>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.12)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>Impact Region</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-gold)' }}>Markapur & Prakasam Dist.</div>
          </div>
        </div>
      </div>

      {/* NSS Core Pillars */}
      <div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          NSS Core Objectives & Principles
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-card">
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(227, 30, 36, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FiUsers size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Community Integration</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Understand community needs in Prakasam District and connect engineering solutions with real-world rural challenges.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FiSun size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Environmental Stewardship</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Drive clean energy, solar initiatives, tree plantation drives, water harvesting, and plastic-free campus campaigns.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FiGlobe size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Social Leadership</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Develop democratic leadership, disaster management readiness, and emergency relief response capabilities.
            </p>
          </div>
        </div>
      </div>

      {/* Flagship Activities */}
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          Flagship Community Programs @ SGIT
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: 'Mega Blood Donation Drives', desc: 'Annual voluntary blood donation camps in association with Indian Red Cross Society and local hospitals.' },
            { title: 'Swachh Bharat Cleanliness Drives', desc: 'Campus & town cleanliness awareness rallies and waste segregation initiatives across Markapur.' },
            { title: 'Digital Literacy for Rural Schools', desc: 'SGIT engineering scholars train rural school students in basic computer skills and coding fundamentals.' },
            { title: 'Free Health & Eye Checkup Camps', desc: 'Free medical diagnosis and eye care camps organized for neighboring village communities.' },
            { title: 'Green Campus Tree Plantation', desc: 'Mass plantation drives adding to the 38-acre solar-powered green sanctuary at SGIT.' }
          ].map((item, idx) => (
            <div key={idx} style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <FiCheckCircle size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>{item.title}</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NSSPage;
