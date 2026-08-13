import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Download, FileCode, BookOpen, Award } from 'lucide-react';

const CVBuilder = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [cvData, setCvData] = useState({
    fullName: user ? user.name : 'Dr. Alex Johnson',
    title: 'Research Fellow & Academic Scholar',
    publications: '1. "Optimizing Vector Embeddings in Multi-Modal LLMs" - IEEE AI Conference 2025.',
    honors: 'Presidential Gold Medal for Excellence in Computer Engineering (2025)',
    researchInterests: 'Distributed Systems, Autonomous AI Agents, Machine Learning Security'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Academic CV Builder</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Build comprehensive research & fellowship CV documents</p>
        </div>
        <button onClick={() => { window.print(); addToast('Opening CV Print Dialog...', 'info'); }} className="btn-primary">
          <Download size={18} /> <span>Export Academic CV</span>
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div className="form-group">
          <label className="form-label">Full Academic Title</label>
          <input
            type="text"
            className="form-input"
            value={cvData.title}
            onChange={(e) => setCvData({ ...cvData, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Research Interests</label>
          <input
            type="text"
            className="form-input"
            value={cvData.researchInterests}
            onChange={(e) => setCvData({ ...cvData, researchInterests: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Publications & Papers</label>
          <textarea
            rows={3}
            className="form-input"
            value={cvData.publications}
            onChange={(e) => setCvData({ ...cvData, publications: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Academic Honors & Awards</label>
          <textarea
            rows={2}
            className="form-input"
            value={cvData.honors}
            onChange={(e) => setCvData({ ...cvData, honors: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
