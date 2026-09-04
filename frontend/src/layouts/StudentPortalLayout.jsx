import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, Moon, Bell, Bookmark, User, Settings, LogOut, ChevronDown, 
  Menu, Shield, Award, Sparkles
} from 'lucide-react';

const StudentPortalLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('student-portal-active');
    return () => {
      document.body.classList.remove('student-portal-active');
    };
  }, []);

  // Map route paths to clean human-readable page titles and breadcrumbs
  const getPageTitle = (path) => {
    switch (path) {
      case '/dashboard':
        return { title: 'Student Dashboard', breadcrumb: 'Dashboard' };
      case '/dashboard/profile':
        return { title: 'My Profile', breadcrumb: 'Profile' };
      case '/academic-progress':
        return { title: 'Academic Progress', breadcrumb: 'Academics' };
      case '/cgpa-calculator':
        return { title: 'SGIT CGPA Calculator', breadcrumb: 'CGPA Calculator' };
      case '/dashboard/resume':
        return { title: 'ATS Resume Builder', breadcrumb: 'Career Toolkit > Resume' };
      case '/dashboard/cv':
        return { title: 'Academic CV Builder', breadcrumb: 'Career Toolkit > CV' };
      case '/dashboard/cover-letter':
        return { title: 'Cover Letter Builder', breadcrumb: 'Career Toolkit > Cover Letter' };
      case '/dashboard/ats-checker':
        return { title: 'ATS Score Checker', breadcrumb: 'Career Toolkit > ATS Checker' };
      case '/dashboard/mock-interview':
        return { title: 'Mock Interview Studio', breadcrumb: 'Career Toolkit > Mock Interview' };
      case '/dashboard/internships':
        return { title: 'Internships Portal', breadcrumb: 'Internships' };
      case '/dashboard/projects':
        return { title: 'Projects Hub', breadcrumb: 'Projects' };
      case '/dashboard/skills':
        return { title: 'Technical Skills Hub', breadcrumb: 'Skills' };
      case '/dashboard/youtube':
        return { title: 'YouTube Learning Hub', breadcrumb: 'YouTube Learning' };
      case '/dashboard/workshops':
        return { title: 'Workshops & Events', breadcrumb: 'Workshops' };
      case '/dashboard/certificates':
        return { title: 'My Certificates & Achievements', breadcrumb: 'Certificates' };
      case '/dashboard/bookmarks':
        return { title: 'Saved Bookmarks', breadcrumb: 'Bookmarks' };
      case '/dashboard/notifications':
        return { title: 'Notifications Center', breadcrumb: 'Notifications' };
      case '/dashboard/settings':
        return { title: 'Account Settings', breadcrumb: 'Settings' };
      default:
        return { title: 'SGIT Student Portal', breadcrumb: 'Portal' };
    }
  };

  const { title, breadcrumb } = getPageTitle(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Fixed Sticky Left Sidebar */}
      <Sidebar 
        isMobileOpen={mobileDrawerOpen} 
        closeMobileDrawer={() => setMobileDrawerOpen(false)} 
      />

      {/* Main Right Content Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Authenticated Student Top Header (NO HORIZONTAL NAVIGATION LINKS HERE) */}
        <header style={{
          height: '70px',
          background: 'var(--bg-surface)',
          backdropFilter: 'var(--backdrop-blur)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          {/* Left: Mobile Toggle & Page Title/Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Mobile Drawer Trigger Button */}
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="btn-mobile-toggle"
              aria-label="Open Sidebar Menu"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '0.45rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Menu size={20} />
            </button>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                SGIT Portal &gt; {breadcrumb}
              </div>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
                {title}
              </h1>
            </div>
          </div>

          {/* Right Controls: Theme Toggle, Bookmarks, Notifications, Profile Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '0.5rem',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition-fast)'
              }}
            >
              {theme === 'dark' ? <Sun size={18} style={{ color: 'var(--accent-gold)' }} /> : <Moon size={18} style={{ color: 'var(--accent-primary)' }} />}
            </button>

            {/* Bookmarks Quick Link */}
            <Link 
              to="/dashboard/bookmarks" 
              title="Saved Bookmarks"
              style={{ 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border-color)', 
                color: location.pathname === '/dashboard/bookmarks' ? 'var(--accent-primary)' : 'var(--text-secondary)', 
                padding: '0.5rem', 
                borderRadius: '10px', 
                display: 'flex', 
                alignItems: 'center' 
              }}
            >
              <Bookmark size={18} />
            </Link>

            {/* Notifications Quick Link */}
            <Link 
              to="/dashboard/notifications" 
              title="Notifications"
              style={{ 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border-color)', 
                color: location.pathname === '/dashboard/notifications' ? 'var(--accent-primary)' : 'var(--text-secondary)', 
                padding: '0.5rem', 
                borderRadius: '10px', 
                display: 'flex', 
                alignItems: 'center' 
              }}
            >
              <Bell size={18} />
            </Link>

            {/* Profile Menu Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setProfileDropdownOpen(true)}
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <button 
                className="btn-primary" 
                style={{ 
                  padding: '0.45rem 0.85rem', 
                  fontSize: '0.825rem', 
                  gap: '0.4rem', 
                  borderRadius: '10px',
                  boxShadow: 'none'
                }}
              >
                <User size={15} /> 
                <span>{user.name ? user.name.split(' ')[0] : 'Student'}</span> 
                <ChevronDown size={14} />
              </button>

              {profileDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  width: '210px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  zIndex: 9999
                }}>
                  <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.25rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{user.name}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{user.email}</div>
                  </div>

                  <Link 
                    to="/dashboard/profile" 
                    style={{ textDecoration: 'none', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <User size={14} /> <span>My Profile</span>
                  </Link>

                  <Link 
                    to="/academic-progress" 
                    style={{ textDecoration: 'none', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Award size={14} /> <span>Academic Progress</span>
                  </Link>

                  <Link 
                    to="/dashboard/settings" 
                    style={{ textDecoration: 'none', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Settings size={14} /> <span>Settings</span>
                  </Link>

                  <button 
                    onClick={handleLogout} 
                    style={{ background: 'transparent', border: 'none', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.825rem', color: 'var(--accent-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                  >
                    <LogOut size={14} /> <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main style={{ flex: 1, padding: '1.5rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentPortalLayout;
