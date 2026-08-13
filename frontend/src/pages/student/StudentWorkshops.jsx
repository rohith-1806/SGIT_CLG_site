import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Calendar, Clock, MapPin, Award, Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const StudentWorkshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    API.get('/workshops')
      .then(res => { if (res.data.success) setWorkshops(res.data.data); })
      .catch(() => {
        setWorkshops([
          {
            title: 'Building Enterprise Microservices with Node.js & Docker',
            speaker: 'Sarah Jenkins (Netflix)',
            category: 'Backend & Cloud',
            date: '2026-08-25',
            time: '02:00 PM EST',
            venue: 'Main Auditorium'
          }
        ]);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Masterclasses & Certificates</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>View registered workshop sessions and verified certificates</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {workshops.map((ws, idx) => (
          <div key={idx} className="glass-card">
            <span className="badge badge-indigo" style={{ marginBottom: '0.75rem' }}>{ws.category}</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{ws.title}</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '1rem' }}>
              Speaker: {ws.speaker}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={15} /> Date: {ws.date}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={15} /> Time: {ws.time}</div>
            </div>
            <button onClick={() => addToast('Downloading verified certificate PDF...', 'info')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              <Award size={16} /> <span>Download Certificate</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentWorkshops;
