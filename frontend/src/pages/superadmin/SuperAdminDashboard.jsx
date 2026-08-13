import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { 
  ShieldAlert, Database, Server, Activity, Users, Layers, 
  DollarSign, CheckCircle2, Edit3, Trash2, Plus, Upload, Save, Globe, Eye
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics'); // analytics, cms, admins, audit
  const { addToast } = useToast();

  const [analytics, setAnalytics] = useState({
    totalStudents: 3450,
    totalAdmins: 14,
    totalDepartments: 7,
    websiteVisitors: 48900,
    dailyActiveUsers: 1420,
    internshipStats: '120 Active Postings',
    workshopStats: '45 Sessions Completed',
    projectStats: '580 Published Projects',
    resumeDownloads: '3,200 PDF Exports',
    atsReports: '1,890 Scans Analyzed',
    mockReports: '1,450 Practice Rounds',
    apiHealth: '100% Operational',
    serverHealth: '99.99% Uptime',
    databaseHealth: '12ms Response Latency'
  });

  const [cmsContent, setCmsContent] = useState({
    heroTitle: 'Architecting Next-Gen Engineers & Leaders',
    heroSubtitle: 'Elevate campus education with an autonomous SaaS ecosystem featuring AI Resume Builders, ATS Scoring engines, Mock Interview Studios, and Realtime Analytics.',
    highestPackage: '45 LPA',
    averagePackage: '12.5 LPA',
    placementRate: '94.8%',
    partnerCount: '150+'
  });

  const [admins, setAdmins] = useState([
    { _id: 'a1', name: 'SGIT Branch Admin', email: 'admin@gmail.com', department: 'CSE' },
    { _id: 'a2', name: 'Dr. Sarah Lin', email: 'sarah.lin@gmail.com', department: 'AI & ML' }
  ]);

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '@Branchhod123', department: 'CSE' });

  const handleSaveCMS = (e) => {
    e.preventDefault();
    addToast('Website CMS Modifications Saved Live!', 'success');
  };

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    setAdmins([...admins, { ...newAdmin, _id: `a_${Date.now()}` }]);
    setShowAdminModal(false);
    addToast('Admin Privileges Granted!', 'success');
  };

  const handleDeleteAdmin = (id) => {
    setAdmins(admins.filter(a => a._id !== id));
    addToast('Admin Privileges Revoked!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="badge badge-red" style={{ marginBottom: '0.5rem' }}>SGIT Master Governance</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Super Admin Enterprise Portal</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Complete authority over website CMS, users, analytics, and infrastructure</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setActiveTab('cms')} className="btn-secondary">
            <Edit3 size={16} /> <span>Website CMS Editor</span>
          </button>
          <button onClick={() => setShowAdminModal(true)} className="btn-primary">
            <ShieldAlert size={16} /> <span>Create Admin</span>
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        {[
          { id: 'analytics', label: 'Ecosystem Analytics' },
          { id: 'cms', label: 'Website Content CMS' },
          { id: 'admins', label: 'Manage Admins' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab.id ? 800 : 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              paddingBottom: '0.5rem',
              borderBottom: activeTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-card">
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Enrolled Students</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-primary)', marginTop: '0.25rem' }}>{analytics.totalStudents}</div>
            </div>
            <div className="glass-card">
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Faculty Admins</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-gold)', marginTop: '0.25rem' }}>{analytics.totalAdmins}</div>
            </div>
            <div className="glass-card">
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Departments</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-cyan)', marginTop: '0.25rem' }}>{analytics.totalDepartments}</div>
            </div>
            <div className="glass-card">
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Website Visitors</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>{analytics.websiteVisitors}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Infrastructure & Server Health</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>API Status:</span> <strong style={{ color: 'var(--accent-emerald)' }}>{analytics.apiHealth}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Server Uptime:</span> <strong>{analytics.serverHealth}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>DB Latency:</span> <strong>{analytics.databaseHealth}</strong></div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>AI Tool Usage Reports</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Resume Downloads:</span> <strong>{analytics.resumeDownloads}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>ATS Scans Analyzed:</span> <strong>{analytics.atsReports}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Mock Interview Sessions:</span> <strong>{analytics.mockReports}</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Website CMS Content Editor Tab */}
      {activeTab === 'cms' && (
        <form onSubmit={handleSaveCMS} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 900 }}>Website Content CMS Editor</h2>
            <button type="submit" className="btn-primary">
              <Save size={18} /> <span>Save Live CMS Changes</span>
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Hero Title Heading</label>
            <input type="text" className="form-input" value={cmsContent.heroTitle} onChange={(e) => setCmsContent({ ...cmsContent, heroTitle: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Hero Subtitle Description</label>
            <textarea rows={3} className="form-input" value={cmsContent.heroSubtitle} onChange={(e) => setCmsContent({ ...cmsContent, heroSubtitle: e.target.value })} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Highest Package Stat</label>
              <input type="text" className="form-input" value={cmsContent.highestPackage} onChange={(e) => setCmsContent({ ...cmsContent, highestPackage: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Average Package Stat</label>
              <input type="text" className="form-input" value={cmsContent.averagePackage} onChange={(e) => setCmsContent({ ...cmsContent, averagePackage: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Placement Rate Stat</label>
              <input type="text" className="form-input" value={cmsContent.placementRate} onChange={(e) => setCmsContent({ ...cmsContent, placementRate: e.target.value })} />
            </div>
          </div>
        </form>
      )}

      {/* Manage Admins Tab */}
      {activeTab === 'admins' && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Faculty Admins Directory</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '0.75rem' }}>Admin Name</th>
                  <th style={{ padding: '0.75rem' }}>Email</th>
                  <th style={{ padding: '0.75rem' }}>Department</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((adm) => (
                  <tr key={adm._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.85rem', fontWeight: 800 }}>{adm.name}</td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-secondary)' }}>{adm.email}</td>
                    <td style={{ padding: '0.85rem' }}><span className="badge badge-red">{adm.department}</span></td>
                    <td style={{ padding: '0.85rem', textAlign: 'right' }}>
                      <button onClick={() => handleDeleteAdmin(adm._id)} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', color: 'var(--accent-primary)' }}>
                        <Trash2 size={14} /> Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Creating Admin */}
      {showAdminModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>Create Admin Account</h2>
            <form onSubmit={handleCreateAdmin}>
              <div className="form-group">
                <label className="form-label">Admin Name</label>
                <input type="text" required className="form-input" value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} placeholder="Prof. John Doe" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" required className="form-input" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} placeholder="admin@gmail.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" required className="form-input" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowAdminModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Create Admin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
