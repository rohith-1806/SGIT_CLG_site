import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Briefcase, ExternalLink, MapPin, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const StudentInternships = () => {
  const [internships, setInternships] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    API.get('/internships')
      .then(res => { if (res.data.success) setInternships(res.data.data); })
      .catch(() => {
        setInternships([
          {
            title: 'Full Stack Software Engineer Intern',
            company: 'Stripe Global',
            location: 'San Francisco, CA (Remote)',
            stipend: '$6,500 / month',
            deadline: '2026-09-15',
            applyUrl: 'https://stripe.com/jobs',
            status: 'Active'
          },
          {
            title: 'AI & ML Engineer Intern',
            company: 'Google Research',
            location: 'Mountain View, CA (Hybrid)',
            stipend: '$7,200 / month',
            deadline: '2026-09-20',
            applyUrl: 'https://careers.google.com',
            status: 'Active'
          }
        ]);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Campus Internship Portal</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Track verified campus internship listings & applications</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {internships.map((item, idx) => (
          <div key={idx} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{item.title}</h3>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.85rem' }}>{item.company}</div>
              </div>
              <span className="badge badge-emerald">{item.status}</span>
            </div>
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

export default StudentInternships;
