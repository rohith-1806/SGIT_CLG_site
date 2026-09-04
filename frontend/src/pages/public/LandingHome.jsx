import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import CMSEditModal from '../../components/common/CMSEditModal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, ArrowRight, Edit3, 
  ChevronLeft, ChevronRight, Award, Shield, Heart, Sun, BookOpen, Trophy,
  Book, Star, CheckCircle, Clock, Users
} from 'lucide-react';

const DEFAULT_PRIDE_SLIDES = [
  {
    id: 'slide-1',
    title: '38-Acre Autonomous Campus',
    category: 'SGIT Campus',
    description: 'Dr. Samuel George Institute of Engineering & Technology (SGIT), established in 1997 at Markapur, Prakasam District, AP.',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
    badge: 'SGIT AUTONOMOUS'
  },
  {
    id: 'slide-2',
    title: 'NCC Unit 186 COY — State Parade Delegate',
    category: 'NCC',
    description: 'Official SGIT NCC Unit fostering discipline, leadership and national service. CQMS P. Rohith selected for State Parade as sole district cadet.',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&auto=format&fit=crop&q=80',
    badge: '🎖 NCC Unit 186'
  },
  {
    id: 'slide-3',
    title: 'NSS Social Service Unit — "Not Me, But You"',
    category: 'NSS',
    description: 'Empowering community service, blood donation camps, civic responsibility, and environmental stewardship.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&auto=format&fit=crop&q=80',
    badge: '🤝 NSS Unit'
  },
  {
    id: 'slide-4',
    title: 'Solar Powered Green Campus',
    category: 'Green Campus',
    description: '100% eco-friendly 38-acre green campus powered by rooftop solar energy grid and rainwater harvesting.',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80',
    badge: '☀️ Green Energy'
  },
  {
    id: 'slide-5',
    title: 'State-of-the-Art Indoor Stadium & Sports Complex',
    category: 'Sports & Indoor Stadium',
    description: 'Badminton courts, table tennis, gymnasium, and outdoor sports arenas hosting inter-collegiate championships.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
    badge: '🏆 Sports Hub'
  },
  {
    id: 'slide-6',
    title: 'Central Digital Library & Research Pods',
    category: 'Library',
    description: 'Over 45,000+ volumes, IEEE e-journals, digital reading room, and incubation research labs.',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&auto=format&fit=crop&q=80',
    badge: '📚 Digital Library'
  }
];

const ACADEMIC_BRANCHES = [
  { code: 'CSE', name: 'Computer Science & Engineering', desc: 'Core software engineering, algorithms, system architecture, and cloud computing.' },
  { code: 'CSE – AI', name: 'Computer Science & Engineering – Artificial Intelligence', desc: 'AI agent systems, neural networks, machine intelligence, and computer vision.' },
  { code: 'CSE – DS', name: 'Computer Science & Engineering – Data Science', desc: 'Big data analytics, predictive modeling, statistics, and business intelligence.' },
  { code: 'AI & ML', name: 'Artificial Intelligence & Machine Learning', desc: 'Machine learning algorithms, deep learning pipelines, NLP, and intelligent robotics.' },
  { code: 'ECE', name: 'Electronics & Communication Engineering', desc: 'VLSI circuit design, embedded systems, microcontrollers, signal processing, and IoT.' },
  { code: 'EEE', name: 'Electrical & Electronics Engineering', desc: 'Smart power systems, renewable solar grids, electrical machinery, and automation.' },
  { code: 'Civil', name: 'Civil Engineering', desc: 'Structural design, environmental engineering, surveying, and smart city infrastructure.' },
  { code: 'Mechanical', name: 'Mechanical Engineering', desc: 'Thermal dynamics, CAD/CAM manufacturing, robotics, and industrial automation.' }
];

