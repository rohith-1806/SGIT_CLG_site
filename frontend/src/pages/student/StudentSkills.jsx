import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Code, Video, Play } from 'lucide-react';

const StudentSkills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    API.get('/skills')
      .then(res => { if (res.data.success) setSkills(res.data.data); })
      .catch(() => {
        setSkills([
          {
            title: 'Full Stack Web Development',
            category: 'Web Engineering',
            level: 'Advanced',
            description: 'Comprehensive mastery of HTML5, CSS Glassmorphism, React, Node.js, Express, and MongoDB.',
            roadmapSteps: [
              { stepNumber: 1, title: 'HTML5, CSS Modern Design & JS ES6+', details: 'Master DOM manipulation, flexbox/grid layouts, async/await.' },
              { stepNumber: 2, title: 'React 18 & Frontend Architecture', details: 'Hooks, State Management, Custom components, Performance optimization.' }
            ],
            youtubeVideos: [
              { title: 'Full Stack MERN Architecture Crash Course 2026', url: 'https://youtube.com', channel: 'TechLead Academy', duration: '2h 45m' }
            ]
          }
        ]);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Technical Skill Roadmaps</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Track technical learning steps & recommended video lectures</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {skills.map((skill, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-indigo">{skill.category}</span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '0.5rem' }}>{skill.title}</h2>
              </div>
              <span className="badge badge-emerald">{skill.level}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{skill.description}</p>

            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Roadmap Steps</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {skill.roadmapSteps && skill.roadmapSteps.map((step) => (
                <div key={step.stepNumber} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--accent-primary)', fontSize: '0.8rem' }}>Step {step.stepNumber}</div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.9rem', margin: '0.2rem 0' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{step.details}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSkills;
