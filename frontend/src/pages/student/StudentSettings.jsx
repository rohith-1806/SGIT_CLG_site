import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSettings, FiSun, FiMoon, FiMonitor, FiShield, FiLock, FiBell } from 'react-icons/fi';

const StudentSettings = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div className="badge badge-red" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <FiSettings size={16} /> Portal Preferences
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Account & Theme Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Customize theme modes, notifications, and security options.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Appearance Mode</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => changeTheme('light')} 
            className="btn-secondary" 
            style={{ padding: '0.75rem 1.25rem', background: theme === 'light' ? 'var(--accent-primary)' : 'var(--bg-card)', color: theme === 'light' ? '#fff' : 'inherit' }}
          >
            <FiSun size={18} /> <span>Light Mode</span>
          </button>
          <button 
            onClick={() => changeTheme('dark')} 
            className="btn-secondary" 
            style={{ padding: '0.75rem 1.25rem', background: theme === 'dark' ? 'var(--accent-primary)' : 'var(--bg-card)', color: theme === 'dark' ? '#fff' : 'inherit' }}
          >
            <FiMoon size={18} /> <span>Dark Mode</span>
          </button>
          <button 
            onClick={() => changeTheme('system')} 
            className="btn-secondary" 
            style={{ padding: '0.75rem 1.25rem', background: theme === 'system' ? 'var(--accent-primary)' : 'var(--bg-card)', color: theme === 'system' ? '#fff' : 'inherit' }}
          >
            <FiMonitor size={18} /> <span>System Auto</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;