const LandingHome = () => {
  const { user } = useAuth();
  const aboutRef = useRef(null);

  const [cmsHero, setCmsHero] = useState({
    title: 'SGIT AUTONOMOUS',
    subtitle: 'Empowering Students Through Quality Technical Education',
    heading: 'SGIT AUTONOMOUS',
    description: 'Since 1997, SGIT has been committed to nurturing creativity, knowledge, discipline and technical excellence.',
    bannerText: 'Dr. Samuel George Institute of Engineering & Technology | Markapur, Prakasam Dist, AP (Est. 1997)'
  });

  const [slides, setSlides] = useState(DEFAULT_PRIDE_SLIDES);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    API.get('/cms/content/hero')
      .then(res => {
        if (res.data.success && res.data.content && res.data.content.title) {
          setCmsHero(res.data.content);
        }
      })
      .catch(() => {});

    API.get('/cms/content/college_pride_slider')
      .then(res => {
        if (res.data.success && res.data.content?.metadata?.slides) {
          setSlides(res.data.content.metadata.slides);
        }
      })
      .catch(() => {});
  }, []);

  // Carousel Autoplay Timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeSlide = slides[currentSlideIndex] || slides[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', paddingBottom: '4rem' }}>
      {/* Super Admin Edit Control */}
      {user?.role === 'superadmin' && (
        <div style={{
          background: 'rgba(227, 30, 36, 0.12)',
          border: '1px solid rgba(227, 30, 36, 0.35)',
          borderRadius: '12px',
          padding: '0.75rem 1.5rem',
          margin: '1rem 2rem 0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
            Super Admin Governance Mode — Edit Public Homepage CMS
          </span>
          <button 
            onClick={() => setEditModalOpen(true)} 
            className="btn-primary" 
            style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
          >
            <Edit3 size={14} /> <span>Edit Hero Text</span>
          </button>
        </div>
      )}

      {/* 1. HERO SECTION (Requirement #5) */}
      <section style={{
        position: 'relative',
        padding: '3rem 2rem 1rem 2rem',
        textAlign: 'center',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        <div className="badge badge-red" style={{ marginBottom: '1.5rem', padding: '0.5rem 1.25rem' }}>
          <GraduationCap size={16} /> {cmsHero.bannerText || 'Dr. Samuel George Institute of Engineering & Technology | Code: SGIT'}
        </div>
        
        <h1 style={{
          fontSize: '4.2rem',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '1rem'
        }}>
          <span className="text-gradient">SGIT AUTONOMOUS</span>
        </h1>

        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 800,
          color: 'var(--accent-gold)',
          marginBottom: '1.25rem'
        }}>
          {cmsHero.subtitle || 'Empowering Students Through Quality Technical Education'}
        </h2>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          maxWidth: '750px',
          margin: '0 auto 2.5rem auto',
          lineHeight: '1.7'
        }}>
          Since 1997, SGIT has been committed to nurturing creativity, knowledge, discipline and technical excellence.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          <button onClick={scrollToAbout} className="btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem' }}>
            <span>Explore SGIT</span>
            <ArrowRight size={20} />
          </button>
          <Link to="/login" className="btn-secondary" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem' }}>
            <span>Student Login</span>
          </Link>
        </div>

        {/* Official Quick Institutional Badges */}
        <div className="glass-panel" style={{
          marginTop: '4rem',
          padding: '1.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-primary)' }}>1997</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Year Established</div>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-gold)' }}>NAAC 'A'</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Accreditation Grade</div>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-emerald)' }}>AUTONOMOUS</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Academic Status</div>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-cyan)' }}>38 Acres</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700 }}>Solar Green Campus</div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SGIT SECTION (Requirement #6) */}
      <section ref={aboutRef} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div className="glass-panel" style={{ padding: '3.5rem 3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div className="badge badge-red" style={{ marginBottom: '1rem' }}>
                About Our Institution
              </div>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '1.25rem', lineHeight: '1.25' }}>
                Dr. Samuel George Institute of Engineering & Technology
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                SGIT was established in <strong>1997</strong> at Markapur, Prakasam District, Andhra Pradesh (College Code: <strong>SGIT</strong>). The institution was founded with the vision of providing quality technical education and developing young minds through academic and technical excellence.
              </p>
              
              <div style={{ background: 'rgba(227, 30, 36, 0.08)', padding: '1.25rem 1.5rem', borderRadius: '14px', borderLeft: '4px solid var(--accent-primary)', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Official Institutional Motto</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  "Discipline. Hard Work. Value of Time."
                </div>
              </div>
            </div>

            {/* Vision Themes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {[
                { title: 'Creativity', desc: 'Fostering innovative problem-solving in engineering disciplines.' },
                { title: 'Talent Development', desc: 'Nurturing student potential through hands-on technical labs.' },
                { title: 'Knowledge', desc: 'Comprehensive academic rigor aligned with autonomous curriculum.' },
                { title: 'Future Readiness', desc: 'Preparing engineers for global industry challenges and leadership.' }
              ].map((theme, i) => (
                <div key={i} className="glass-card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.4rem' }}>
                    {theme.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {theme.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACADEMIC EXCELLENCE (Requirement #7) */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-red" style={{ marginBottom: '0.75rem' }}>Autonomous Wings</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Academic Excellence</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '650px', margin: '0.5rem auto 0 auto' }}>
            Comprehensive undergraduate & postgraduate engineering programs approved by AICTE & Accredited NAAC 'A'.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem' }}>
          {ACADEMIC_BRANCHES.map(branch => (
            <div key={branch.code} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="badge badge-red" style={{ fontSize: '0.75rem', marginBottom: '0.75rem', width: 'fit-content' }}>
                  {branch.code}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: '1.35' }}>
                  {branch.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                  {branch.desc}
                </p>
              </div>
              <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                4-Year B.Tech Degree Program
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. OUR SGIT. OUR PRIDE. CAROUSEL & CARDS (Requirement #10 & #11) */}
      <section style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge badge-red" style={{ marginBottom: '0.75rem', display: 'inline-flex', gap: '0.4rem' }}>
            <Award size={16} /> Authentic Campus Showcase
          </div>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 900 }}>OUR SGIT. OUR PRIDE. ❤️</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '650px', margin: '0.5rem auto 0 auto' }}>
            Celebrating the people, places and institutional achievements that make SGIT special.
          </p>
        </div>

        {/* Automatic Image Carousel */}
        <div 
          className="glass-panel" 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ 
            position: 'relative', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            minHeight: '480px',
            display: 'flex', 
            flexDirection: 'column',
            justify: 'flex-end',
            border: '1px solid rgba(227, 30, 36, 0.35)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${activeSlide.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1
              }}
            />
          </AnimatePresence>

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.95) 100%)',
            zIndex: 2
          }} />

          <div style={{ position: 'relative', zIndex: 3, padding: '3rem 2.5rem' }}>
            <motion.div
              key={`text-${activeSlide.id}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="badge badge-gold" style={{ fontSize: '0.8rem', marginBottom: '0.75rem', display: 'inline-block' }}>
                {activeSlide.badge}
              </span>
              <h3 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.5rem' }}>
                {activeSlide.title}
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', maxWidth: '700px', lineHeight: '1.6' }}>
                {activeSlide.description}
              </p>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    style={{
                      width: currentSlideIndex === idx ? '28px' : '10px',
                      height: '10px',
                      borderRadius: '10px',
                      background: currentSlideIndex === idx ? 'var(--accent-primary)' : 'rgba(255,255,255,0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={handlePrevSlide}
                  aria-label="Previous Slide"
                  className="btn-secondary"
                  style={{ borderRadius: '50%', width: '44px', height: '44px', padding: 0, justifyContent: 'center' }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextSlide}
                  aria-label="Next Slide"
                  className="btn-secondary"
                  style={{ borderRadius: '50%', width: '44px', height: '44px', padding: 0, justifyContent: 'center' }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Institutional Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
          {/* 🎖 NCC Card */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(227, 30, 36, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>🎖 NCC Unit 186 COY</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                SGIT has an NCC Unit (186 COY) fostering military discipline, leadership, and parade drills. Features CQMS P. Rohith — State Parade selection delegate.
              </p>
            </div>
            <Link to="/ncc" className="btn-primary" style={{ justifyContent: 'center', gap: '0.5rem' }}>
              <span>Explore SGIT NCC</span> <ArrowRight size={16} />
            </Link>
          </div>

          {/* 🤝 NSS Card */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Heart size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>🤝 NSS Community Unit</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Official motto "Not Me, But You". Encouraging blood donation camps, Swachh Bharat cleanliness drives, and rural digital literacy.
              </p>
            </div>
            <Link to="/nss" className="btn-primary" style={{ justifyContent: 'center', gap: '0.5rem' }}>
              <span>Explore SGIT NSS</span> <ArrowRight size={16} />
            </Link>
          </div>

          {/* 🏆 NAAC A & AUTONOMOUS Card */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Trophy size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>🏆 NAAC A Grade & AUTONOMOUS</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Established in 1997 at Markapur, Prakasam District, AP. Accredited NAAC 'A' Grade autonomous institution fostering academic freedom.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-emerald">NAAC GRADE A</span>
              <span className="badge badge-red">SGIT AUTONOMOUS</span>
            </div>
          </div>

          {/* ☀️ GREEN CAMPUS & 📚 LIBRARY */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Sun size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>☀️ Green Campus & 📚 Digital Library</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                100% solar powered 38-acre campus, indoor stadium, and digital library with 45,000+ volumes, IEEE journals, and quiet research pods.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-green">38-Acre Solar Campus</span>
              <span className="badge badge-blue">IEEE Digital Library</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SGIT NCC SPECIAL HIGHLIGHT (CQMS P. ROHITH - Requirement #14) */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div 
          className="glass-panel" 
          style={{ 
            padding: '3rem 2.5rem', 
            background: 'linear-gradient(135deg, rgba(227, 30, 36, 0.15) 0%, rgba(245, 158, 11, 0.12) 100%)',
            border: '2px solid var(--accent-gold)',
            borderRadius: '24px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div className="badge badge-gold" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Star size={16} /> SGIT NCC PRIDE — SPECIAL HIGHLIGHT
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                CQMS P. ROHITH
              </h2>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                STATE PARADE SELECTION — THE PRIDE OF SGIT
              </div>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '750px' }}>
                Reported as the <strong>only cadet selected from the entire district</strong> to represent in the prestigious State Parade. CQMS P. ROHITH brings national distinction to Dr. Samuel George Institute of Engineering & Technology.
              </p>
            </div>

            <div>
              <Link to="/ncc" className="btn-primary" style={{ padding: '0.9rem 1.75rem', fontSize: '1rem', background: 'var(--accent-gold)', color: '#000' }}>
                <span>View Full NCC Feature</span> <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CMS Edit Modal for Super Admin */}
      <CMSEditModal 
        sectionKey="hero"
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSaveSuccess={(updatedContent) => setCmsHero(updatedContent)}
        defaultData={cmsHero}
      />
    </div>
  );
};

export default LandingHome;
