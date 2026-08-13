import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Code, Video, BookOpen, Layers, CheckCircle2, Play } from 'lucide-react';

const ResourcesPublic = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    API.get('/skills')
      .then(res => {
        if (res.data.success) setSkills(res.data.data);
      })
      .catch(() => {
        setSkills([
          {
            title: 'Full Stack Web Development',
            category: 'Web Engineering',
            level: 'Advanced',
            description: 'Comprehensive mastery of HTML5, CSS Glassmorphism, React, Node.js, Express, and MongoDB.',
            roadmapSteps: [
              { stepNumber: 1, title: 'HTML5, CSS Modern Design & JS ES6+', details: 'Master DOM manipulation, flexbox/grid layouts, async/await.' },
              { stepNumber: 2, title: 'React 18 & Frontend Architecture', details: 'Hooks, State Management, Custom components, Performance optimization.' },
              { stepNumber: 3, title: 'Backend REST API & Database', details: 'Express controllers, Mongoose schemas, JWT Auth & RBAC security.' }
            ],
            youtubeVideos: [
              { title: 'Full Stack MERN Architecture Crash Course 2026', url: 'https://youtube.com', channel: 'TechLead Academy', duration: '2h 45m' }
            ]
          }
        ]);
      });
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>Learning Hub</div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800 }}>Technical Skill Roadmaps & Videos</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Curated step-by-step career path guides and video lectures.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {skills.map((skill, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-indigo">{skill.category}</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.5rem' }}>{skill.title}</h2>
              </div>
              <span className="badge badge-emerald">{skill.level}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{skill.description}</p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Roadmap Steps</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {skill.roadmapSteps && skill.roadmapSteps.map((step) => (
                <div key={step.stepNumber} style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 800, color: 'var(--accent-primary)', fontSize: '0.85rem' }}>Step {step.stepNumber}</div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem', margin: '0.25rem 0' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{step.details}</p>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Recommended Video Lectures</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {skill.youtubeVideos && skill.youtubeVideos.map((vid, vIdx) => (
                <a key={vIdx} href={vid.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ background: 'rgba(244, 63, 94, 0.15)', color: 'var(--accent-rose)', padding: '0.6rem', borderRadius: '10px' }}>
                      <Play size={20} fill="var(--accent-rose)" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{vid.title}</h4>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{vid.channel} • {vid.duration}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPublic;
