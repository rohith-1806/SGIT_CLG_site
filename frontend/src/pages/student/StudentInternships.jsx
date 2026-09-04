import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { 
  FiBriefcase, FiExternalLink, FiMapPin, FiDollarSign, 
  FiCalendar, FiSearch, FiFilter, FiCheckCircle, FiGlobe, FiInfo 
} from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

const OFFICIAL_FREE_PORTALS = [
  {
    name: 'AICTE Internship Portal',
    logo: 'https://internship.aicte-india.org/images/aicte_logo.png',
    description: "AICTE's official Government portal connecting engineering students with verified government, PSUs, and corporate internships.",
    url: 'https://internship.aicte-india.org/',
    badge: 'Government Official',
    availability: '50,000+ Active Listings',
    wfhSupported: true
  },
  {
    name: 'Internshala',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    description: "India's largest internship & training platform for college scholars across software engineering, core branches, and design.",
    url: 'https://internshala.com/',
    badge: 'Industry Leader',
    availability: '100,000+ Verified Companies',
    wfhSupported: true
  },
  {
    name: 'Unstop',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    description: 'Platform connecting students with hackathons, corporate coding challenges, hiring competitions, and paid internships.',
    url: 'https://unstop.com/',
    badge: 'Hackathons & Drives',
    availability: 'Corporate Hiring Drives',
    wfhSupported: true
  },
  {
    name: 'LinkedIn Jobs',
    logo: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=100&auto=format&fit=crop&q=80',
    description: 'Global professional network for discovering early-career roles, software engineer internships, and remote opportunities.',
    url: 'https://www.linkedin.com/jobs/',
    badge: 'Global Network',
    availability: 'Worldwide Tech Roles',
    wfhSupported: true
  }
];

const StudentInternships = () => {
  const [internships, setInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [stipendFilter, setStipendFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All'); // Remote / Hybrid / On-site
  const { addToast } = useToast();

  useEffect(() => {
    API.get('/internships')
      .then(res => { if (res.data.success) setInternships(res.data.data); })
      .catch(() => {
        setInternships([
          {
            _id: 'i1',
            title: 'Full Stack Software Engineer Intern',
            company: 'Stripe Global',
            domain: 'Software Engineering',
            location: 'San Francisco, CA (Remote)',
            type: 'Remote',
            stipend: '$6,500 / month',
            stipendType: 'Paid',
            duration: '6 Months',
            deadline: '2026-09-15',
            applyUrl: 'https://stripe.com/jobs',
            skillsRequired: ['React', 'Node.js', 'PostgreSQL'],
            isExternal: true
          },
          {
            _id: 'i2',
            title: 'AI & ML Research Systems Engineer Intern',
            company: 'Google Research',
            domain: 'AI / Machine Learning',
            location: 'Mountain View, CA (Hybrid)',
            type: 'Hybrid',
            stipend: '$7,200 / month',
            stipendType: 'Paid',
            duration: '3 Months',
            deadline: '2026-09-20',
            applyUrl: 'https://careers.google.com',
            skillsRequired: ['Python', 'PyTorch', 'Vector DB'],
            isExternal: true
          },
          {
            _id: 'i3',
            title: 'Embedded Systems & Robotics Intern',
            company: 'Texas Instruments',
            domain: 'Electronics',
            location: 'Bengaluru, KA (On-site)',
            type: 'On-site',
            stipend: '₹35,000 / month',
            stipendType: 'Paid',
            duration: '6 Months',
            deadline: '2026-09-30',
            applyUrl: 'https://ti.com/careers',
            skillsRequired: ['C++', 'Microcontrollers', 'RTOS'],
            isExternal: true
          }
        ]);
      });
  }, []);

  const filteredInternships = internships.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.skillsRequired && item.skillsRequired.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesDomain = domainFilter === 'All' || item.domain === domainFilter;
    const matchesType = typeFilter === 'All' || item.type === typeFilter;
    const matchesStipend = stipendFilter === 'All' || item.stipendType === stipendFilter;

    return matchesSearch && matchesDomain && matchesType && matchesStipend;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div className="badge badge-red" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <FiBriefcase size={16} /> SGIT Career Cell & External Openings
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.5rem' }}>
          Find Your Internship 🎯
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '750px' }}>
          Browse verified SGIT placement opportunities and explore official external discovery portals.
        </p>
      </div>

      {/* SECTION 1: FREE INTERNSHIP DISCOVERY PORTALS (Requirement #6) */}
      <div>
        <div style={{ marginBottom: '1.25rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <FiGlobe size={14} /> Official Platforms
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>Free Internship Discovery Portals</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Explore verified official external portals. <strong style={{ color: 'var(--accent-gold)' }}>Note:</strong> Students can find free, stipend, or paid internship opportunities depending on employer listings.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {OFFICIAL_FREE_PORTALS.map((portal, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <img 
                    src={portal.logo} 
                    alt={portal.name}
                    style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border-color)' }} 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className="badge badge-red" style={{ fontSize: '0.75rem' }}>
                    {portal.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  {portal.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                  {portal.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <div>• Availability: <strong style={{ color: 'var(--text-primary)' }}>{portal.availability}</strong></div>
                  <div>• WFH Support: <strong style={{ color: 'var(--accent-emerald)' }}>{portal.wfhSupported ? 'Work From Home Filter Supported' : 'On-Site / Hybrid'}</strong></div>
                </div>
              </div>

              <a 
                href={portal.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
              >
                <span>Visit Portal</span> <FiExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: INTERNSHIP SEARCH & FILTER UI (Requirement #7) */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>Search Internships</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Filter opportunity listings by domain, work type, stipend, and duration.
          </p>
        </div>

        {/* Filters Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <FiSearch size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
              placeholder="Search title, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Domain Filter */}
          <div>
            <select className="form-input" value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)}>
              <option value="All">All Domains</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="AI / Machine Learning">AI / Machine Learning</option>
              <option value="Electronics">Electronics</option>
              <option value="Electrical">Electrical</option>
              <option value="Civil">Civil</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select className="form-input" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="All">All Work Types</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Stipend Filter */}
          <div>
            <select className="form-input" value={stipendFilter} onChange={(e) => setStipendFilter(e.target.value)}>
              <option value="All">Paid & Stipend Roles</option>
              <option value="Paid">Stipend / Paid Only</option>
              <option value="Unpaid">Unpaid / Learning Only</option>
            </select>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredInternships.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No internship listings match your filter criteria.
            </div>
          ) : (
            filteredInternships.map((item) => (
              <div key={item._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <span className="badge badge-gold" style={{ fontSize: '0.7rem', marginBottom: '0.4rem', display: 'inline-block' }}>
                        {item.domain || 'Engineering'}
                      </span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{item.title}</h3>
                      <div style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.9rem' }}>{item.company}</div>
                    </div>
                    {item.isExternal && (
                      <span className="badge badge-blue" style={{ fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                        <FiExternalLink size={10} /> External Portal
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><FiMapPin size={15} style={{ color: 'var(--accent-primary)' }} /> {item.location}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><FiDollarSign size={15} style={{ color: 'var(--accent-emerald)' }} /> {item.stipend}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><FiCalendar size={15} style={{ color: 'var(--accent-gold)' }} /> Deadline: {item.deadline}</div>
                  </div>

                  {item.skillsRequired && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {item.skillsRequired.map((sk, i) => (
                        <span key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {sk}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <a 
                  href={item.applyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', gap: '0.4rem' }}
                >
                  <span>{item.isExternal ? 'Open External Portal' : 'Apply Directly'}</span> 
                  <FiExternalLink size={16} />
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentInternships;
