import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Briefcase, MapPin, DollarSign, Calendar, ExternalLink, Filter } from 'lucide-react';

const InternshipsPublic = () => {
  const [internships, setInternships] = useState([]);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    API.get('/internships')
      .then(res => {
        if (res.data.success) setInternships(res.data.data);
      })
      .catch(() => {
        setInternships([
          {
            title: 'Full Stack Software Engineer Intern',
            company: 'Stripe Global',
            location: 'San Francisco, CA (Remote)',
            type: 'Remote',
            stipend: '$6,500 / month',
            duration: '6 Months',
            eligibility: 'B.Tech / BS CS (Final Year)',
            deadline: '2026-09-15',
            applyUrl: 'https://stripe.com/jobs',
            description: 'Work alongside core infrastructure team building scalable payment APIs.',
            skillsRequired: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
            companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80'
          },
          {
            title: 'AI & ML Engineer Intern',
            company: 'Google Research',
            location: 'Mountain View, CA (Hybrid)',
            type: 'Hybrid',
            stipend: '$7,200 / month',
            duration: '3 Months',
            eligibility: 'B.Tech / M.Tech AI',
            deadline: '2026-09-20',
            applyUrl: 'https://careers.google.com',
            description: 'Fine-tune Large Language Models and vector embeddings.',
            skillsRequired: ['Python', 'PyTorch', 'Transformers', 'Vector DB'],
            companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80'
          }
        ]);
      });
  }, []);

  const filtered = filterType === 'All' ? internships : internships.filter(i => i.type === filterType);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '0.75rem' }}>Career Opportunities</div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800 }}>Campus Internship Hub</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Apply directly for exclusive verified industry internships.</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
        {['All', 'Remote', 'Hybrid', 'On-Site'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={filterType === type ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
          >
            {type}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {filtered.map((item, idx) => (
          <div key={idx} className="glass-card">
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <img src={item.companyLogo} alt={item.company} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{item.title}</h3>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.85rem' }}>{item.company}</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {item.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={15} /> {item.location}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><DollarSign size={15} /> {item.stipend}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={15} /> Deadline: {item.deadline}</div>
            </div>
            <a href={item.applyUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <span>Apply Directly</span> <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipsPublic;
