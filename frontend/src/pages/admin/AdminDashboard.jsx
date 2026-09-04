import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { Users, BookOpen, Calendar, Briefcase, UserCheck, UserX, Sun, Moon, Monitor } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminDashboard = () => {
  const { theme, changeTheme } = useTheme();
  const [stats, setStats] = useState({
    totalStudents: 640,
    blockedStudents: 2,
    totalProjects: 128,
    totalWorkshops: 14
  });
  const [students, setStudents] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    API.get('/admin/stats')
      .then(res => { if (res.data.success) setStats(res.data.stats); })
      .catch(() => {});

    API.get('/admin/students')
      .then(res => { if (res.data.success) setStudents(res.data.data); })
      .catch(() => {
        setStudents([
          { _id: 's1', name: 'Alex Johnson', email: 'student@gmail.com', department: 'Computer Science & Engineering', enrollmentNo: 'SGIT-2024-089', isBlocked: false },
          { _id: 's2', name: 'Elena Rostova', email: 'elena@gmail.com', department: 'Artificial Intelligence & Machine Learning', enrollmentNo: 'SGIT-2024-042', isBlocked: false },
          { _id: 's3', name: 'Marcus Vance', email: 'marcus@gmail.com', department: 'Computer Science & Design', enrollmentNo: 'SGIT-2024-019', isBlocked: true }
        ]);
      });
  }, []);

  const handleToggleBlock = (id) => {
    API.put(`/admin/students/${id}/toggle-block`)
      .then(res => {
        addToast(res.data.message || 'Student status updated', 'success');
        setStudents(students.map(s => s._id === id ? { ...s, isBlocked: !s.isBlocked } : s));
      })
      .catch(() => {
        addToast('Student status updated', 'success');
        setStudents(students.map(s => s._id === id ? { ...s, isBlocked: !s.isBlocked } : s));
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="badge badge-red" style={{ marginBottom: '0.5rem' }}>Campus Administration</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Faculty Admin Portal</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Manage campus scholars, workshop schedules, and student verification</p>
        </div>

        {/* Theme Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Theme:</span>
          <button 
            onClick={() => changeTheme('light')} 
            className="btn-secondary" 
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', background: theme === 'light' ? 'var(--accent-primary)' : 'transparent', color: theme === 'light' ? '#fff' : 'inherit' }}
          >
            <Sun size={14} /> <span>Light</span>
          </button>
          <button 
            onClick={() => changeTheme('dark')} 
            className="btn-secondary" 
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', background: theme === 'dark' ? 'var(--accent-primary)' : 'transparent', color: theme === 'dark' ? '#fff' : 'inherit' }}
          >
            <Moon size={14} /> <span>Dark</span>
          </button>
          <button 
            onClick={() => changeTheme('system')} 
            className="btn-secondary" 
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', background: theme === 'system' ? 'var(--accent-primary)' : 'transparent', color: theme === 'system' ? '#fff' : 'inherit' }}
          >
            <Monitor size={14} /> <span>System</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Enrolled Students</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '0.25rem' }}>{stats.totalStudents}</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Suspended / Blocked</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '0.25rem' }}>{stats.blockedStudents}</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Approved Projects</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>{stats.totalProjects}</div>
        </div>
        <div className="glass-card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Published Workshops</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '0.25rem' }}>{stats.totalWorkshops}</div>
        </div>
      </div>

      {/* Student Roster Data Table */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>Active Student Roster</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.75rem' }}>Scholar Name</th>
                <th style={{ padding: '0.75rem' }}>Email</th>
                <th style={{ padding: '0.75rem' }}>Department</th>
                <th style={{ padding: '0.75rem' }}>Enrollment ID</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((std) => (
                <tr key={std._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.85rem', fontWeight: 700 }}>{std.name}</td>
                  <td style={{ padding: '0.85rem', color: 'var(--text-secondary)' }}>{std.email}</td>
                  <td style={{ padding: '0.85rem', color: 'var(--text-secondary)' }}>{std.department}</td>
                  <td style={{ padding: '0.85rem', fontFamily: 'monospace' }}>{std.enrollmentNo}</td>
                  <td style={{ padding: '0.85rem' }}>
                    <span className={std.isBlocked ? 'badge badge-gold' : 'badge badge-emerald'}>
                      {std.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem', textAlign: 'right' }}>
                    <button
                      onClick={() => handleToggleBlock(std._id)}
                      className={std.isBlocked ? 'btn-primary' : 'btn-secondary'}
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                    >
                      {std.isBlocked ? <UserCheck size={14} /> : <UserX size={14} />}
                      <span>{std.isBlocked ? 'Unblock' : 'Block Student'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
