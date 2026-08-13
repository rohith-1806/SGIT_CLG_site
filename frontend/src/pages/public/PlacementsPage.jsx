import React from 'react';
import { Award, Briefcase, TrendingUp, Building, Star, CheckCircle } from 'lucide-react';

const PlacementsPage = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>Track Record</div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Campus Placement Excellence</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Proven record of tier-1 global engineering placements.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>45 LPA</div>
          <div style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Highest Global Package</div>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>12.5 LPA</div>
          <div style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Average Package</div>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>94.8%</div>
          <div style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Overall Placement Rate</div>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>150+</div>
          <div style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Hiring Corporate Partners</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>Featured Student Placements 2026</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Student" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <div>
              <h4 style={{ fontWeight: 700 }}>Alex Johnson</h4>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600 }}>Stripe • Software Engineer</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Package: 45 LPA</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Student" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <div>
              <h4 style={{ fontWeight: 700 }}>Daniel Park</h4>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Google • AI Research Engineer</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Package: 42 LPA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementsPage;
