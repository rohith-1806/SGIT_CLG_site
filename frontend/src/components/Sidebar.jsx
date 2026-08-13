import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, FileText, CheckSquare, Mic, Briefcase, Calendar, 
  BookOpen, Code, FolderGit2, Bell, User, Settings, ShieldAlert, 
  Users, Layers, BarChart3, Database, FileCode, LogOut, GraduationCap
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const studentLinks = [
    { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { name: 'Resume Builder', path: '/student/resume', icon: FileText },
    { name: 'CV Builder', path: '/student/cv', icon: FileCode },
    { name: 'Cover Letter', path: '/student/cover-letter', icon: BookOpen },
    { name: 'ATS Checker', path: '/student/ats-checker', icon: CheckSquare },
    { name: 'Mock Interview', path: '/student/mock-interview', icon: Mic },
    { name: 'Internships', path: '/student/internships', icon: Briefcase },
    { name: 'Workshops', path: '/student/workshops', icon: Calendar },
    { name: 'Technical Skills', path: '/student/skills', icon: Code },
    { name: 'Projects Hub', path: '/student/projects', icon: FolderGit2 },
    { name: 'Notifications', path: '/student/notifications', icon: Bell },
    { name: 'My Profile', path: '/student/profile', icon: User }
  ];

  const adminLinks = [
    { name: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Students', path: '/admin/students', icon: Users },
    { name: 'Technical Skills', path: '/admin/skills', icon: Code },
    { name: 'Workshops', path: '/admin/workshops', icon: Calendar },
    { name: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Internships', path: '/admin/internships', icon: Briefcase },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell }
  ];

  const superAdminLinks = [
    { name: 'Master Command Center', path: '/superadmin', icon: LayoutDashboard },
    { name: 'Manage Admins', path: '/superadmin/admins', icon: ShieldAlert },
    { name: 'Manage Students', path: '/superadmin/students', icon: Users },
    { name: 'Departments Hub', path: '/superadmin/departments', icon: Layers },
    { name: 'System Analytics', path: '/superadmin/analytics', icon: BarChart3 },
    { name: 'Audit Logs', path: '/superadmin/audit-logs', icon: Database },
    { name: 'System Health', path: '/superadmin/health', icon: Settings }
  ];

  let links = studentLinks;
  if (user.role === 'admin') links = adminLinks;
  if (user.role === 'superadmin') links = superAdminLinks;

  return (
    <aside className="glass-panel" style={{
      width: '260px',
      minHeight: 'calc(100vh - 100px)',
      margin: '12px',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      {/* SGIT User Profile Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '0.85rem',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem',
        border: '1px solid var(--border-color)'
      }}>
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }}
        />
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {user.name}
          </div>
          <div className="badge badge-red" style={{ fontSize: '0.65rem', marginTop: '0.2rem' }}>
            {user.role}
          </div>
        </div>
      </div>

      {/* Navigation items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                background: isActive ? 'var(--gradient-brand)' : 'transparent',
                boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
                transition: 'var(--transition-fast)'
              }}
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <button onClick={logout} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
