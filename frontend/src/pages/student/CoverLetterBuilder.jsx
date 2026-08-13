import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Sparkles, Download, BookOpen, Copy } from 'lucide-react';

const CoverLetterBuilder = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [jobTitle, setJobTitle] = useState('Full Stack Software Engineer');
  const [companyName, setCompanyName] = useState('Stripe');
  const [loading, setLoading] = useState(false);

  const [letterContent, setLetterContent] = useState(`Dear Hiring Team at Stripe,

I am writing to express my strong enthusiasm for the Full Stack Software Engineer position. As a Computer Science scholar at Aura College with extensive hands-on experience building high-throughput MERN applications, distributed APIs, and AI tools, I am eager to contribute to Stripe's payment infrastructure.

During my academic tenure, I engineered scalable microservices that reduced database latency by 35% and built modern React glassmorphism design systems. My background in full stack development, combined with my passion for code quality and user experience, aligns perfectly with Stripe's engineering values.

Thank you for your time and consideration. I welcome the opportunity to discuss how my technical skills can drive value for your team.

Sincerely,
${user ? user.name : 'Alex Johnson'}`);

  const handleGenerateAI = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLetterContent(`Dear Hiring Manager at ${companyName},

I am thrilled to submit my application for the ${jobTitle} role. Having followed ${companyName}'s technological breakthroughs in modern cloud systems, I am eager to bring my engineering background from Aura College to your development team.

I bring proven expertise in React, Node.js, Express, MongoDB, and AI system design. My project portfolio highlights my capacity to take complex ideas from architectural design to deployment.

I look forward to discussing how my software engineering expertise matches the vision of ${companyName}.

Best regards,
${user ? user.name : 'Alex Johnson'}`);
      addToast('AI Cover Letter Generated Successfully!', 'success');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>AI Cover Letter Generator</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Tailor compelling cover letters for specific job applications</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => { navigator.clipboard.writeText(letterContent); addToast('Copied to clipboard!', 'success'); }} className="btn-secondary">
            <Copy size={18} /> <span>Copy</span>
          </button>
          <button onClick={() => { window.print(); }} className="btn-primary">
            <Download size={18} /> <span>Download PDF</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Target Position</h3>
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              className="form-input"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-input"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <button onClick={handleGenerateAI} disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            <Sparkles size={18} /> <span>{loading ? 'AI Writing...' : 'Re-Generate with AI'}</span>
          </button>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <textarea
            rows={15}
            className="form-input"
            style={{ width: '100%', lineHeight: '1.7', fontFamily: 'inherit', fontSize: '0.95rem' }}
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CoverLetterBuilder;
