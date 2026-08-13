import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Download, Plus, Trash2, Sparkles, Check, Layout, FileText } from 'lucide-react';

const ResumeBuilder = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [template, setTemplate] = useState('modern-glass');

  const [resumeData, setResumeData] = useState({
    title: 'Senior Software Engineer Resume',
    personalInfo: {
      fullName: user ? user.name : 'Alex Johnson',
      email: user ? user.email : 'alex@college.edu',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      title: 'Full Stack Software Engineer',
      summary: 'Passionate computer science scholar with experience building high-throughput MERN applications, AI microservices, and modern UI design systems.',
      linkedin: 'linkedin.com/in/alexjohnson',
      github: 'github.com/alexjohnson'
    },
    education: [
      { institution: 'Aura College of Technology', degree: 'B.Tech in Computer Science', startDate: '2022', endDate: '2026', gpa: '3.92 / 4.0' }
    ],
    experience: [
      { company: 'TechFlow Labs', position: 'Software Engineer Intern', startDate: 'Jun 2025', endDate: 'Aug 2025', highlights: 'Engineered REST API microservices reducing database response latencies by 35%.' }
    ],
    projects: [
      { name: 'AI Code Reviewer', description: 'Real-time static code analysis and security vulnerability detector.', tech: 'React, Node.js, Python, OpenAI' }
    ],
    skills: 'React, Node.js, Express, MongoDB, TypeScript, Python, Docker, Git, REST APIs'
  });

  const handlePrintDownload = () => {
    window.print();
    addToast('Opening print dialog for PDF export...', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Header Controls */}
      <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Resume & CV Builder</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Craft ATS-optimized vector resumes with live preview</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select
            className="form-input"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            style={{ padding: '0.5rem 1rem' }}
          >
            <option value="modern-glass">Modern Glassmorphism</option>
            <option value="executive">Executive Classic</option>
            <option value="minimalist">Minimalist Tech</option>
          </select>
          <button onClick={handlePrintDownload} className="btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
            <Download size={18} /> <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Split */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {/* Form Inputs */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Personal Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, fullName: e.target.value } })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                className="form-input"
                value={resumeData.personalInfo.title}
                onChange={(e) => setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, title: e.target.value } })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={resumeData.personalInfo.email}
                onChange={(e) => setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, email: e.target.value } })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-input"
                value={resumeData.personalInfo.phone}
                onChange={(e) => setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, phone: e.target.value } })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Professional Summary</label>
            <textarea
              rows={3}
              className="form-input"
              value={resumeData.personalInfo.summary}
              onChange={(e) => setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, summary: e.target.value } })}
            />
          </div>

          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Technical Skills</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              value={resumeData.skills}
              onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
            />
          </div>
        </div>

        {/* Live Formatted Paper Preview */}
        <div style={{
          background: '#ffffff',
          color: '#1e293b',
          borderRadius: '16px',
          padding: '3rem 2.5rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          fontFamily: 'Inter, sans-serif'
        }} id="resume-document">
          <div style={{ borderBottom: '2px solid #6366f1', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{resumeData.personalInfo.fullName}</h1>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#6366f1', marginTop: '0.25rem' }}>{resumeData.personalInfo.title}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span>{resumeData.personalInfo.email}</span> • 
              <span>{resumeData.personalInfo.phone}</span> • 
              <span>{resumeData.personalInfo.location}</span>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Professional Summary
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>{resumeData.personalInfo.summary}</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Education
            </h3>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem' }}>
                  <span>{edu.institution}</span>
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569' }}>{edu.degree} • GPA: {edu.gpa}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Experience
            </h3>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem' }}>
                  <span>{exp.position} @ {exp.company}</span>
                  <span>{exp.startDate} - {exp.endDate}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '0.25rem' }}>{exp.highlights}</div>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Technical Skills
            </h3>
            <div style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 500 }}>{resumeData.skills}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
