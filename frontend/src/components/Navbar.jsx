import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, Moon, LogIn, LogOut, LayoutDashboard, 
  Code, Briefcase, FolderGit2, Calendar, FileText, FileCode, 
  BookOpen, CheckSquare, Mic, Bell, User, GraduationCap, ShieldCheck
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'superadmin') return '/superadmin';
    if (user.role === 'admin') return '/admin';
    return '/student';
  };

  // Pre-Login Menu Items (STRICT: Only Home, About, FAQ, Contact Us, Login)
  const preLoginLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' }
  ];

  // Post-Login Menu Items
  const postLoginStudentLinks = [
    { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { name: 'Technical Skills', path: '/student/skills', icon: Code },
    { name: 'Internships', path: '/student/internships', icon: Briefcase },
    { name: 'Projects', path: '/student/projects', icon: FolderGit2 },
    { name: 'Workshops', path: '/student/workshops', icon: Calendar },
    { name: 'Resume Builder', path: '/student/resume', icon: FileText },
    { name: 'CV Builder', path: '/student/cv', icon: FileCode },
    { name: 'Cover Letter', path: '/student/cover-letter', icon: BookOpen },
    { name: 'ATS Checker', path: '/student/ats-checker', icon: CheckSquare },
    { name: 'Mock Interview', path: '/student/mock-interview', icon: Mic },
    { name: 'Notifications', path: '/student/notifications', icon: Bell },
    { name: 'Profile', path: '/student/profile', icon: User }
  ];

  const postLoginAdminLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Technical Skills', path: '/student/skills', icon: Code },
    { name: 'Internships', path: '/student/internships', icon: Briefcase },
    { name: 'Projects', path: '/student/projects', icon: FolderGit2 },
    { name: 'Workshops', path: '/student/workshops', icon: Calendar },
    { name: 'Profile', path: '/student/profile', icon: User }
  ];

  const postLoginSuperAdminLinks = [
    { name: 'Dashboard', path: '/superadmin', icon: LayoutDashboard },
    { name: 'Technical Skills', path: '/student/skills', icon: Code },
    { name: 'Internships', path: '/student/internships', icon: Briefcase },
    { name: 'Projects', path: '/student/projects', icon: FolderGit2 },
    { name: 'Workshops', path: '/student/workshops', icon: Calendar },
    { name: 'Notifications', path: '/student/notifications', icon: Bell },
    { name: 'Profile', path: '/student/profile', icon: User }
  ];

  let postLoginLinks = postLoginStudentLinks;
  if (user?.role === 'admin') postLoginLinks = postLoginAdminLinks;
  if (user?.role === 'superadmin') postLoginLinks = postLoginSuperAdminLinks;

  return (
    <nav className="fixed-top-navbar">
      {/* Brand Header Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'var(--gradient-brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <GraduationCap size={26} />
        </div>
        <div>
          <span style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            SGIT <span className="text-gradient">AUTONOMOUS</span>
          </span>
          <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Career & Learning Platform
          </div>
        </div>
      </Link>

      {/* Menu Links Conditioned On Auth State */}
      {!user ? (
        /* Pre-Login Navigation: STRICTLY Home, About, FAQ, Contact Us */
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {preLoginLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.925rem',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  transition: 'var(--transition-fast)'
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      ) : (
        /* Post-Login Dynamic Role Navigation */
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', overflowX: 'auto', padding: '0.5rem 0' }}>
          {postLoginLinks.slice(0, 7).map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {Icon && <Icon size={15} />}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Actions & Theme Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '0.55rem',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {theme === 'dark' ? <Sun size={18} style={{ color: 'var(--accent-gold)' }} /> : <Moon size={18} style={{ color: 'var(--accent-primary)' }} />}
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to={getDashboardPath()} className="btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>
              <LayoutDashboard size={16} />
              <span>Portal</span>
            </Link>
            <button onClick={logout} className="btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}>
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem' }}>
            <LogIn size={16} />
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
