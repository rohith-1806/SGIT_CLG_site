import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Award, Star, CheckCircle2, Flag, Compass, Users, 
  ArrowLeft, Image as ImageIcon, Sparkles, BookOpen, Layers
} from 'lucide-react';

const NCC_GALLERY_IMAGES = [
  {
    title: 'State Parade Selection Drill',
    category: 'State Parade',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80',
    caption: 'SGIT cadets undergoing ceremonial drill inspection for State Parade selection.'
  },
  {
    title: 'Guard of Honour Demonstration',
    category: 'Parade',
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80',
    caption: 'Guard of Honour presented to Commanding Officers at SGIT campus grounds.'
  },
  {
    title: 'Weapon & Marksmanship Mastery',
    category: 'Training',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    caption: 'Small arms safety, target shooting, and marksmanship masterclass.'
  },
  {
    title: 'Combined Annual Training Camp (CATC)',
    category: 'Camp',
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80',
    caption: 'Cadets participating in obstacle course navigation and field tactics.'
  }
];

const NCCPage = () => {
  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Breadcrumb Link */}
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
        <ArrowLeft size={16} /> Back to SGIT Home
      </Link>

      {/* Main Banner Header */}
      <div className="glass-panel" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden', border: '1px solid rgba(227, 30, 36, 0.35)' }}>
        <div className="badge badge-red" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={16} /> SGIT INSTITUTIONAL CADRE — 186 COY UNIT
        </div>

        <h1 style={{ fontSize: '2.6rem', fontWeight: 900, lineHeight: 1.2, margin: '0 0 0.5rem 0' }}>
          SGIT NCC
        </h1>

        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '1rem', letterSpacing: '0.05em' }}>
          Discipline • Leadership • Service
        </div>

        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '750px', lineHeight: 1.7, margin: 0 }}>
          Dr. Samuel George Institute of Engineering & Technology (SGIT) maintains an active Senior Division <strong>NCC Unit (186 COY)</strong> dedicated to instilling character, military drill precision, comradeship, and defense preparedness among engineering scholars.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(227, 30, 36, 0.12)', padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(227,30,36,0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>UNIT DESIGNATION</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-primary)' }}>186 COY NCC Unit</div>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.12)', padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>CADRE DIVISION</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-gold)' }}>Senior Division Army Wing</div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.12)', padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>MOTTO</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>Unity and Discipline</div>
          </div>
        </div>
      </div>

      {/* SPECIAL ACHIEVEMENT CARD: CQMS P. ROHITH (Requirement #21) */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '2.5rem', 
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(227, 30, 36, 0.15) 100%)',
          border: '2px solid var(--accent-gold)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-glass), var(--shadow-glow)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="badge badge-gold" style={{ marginBottom: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem' }}>
              <Star size={16} /> SGIT NCC PRIDE & HONOUR
            </div>
            
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.35rem 0' }}>
              CQMS P. ROHITH
            </h2>

            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
              STATE PARADE SELECTED
            </div>

            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              CAMP: LRDC (Leadership & Republic Day Camp)
            </div>

            <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', lineHeight: 1.7, margin: 0 }}>
              Reported as the <strong>only cadet selected from the entire district</strong> to represent SGIT in the prestigious State Parade. CQMS P. ROHITH brings national distinction and immense pride to Dr. Samuel George Institute of Engineering & Technology (SGIT).
            </p>

            <div className="badge badge-red" style={{ marginTop: '1.25rem', padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>
              THE PRIDE OF SGIT
            </div>
          </div>

          {/* ASCII-styled Emblem Box */}
          <div style={{
            background: '#09090b',
            border: '2px solid var(--accent-gold)',
            borderRadius: '16px',
            padding: '1.75rem 2rem',
            textAlign: 'center',
            minWidth: '260px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              SGIT NCC PRIDE
            </div>
            <div style={{ height: '2px', background: 'var(--accent-gold)', margin: '0.75rem 0' }} />
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff' }}>
              CQMS P. ROHITH
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '0.35rem' }}>
              STATE PARADE SELECTED
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              CAMP: LRDC
            </div>
            <div style={{ height: '2px', background: 'var(--accent-gold)', margin: '0.75rem 0' }} />
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent-gold)', letterSpacing: '0.12em' }}>
              THE PRIDE OF SGIT
            </div>
          </div>
        </div>
      </div>

      {/* "FIND MORE ABOUT SGIT NCC" SECTION (Requirement #22) */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={22} style={{ color: 'var(--accent-gold)' }} />
          Find More About SGIT NCC
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div className="glass-card">
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Flag size={18} /> About SGIT NCC & Unit 186
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              SGIT maintains an active NCC Unit (186 COY) under the Senior Division. The unit is dedicated to developing character, leadership, secular outlook, and ideals of selfless service.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-gold)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Compass size={18} /> Discipline & Military Training
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Cadets receive rigorous instruction in drill ceremony, rifle firing, map reading, obstacle course navigation, and field craft tactical maneuvers.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={18} /> Community & National Service
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Cadets lead voluntary blood donation drives, disaster management relief exercises, cleanliness campaigns, and national integration camps (NIC).
            </p>
          </div>

          <div className="glass-card">
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={18} style={{ color: 'var(--accent-gold)' }} /> Certificates & Defense Opportunities
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Cadets earn NCC 'B' & 'C' Certificates providing bonus marks in UPSC exams and direct SSB interview entries for the Indian Armed Forces.
            </p>
          </div>
        </div>
      </div>

      {/* NCC IMAGE GALLERY (Requirement #23) */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <ImageIcon size={22} style={{ color: 'var(--accent-primary)' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
            NCC Image Gallery — SGIT Cadets in Action
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {NCC_GALLERY_IMAGES.map((img, idx) => (
            <div key={idx} className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img 
                src={img.imageUrl} 
                alt={img.title} 
                style={{ width: '100%', height: '170px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '1rem' }}>
                <span className="badge badge-red" style={{ fontSize: '0.7rem', marginBottom: '0.35rem', display: 'inline-block' }}>
                  {img.category}
                </span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{img.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default NCCPage;
