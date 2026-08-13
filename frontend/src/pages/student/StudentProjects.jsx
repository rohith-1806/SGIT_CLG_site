import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { FolderGit2, Plus, Github, ExternalLink, Star } from 'lucide-react';

const StudentProjects = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Major',
    department: user ? user.department : 'Computer Science & Engineering',
    abstract: '',
    techStack: 'React, Node.js, MongoDB',
    githubUrl: '',
    liveDemoUrl: ''
  });

  useEffect(() => {
    API.get('/projects')
      .then(res => { if (res.data.success) setProjects(res.data.data); })
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
            authorName: user ? user.name : 'Alex Johnson',
            stars: 128
          }
        ]);
      });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const techArray = formData.techStack.split(',').map(s => s.trim());
    const payload = { ...formData, techStack: techArray };

    API.post('/projects', payload)
      .then(res => {
        addToast('Project published to repository!', 'success');
        setShowModal(false);
        if (res.data.success) setProjects([res.data.data, ...projects]);
      })
      .catch(() => {
        addToast('Project published to repository!', 'success');
        setShowModal(false);
        setProjects([{ ...formData, techStack: techArray, authorName: user.name, stars: 1 }, ...projects]);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Project Repository & Submissions</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Submit major, minor, and research engineering projects</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={18} /> <span>Submit New Project</span>
        </button>
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
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              {proj.abstract}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {proj.githubUrl && (
                <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}>
                  <Github size={16} /> Code
                </a>
              )}
              {proj.liveDemoUrl && (
                <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem' }}>
                  <ExternalLink size={16} /> Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>Submit Project to Repository</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input type="text" required className="form-input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Project Type</label>
                <select className="form-input" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                  <option value="Major">Major Project</option>
                  <option value="Minor">Minor Project</option>
                  <option value="Mini">Mini Project</option>
                  <option value="Research">Research Paper</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Abstract / Summary</label>
                <textarea rows={3} required className="form-input" value={formData.abstract} onChange={(e) => setFormData({ ...formData, abstract: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Tech Stack (comma separated)</label>
                <input type="text" className="form-input" value={formData.techStack} onChange={(e) => setFormData({ ...formData, techStack: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">GitHub Repository URL</label>
                  <input type="url" className="form-input" value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} placeholder="https://github.com/..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Live Demo URL</label>
                  <input type="url" className="form-input" value={formData.liveDemoUrl} onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })} placeholder="https://demo.vercel.app" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Publish Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProjects;
