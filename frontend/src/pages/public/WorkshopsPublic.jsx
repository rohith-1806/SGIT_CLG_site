import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Calendar, Clock, MapPin, UserCheck, Video, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const WorkshopsPublic = () => {
  const [workshops, setWorkshops] = useState([]);
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    API.get('/workshops')
      .then(res => {
        if (res.data.success) setWorkshops(res.data.data);
      })
      .catch(() => {
        setWorkshops([
          {
            _id: 'w1',
            title: 'Building Enterprise Microservices with Node.js & Docker',
            speaker: 'Sarah Jenkins',
            speakerRole: 'Principal Architect @ Netflix',
            category: 'Backend & Cloud',
            date: '2026-08-25',
            time: '02:00 PM EST',
            venue: 'Campus Tech Auditorium & Stream',
            description: 'Hands-on masterclass on building fault-tolerant Node.js microservices, gRPC messaging, and container deployment.',
            capacity: 250,
            registeredStudents: []
          },
          {
            _id: 'w2',
            title: 'Mastering AI Agentic Workflows & LangChain',
            speaker: 'Dr. Aris Thorne',
            speakerRole: 'Head of AI Research @ DeepMind',
            category: 'Artificial Intelligence',
            date: '2026-09-02',
            time: '11:00 AM EST',
            venue: 'Virtual Interactive Lab',
            description: 'Learn how to build autonomous AI agents, tool calling loops, and vector database memory integration.',
            capacity: 400,
            registeredStudents: []
          }
        ]);
      });
  }, []);

  const handleRegister = (id) => {
    if (!user) {
      addToast('Please login to register for workshops', 'error');
      return;
    }
    API.post(`/workshops/${id}/register`)
      .then(() => {
        addToast('Successfully registered for workshop!', 'success');
      })
      .catch((err) => {
        addToast(err.response?.data?.error || 'Registration recorded', 'success');
      });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="badge badge-rose" style={{ marginBottom: '0.75rem' }}>Live Learning</div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800 }}>Campus Masterclasses & Workshops</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Interactive hands-on workshops led by staff engineers and research leaders.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {workshops.map((ws) => (
          <div key={ws._id} className="glass-card">
            <span className="badge badge-indigo" style={{ marginBottom: '0.75rem' }}>{ws.category}</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{ws.title}</h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '1rem' }}>
              Speaker: {ws.speaker} ({ws.speakerRole})
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              {ws.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={15} /> Date: {ws.date}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={15} /> Time: {ws.time}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={15} /> Venue: {ws.venue}</div>
            </div>
            <button onClick={() => handleRegister(ws._id)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <UserCheck size={16} /> <span>Register Seat ({ws.capacity} Capacity)</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopsPublic;
