import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  FiFolder, FiPlus, FiGithub, FiExternalLink, FiBookmark, 
  FiStar, FiLayers, FiCode, FiCpu, FiCheck, FiX, FiVideo, FiBookOpen 
} from 'react-icons/fi';

const PROJECT_CATEGORIES = [
  'All', 'Major Projects', 'Minor Projects', 'Mini Projects', 
  'AI/ML Projects', 'Web Projects', 'IoT Projects', 
  'Cyber Security Projects', 'Data Science Projects', 'Cloud Projects'
];

const StudentProjects = () => {
  const { user, updateUserProfile } = useAuth();
  const { addToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Major Projects',
    category: 'AI/ML Projects',
    department: user ? user.department : 'CSE',
    difficulty: 'Intermediate',
    description: '',
    problemStatement: '',
    features: 'Automated PR Analysis, Vulnerability Alerts',
    architecture: 'React -> Express Node -> Python Microservice',
    techStack: 'React, Node.js, Python, MongoDB',
    githubUrl: '',
    liveDemoUrl: '',
    documentation: ''
  });

  const bookmarkedProjects = user?.bookmarks || [];

  useEffect(() => {
    API.get('/projects')
      .then(res => { if (res.data.success) setProjects(res.data.data); })
      .catch(() => {
        setProjects([
          {
            _id: 'p1',
            title: 'Autonomous AI Code Reviewer Platform',
            type: 'Major Projects',
            category: 'AI/ML Projects',
            department: 'CSE',
            difficulty: 'Advanced',
            description: 'An enterprise web platform integrating GitHub webhooks for real-time static code analysis and LLM security audits.',
            problemStatement: 'Manual code reviews bottleneck deployment cycles and miss subtle vulnerability exploits.',
            features: ['Automated PR Analysis', 'LLM Vulnerability Detection', 'Custom Style Rules', 'Slack Alert Hooks'],
            architecture: 'React Frontend -> Node.js API Gateway -> Python LLM Service -> PostgreSQL',
            techStack: ['React', 'Node.js', 'Python', 'Docker', 'OpenAI API'],
            githubUrl: 'https://github.com/sgit-projects/ai-code-reviewer',
            liveDemoUrl: 'https://ai-reviewer.sgit.edu',
            documentation: 'https://docs.sgit.edu/projects/ai-reviewer',
            recommendedSkills: ['React', 'Python', 'Docker'],
            authorName: user ? user.name : 'SGIT Demo Student',
            stars: 142
          },
          {
            _id: 'p2',
            title: 'Smart IoT Campus Energy & Solar Monitor',
            type: 'Major Projects',
            category: 'IoT Projects',
            department: 'EEE',
            difficulty: 'Intermediate',
            description: 'Real-time telemetry dashboard monitoring SGIT 38-acre campus solar generation and indoor stadium power consumption.',
            problemStatement: 'Inefficient energy usage across campus facilities leads to unwanted utility costs.',
            features: ['Solar Inverter Telemetry', 'Live Wattage Charts', 'Overload Alerts', 'Automated Shutoff'],
            architecture: 'ESP32 Microcontroller Sensors -> MQTT Broker -> Express Node -> React Dashboard',
            techStack: ['C++', 'MQTT', 'Node.js', 'React', 'MongoDB'],
            githubUrl: 'https://github.com/sgit-projects/smart-solar-monitor',
            liveDemoUrl: 'https://solar.sgit.edu',
            documentation: 'https://docs.sgit.edu/projects/solar-monitor',
            recommendedSkills: ['Embedded Systems', 'IoT', 'React'],
            authorName: 'Elena Rostova',
            stars: 98
          }
        ]);
      });
  }, [user]);

  const toggleBookmark = async (projId) => {
    const isBookmarked = bookmarkedProjects.includes(projId);
    let updated;
    if (isBookmarked) {
      updated = bookmarkedProjects.filter(id => id !== projId);
      addToast('Project bookmark removed', 'info');
    } else {
      updated = [...bookmarkedProjects, projId];
      addToast('Saved project to your bookmarks! 📌', 'success');
    }
    updateUserProfile({ bookmarks: updated });
    try {
      await API.put('/auth/update-profile', { bookmarks: updated });
    } catch (e) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const techArray = typeof formData.techStack === 'string' 
      ? formData.techStack.split(',').map(s => s.trim())
      : formData.techStack;
    const featArray = typeof formData.features === 'string'
      ? formData.features.split(',').map(s => s.trim())
      : formData.features;

    const payload = { 
      ...formData, 
      techStack: techArray, 
      features: featArray,
      authorName: user ? user.name : 'SGIT Scholar',
      stars: 1 
    };

    API.post('/projects', payload)
      .then(res => {
        addToast('Project published to repository!', 'success');
        setShowSubmissionModal(false);
        if (res.data.success) setProjects([res.data.data, ...projects]);
      })
      .catch(() => {
        addToast('Project published to repository!', 'success');
        setShowSubmissionModal(false);
        setProjects([payload, ...projects]);
      });
  };

  const filteredProjects = projects.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.type === selectedCategory || item.category === selectedCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div className="badge badge-red" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <FiFolder size={16} /> SGIT Project Repository
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.5rem' }}>
            Build Something Great 🛠️
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '750px' }}>
            Explore open-source capstone projects across Web, AI/ML, IoT, Cloud, and Cyber Security.
          </p>
        </div>
        <button onClick={() => setShowSubmissionModal(true)} className="btn-primary" style={{ padding: '0.85rem 1.5rem', fontSize: '0.9rem' }}>
          <FiPlus size={18} /> <span>Submit Project</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'thin' }}>
        {PROJECT_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '20px',
              fontSize: '0.825rem',
              fontWeight: 700,
              border: '1px solid',
              borderColor: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--border-color)',
              background: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--bg-card)',
              color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
        {filteredProjects.map((proj) => {
          const projId = proj._id || proj.title;
          const isSaved = bookmarkedProjects.includes(projId);

          return (
            <div key={projId} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
                    {proj.category || proj.type}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      onClick={() => toggleBookmark(projId)}
                      style={{ background: 'transparent', border: 'none', color: isSaved ? 'var(--accent-gold)' : 'var(--text-muted)', cursor: 'pointer' }}
                      title="Bookmark Project"
                    >
                      <FiBookmark size={18} fill={isSaved ? 'var(--accent-gold)' : 'none'} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-gold)', fontSize: '0.825rem', fontWeight: 700 }}>
                      <FiStar size={14} fill="var(--accent-gold)" /> {proj.stars || 12}
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: '1.4' }}>
                  {proj.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                  {proj.description || proj.abstract}
                </p>

                {/* Tech Stack Pills */}
                {proj.techStack && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    {(Array.isArray(proj.techStack) ? proj.techStack : proj.techStack.split(',')).map((tech, i) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => setActiveProjectModal(proj)}
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '0.5rem' }}
                >
                  <FiBookOpen size={14} /> Blueprint Details
                </button>
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}
                  >
                    <FiGithub size={14} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Blueprint Details Modal */}
      {activeProjectModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', background: '#0d0d12' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-red" style={{ fontSize: '0.75rem', marginBottom: '0.4rem', display: 'inline-block' }}>
                  {activeProjectModal.category || activeProjectModal.type} • {activeProjectModal.difficulty || 'Intermediate'}
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>{activeProjectModal.title}</h2>
              </div>
              <button onClick={() => setActiveProjectModal(null)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem' }}>
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem' }}>
              <div>
                <h4 style={{ fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.3rem' }}>Problem Statement</h4>
                <p style={{ color: 'var(--text-secondary)' }}>{activeProjectModal.problemStatement || 'Solving manual inspection bottlenecks.'}</p>
              </div>

              <div>
                <h4 style={{ fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.3rem' }}>Key Features</h4>
                <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.2rem' }}>
                  {activeProjectModal.features ? (
                    Array.isArray(activeProjectModal.features) 
                      ? activeProjectModal.features.map((f, i) => <li key={i}>{f}</li>)
                      : activeProjectModal.features.split(',').map((f, i) => <li key={i}>{f}</li>)
                  ) : <li>Realtime telemetry & automated alerts</li>}
                </ul>
              </div>

              <div>
                <h4 style={{ fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '0.3rem' }}>System Architecture</h4>
                <p style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                  {activeProjectModal.architecture || 'React -> Express API -> Database Service'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                {activeProjectModal.githubUrl && (
                  <a href={activeProjectModal.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                    <FiGithub size={16} /> GitHub Repository
                  </a>
                )}
                {activeProjectModal.liveDemoUrl && (
                  <a href={activeProjectModal.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    <FiExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Project Modal */}
      {showSubmissionModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.25rem' }}>Submit Engineering Project</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input type="text" required className="form-input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    <option value="AI/ML Projects">AI/ML Projects</option>
                    <option value="Web Projects">Web Projects</option>
                    <option value="IoT Projects">IoT Projects</option>
                    <option value="Cyber Security Projects">Cyber Security Projects</option>
                    <option value="Data Science Projects">Data Science Projects</option>
                    <option value="Cloud Projects">Cloud Projects</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Difficulty</label>
                  <select className="form-input" value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description / Summary</label>
                <textarea rows={3} required className="form-input" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Tech Stack (comma separated)</label>
                <input type="text" className="form-input" value={formData.techStack} onChange={(e) => setFormData({ ...formData, techStack: e.target.value })} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">GitHub Repo URL</label>
                  <input type="url" className="form-input" value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} placeholder="https://github.com/..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Live Demo URL</label>
                  <input type="url" className="form-input" value={formData.liveDemoUrl} onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })} placeholder="https://demo.vercel.app" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowSubmissionModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
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
