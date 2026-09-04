import React, { useState } from 'react';
import { FiBell, FiCheckCircle, FiInfo, FiAlertTriangle, FiCalendar } from 'react-icons/fi';

const StudentNotifications = () => {
  const [notifications] = useState([
    {
      id: 'n1',
      title: 'Stripe Software Intern Drive Announced',
      message: 'Applications are open for Full Stack Software Engineer Interns. Check the Internships tab to apply.',
      time: '2 hours ago',
      type: 'info'
    },
    {
      id: 'n2',
      title: 'ATS Resume Score Updated',
      message: 'Your ATS match score reached 92/100 for Software Developer roles.',
      time: '1 day ago',
      type: 'success'
    },
    {
      id: 'n3',
      title: 'Upcoming Microservices Workshop',
      message: 'Join Sarah Jenkins (Netflix) this Saturday at 2:00 PM in Main Auditorium.',
      time: '2 days ago',
      type: 'warning'
    }
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div className="badge badge-red" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <FiBell size={16} /> Activity Alerts
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Campus Notifications</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Updates from Placement Cell, Department Heads, and AI Career Toolkit.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notifications.map(notif => (
          <div key={notif.id} className="glass-card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
              background: notif.type === 'success' ? 'rgba(16,185,129,0.15)' : notif.type === 'warning' ? 'rgba(245,158,11,0.15)' : 'rgba(227,30,36,0.15)',
              color: notif.type === 'success' ? 'var(--accent-emerald)' : notif.type === 'warning' ? 'var(--accent-gold)' : 'var(--accent-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {notif.type === 'success' ? <FiCheckCircle size={20} /> : notif.type === 'warning' ? <FiAlertTriangle size={20} /> : <FiInfo size={20} />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{notif.title}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{notif.time}</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {notif.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentNotifications;
