import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  FiCode, FiTerminal, FiLayout, FiCpu, FiActivity, 
  FiBarChart, FiCloud, FiShield, FiServer, FiDatabase, 
  FiGitBranch, FiSmartphone, FiHelpCircle, FiMessageSquare, FiCheckCircle
} from 'react-icons/fi';

const SKILL_CATEGORIES = [
  'All', 'Programming', 'Web Development', 'App Development', 'Data Structures', 
  'AI', 'Machine Learning', 'Data Science', 'Cloud', 'Cyber Security', 
  'DevOps', 'Databases', 'Git & GitHub', 'Aptitude', 'Communication', 'Interview Preparation'
];

const StudentSkills = () => {
  const { user, updateUserProfile } = useAuth();
  const { addToast } = useToast();
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const completedSkills = user?.completedSkills || [];

  useEffect(() => {
    API.get('/skills')
      .then(res => { if (res.data.success) setSkills(res.data.data); })
      .catch(() => {});
  }, []);

  const toggleSkillComplete = async (title) => {
    const isDone = completedSkills.includes(title);
    let updated;
    if (isDone) {
      updated = completedSkills.filter(t => t !== title);
      addToast('Skill marked as in-progress', 'info');
    } else {
      updated = [...completedSkills, title];
      addToast('Mastery updated! Skill completed 🎉', 'success');
    }
    updateUserProfile({ completedSkills: updated });
    try {
      await API.put('/auth/update-profile', { completedSkills: updated });
    } catch (e) {}
  };

  const filteredSkills = skills.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesLvl = selectedLevel === 'All' || item.level === selectedLevel;
    return matchesCat && matchesLvl;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '2.5rem' }}>
        <div className="badge badge-red" style={{ marginBottom: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <FiCode size={16} /> SGIT Technical Curriculum
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.5rem' }}>
          Skill Up at SGIT ⚡
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '750px' }}>
          Explore structured engineering skills, beginner to advanced levels, progress tracking, and industry-grade roadmaps.
        </p>
      </div>

      {/* Filters Row */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Level Selector */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Level:</span>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className="btn-secondary"
                style={{
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.8rem',
                  background: selectedLevel === lvl ? 'var(--accent-primary)' : 'var(--bg-card)',
                  color: selectedLevel === lvl ? '#fff' : 'inherit'
                }}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
            {completedSkills.length} of {skills.length || 15} Skills Mastered
          </div>
        </div>

        {/* Category Filter Scroll */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'thin' }}>
          {SKILL_CATEGORIES.map(cat => (
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
      </div>

      {/* Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredSkills.map((item, idx) => {
          const isDone = completedSkills.includes(item.title);

          return (
            <div 
              key={idx} 
              className="glass-card" 
              style={{ 
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                border: isDone ? '1px solid rgba(16,185,129,0.4)' : '1px solid var(--border-color)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span className="badge badge-red" style={{ fontSize: '0.75rem' }}>
                    {item.category}
                  </span>
                  <span className={item.level === 'Advanced' ? 'badge badge-gold' : item.level === 'Intermediate' ? 'badge badge-blue' : 'badge badge-green'} style={{ fontSize: '0.75rem' }}>
                    {item.level}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                  {item.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => toggleSkillComplete(item.title)}
                  className={isDone ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', justifyContent: 'center', gap: '0.4rem', padding: '0.5rem', fontSize: '0.825rem' }}
                >
                  <FiCheckCircle size={16} />
                  <span>{isDone ? 'Completed Master' : 'Mark Completed'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentSkills;
