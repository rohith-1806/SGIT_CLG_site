import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { FolderGit2, Star, ExternalLink, Code, Layers, Github } from 'lucide-react';

const ProjectsPublic = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get('/projects')
      .then(res => {
        if (res.data.success) setProjects(res.data.data);
      })
      .catch(() => {
        setProjects([
          {
            title: 'AI Autonomous Code Reviewer Platform',
            type: 'Major',
            department: 'Computer Science & Engineering',
            abstract: 'Enterprise platform integrating GitHub webhooks for real-time static code analysis and LLM security audits.',
            techStack: ['React', 'Node.js', 'Python', 'Docker', 'OpenAI'],
            githubUrl: 'https://github.com',
            liveDemoUrl: 'https://vercel.com',
            authorName: 'Alex Johnson',
            stars: 128
          },
          {
            title: 'Decentralized Campus Credential System',
            type: 'Research',
            department: 'Information Technology',
            abstract: 'Blockchain immutable certificate verification mechanism ensuring tamper-proof degree validation.',
            techStack: ['Solidity', 'Ethereum', 'React', 'IPFS'],
            githubUrl: 'https://github.com',
            liveDemoUrl: 'https://vercel.com',
            authorName: 'Elena Rostova',
            stars: 94
          }
        ]);
      });
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>Student Innovation</div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800 }}>Campus Project Repository</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Showcasing major, minor, mini and research projects engineered by campus scholars.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {projects.map((proj, idx) => (
          <div key={idx} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="badge badge-indigo">{proj.type} Project</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-amber)', fontSize: '0.85rem', fontWeight: 700 }}>
                <Star size={16} fill="var(--accent-amber)" /> {proj.stars}
              </div>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{proj.title}</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '1rem' }}>
              {proj.department} • Author: {proj.authorName}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              {proj.abstract}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {proj.techStack && proj.techStack.map((tech, i) => (
                <span key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                  {tech}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}>
                <Github size={16} /> Code
              </a>
              <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}>
                <ExternalLink size={16} /> Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPublic;
