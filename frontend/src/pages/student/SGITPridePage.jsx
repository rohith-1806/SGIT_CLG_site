import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, Shield, Heart, Sun, BookOpen, Trophy, ChevronLeft, ChevronRight, 
  Pause, Play, Star, MapPin, Building, Users, Activity, Sparkles, CheckCircle2, ArrowLeft 
} from 'lucide-react';

const SGITPridePage = () => {
  // 10 Official SGIT Pride Carousel Slides
  const prideSlides = [
    {
      id: 1,
      title: '38-Acre Autonomous Campus',
      category: 'SGIT Campus',
      badge: 'SGIT AUTONOMOUS',
      description: 'Dr. Samuel George Institute of Engineering & Technology (SGIT), established in 1997 at Markapur, Prakasam District, Andhra Pradesh.',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
      tagline: 'Code: SGIT • Est. 1997 • Markapur, AP'
    },
    {
      id: 2,
      title: 'Modern Academic Architecture',
      category: 'SGIT Building',
      badge: 'NAAC A Grade',
      description: 'State-of-the-art engineering blocks equipped with smart interactive lecture halls, R&D incubation centers, and advanced computing labs.',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200&auto=format&fit=crop&q=80',
      tagline: 'High-Tech Engineering Blocks & Incubation Labs'
    },
    {
      id: 3,
      title: 'Empowered Engineering Scholars',
      category: 'SGIT Students',
      badge: 'Academic Supremacy',
      description: 'Nurturing innovative software developers, AI engineers, and defense tech leaders through hands-on practical project learning.',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
      tagline: 'Future Tech Leaders & Industry Innovators'
    },
    {
      id: 4,
      title: 'Athletic Track & Sports Arena',
      category: 'SGIT Sports',
      badge: 'Sports Excellence',
      description: 'Expansive cricket oval, football field, volleyball arenas, and annual inter-collegiate championship tournaments.',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
      tagline: 'Inter-Collegiate Sports & Athletic Championships'
    },
    {
      id: 5,
      title: 'State-of-the-Art Indoor Stadium',
      category: 'SGIT Indoor Stadium',
      badge: 'Indoor Sports Hub',
      description: 'Multi-court indoor stadium hosting badminton championships, table tennis, gymnastics, and physical wellness centers.',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80',
      tagline: 'Wooden Badminton Courts & Fitness Gymnasium'
    },
    {
      id: 6,
      title: 'Central Digital Library & IEEE Hub',
      category: 'SGIT Library',
      badge: 'Digital Knowledge Base',
      description: 'Over 45,000+ volumes, IEEE digital journal subscriptions, quiet study pods, and digital thesis research portals.',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&auto=format&fit=crop&q=80',
      tagline: '45,000+ Volumes & International IEEE E-Journals'
    },
    {
      id: 7,
      title: 'NCC Unit 186 COY Senior Division',
      category: 'SGIT NCC',
      badge: '🎖 NCC Unit 186',
      description: 'Fostering military discipline, drill precision, leadership, and national integration. Home to State Parade cadets.',
      imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=1200&auto=format&fit=crop&q=80',
      tagline: 'Discipline • Leadership • Service'
    },
    {
      id: 8,
      title: 'NSS Youth Community Service Unit',
      category: 'SGIT NSS',
      badge: '🤝 "Not Me, But You"',
      description: 'Active social responsibility, voluntary blood donation camps, Swachh Bharat cleanups, and rural Prakasam development drives.',
      imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&auto=format&fit=crop&q=80',
      tagline: 'Social Impact & Civic Responsibility'
    },
    {
      id: 9,
      title: 'Technical Symposia & Hackathons',
      category: 'Technical Activities',
      badge: 'AI & Tech Mastery',
      description: '24-hour coding hackathons, robotics challenges, paper presentations, and industry guest lecture series.',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
      tagline: 'Code-a-thons, Robotics & Tech Expo'
    },
    {
      id: 10,
      title: 'Annual Campus Cultural Fest',
      category: 'Campus Events',
      badge: 'Campus Vibrancy',
      description: 'Celebrating student creativity, musical performances, dance showcases, and alumni homecoming gatherings.',
      imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80',
      tagline: 'Grand Annual Festival & Cultural Celebration'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);

  // Auto slide every 4.5 seconds
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % prideSlides.length);
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, prideSlides.length]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? prideSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % prideSlides.length);
  };

  const currentSlide = prideSlides[currentIndex];

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Breadcrumb Link */}
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
        <ArrowLeft size={16} /> Back to SGIT Home
      </Link>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(227, 30, 36, 0.2) 0%, rgba(18, 18, 21, 0.95) 100%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(227, 30, 36, 0.35)'
      }}>
        <div className="badge badge-red" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Heart size={14} /> INSTITUTIONAL HERITAGE
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
          SGIT — OUR COLLEGE. OUR PRIDE.
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.35rem', maxWidth: '750px' }}>
          Dr. Samuel George Institute of Engineering & Technology (SGIT), established in 1997 at Markapur, Prakasam District, AP. NAAC A Grade accredited autonomous center of technical excellence.
        </p>
      </div>

      {/* 10-SLIDE CAROUSEL CONTAINER */}
      <div 
        className="glass-panel" 
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg)',
          minHeight: '440px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          boxShadow: 'var(--shadow-glass)'
        }}
      >
        {/* Slide Image Backdrop */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${currentSlide.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'all 0.6s ease-in-out',
          zIndex: 1
        }}>
          {/* Dark Gradient Overlay for Readability */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(180deg, rgba(9, 9, 11, 0.2) 0%, rgba(9, 9, 11, 0.95) 100%)'
          }} />
        </div>

        {/* Slide Content overlay */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: '2.5rem',
          maxWidth: '800px'
        }}>
          <div className="badge badge-gold" style={{ marginBottom: '0.75rem', fontSize: '0.8rem' }}>
            {currentSlide.badge}
          </div>
          <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            {currentSlide.title}
          </h2>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
            {currentSlide.tagline}
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {currentSlide.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Slide {currentIndex + 1} of {prideSlides.length} ({currentSlide.category})
            </span>
          </div>
        </div>

        {/* Carousel Navigation Arrow Controls */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          style={{
            position: 'absolute', top: '50%', left: '1.25rem', transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.65)', border: '1px solid var(--border-color)',
            color: '#ffffff', width: '44px', height: '44px', borderRadius: '50%',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 20, transition: 'var(--transition-fast)'
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          style={{
            position: 'absolute', top: '50%', right: '1.25rem', transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.65)', border: '1px solid var(--border-color)',
            color: '#ffffff', width: '44px', height: '44px', borderRadius: '50%',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 20, transition: 'var(--transition-fast)'
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
          style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem',
            background: 'rgba(0, 0, 0, 0.65)', border: '1px solid var(--border-color)',
            color: '#ffffff', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-full)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem',
            fontSize: '0.75rem', fontWeight: 700, zIndex: 20
          }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        {/* Dots Indicators Bar */}
        <div style={{
          position: 'absolute', bottom: '1.25rem', right: '2rem',
          display: 'flex', gap: '0.4rem', zIndex: 20
        }}>
          {prideSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: currentIndex === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentIndex === idx ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* INSTITUTIONAL QUICK CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <Shield size={24} style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>🎖 NCC Unit 186 COY</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700 }}>Senior Division Cadre</div>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.6' }}>
            Official SGIT NCC Unit fostering military discipline, drill training, national defense, and State Parade representation.
          </p>
          <Link to="/ncc" className="btn-secondary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.825rem' }}>
            Explore NCC
          </Link>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <Heart size={24} style={{ color: 'var(--accent-gold)' }} />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>🤝 NSS Unit</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700 }}>"Not Me, But You"</div>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.6' }}>
            Community development, voluntary blood donation camps, digital literacy drives, and rural Prakasam service.
          </p>
          <Link to="/nss" className="btn-secondary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.825rem' }}>
            Explore NSS
          </Link>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <BookOpen size={24} style={{ color: 'var(--accent-emerald)' }} />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>📚 Digital Library</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>45,000+ Volumes</div>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.6' }}>
            IEEE journals, digital reading center, quiet research pods, and incubation labs across campus.
          </p>
          <span className="badge badge-emerald">Research Hub</span>
        </div>
      </div>
    </div>
  );
};

export default SGITPridePage;
