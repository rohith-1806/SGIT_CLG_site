import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, User, Award, Calculator, FileText, CheckSquare, 
  Mic, Briefcase, FolderGit2, Code, Youtube, Calendar, Shield, 
  Heart, Star, Bookmark, Bell, Settings, LogOut, ChevronLeft, ChevronRight,
  ChevronDown, BookOpen, FileCode, Sparkles
} from 'lucide-react';

const Sidebar = ({ isMobileOpen, closeMobileDrawer }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Collapsed state for desktop sidebar
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sgit_sidebar_collapsed') === 'true';
  });

  // Career Toolkit accordion open/close state
  const [toolkitExpanded, setToolkitExpanded] = useState(() => {
    return location.pathname.startsWith('/dashboard/resume') ||
      location.pathname.startsWith('/dashboard/cv') ||
      location.pathname.startsWith('/dashboard/cover-letter') ||
      location.pathname.startsWith('/dashboard/ats-checker') ||
      location.pathname.startsWith('/dashboard/mock-interview');
  });

  useEffect(() => {
    localStorage.setItem('sgit_sidebar_collapsed', isCollapsed);
  }, [isCollapsed]);

  if (!user) return null;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Career Toolkit Sub-items
  const careerToolkitSubItems = [
    { name: 'Resume Builder', path: '/dashboard/resume', icon: FileText },
    { name: 'CV Builder', path: '/dashboard/cv', icon: FileCode },
    { name: 'Cover Letter', path: '/dashboard/cover-letter', icon: BookOpen },
    { name: 'ATS Score Checker', path: '/dashboard/ats-checker', icon: CheckSquare },
    { name: 'Mock Interview Studio', path: '/dashboard/mock-interview', icon: Mic }
  ];

  // Main Navigation Sections
  const studentNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/dashboard/profile', icon: User },
    { name: 'Academic Progress', path: '/academic-progress', icon: Award },
    { name: 'CGPA Calculator', path: '/cgpa-calculator', icon: Calculator },
    
    // Career Toolkit is handled specially as an accordion below

    { name: 'Internships', path: '/dashboard/internships', icon: Briefcase },
    { name: 'Projects Hub', path: '/dashboard/projects', icon: FolderGit2 },
    { name: 'Technical Skills', path: '/dashboard/skills', icon: Code },
    { name: 'YouTube Learning', path: '/dashboard/youtube', icon: Youtube },
    { name: 'Workshops', path: '/dashboard/workshops', icon: Calendar },
    { name: 'Certificates', path: '/dashboard/certificates', icon: Sparkles },
    { name: 'Bookmarks', path: '/dashboard/bookmarks', icon: Bookmark },
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings }
  ];

  const sidebarWidth = isCollapsed ? '80px' : '270px';

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={closeMobileDrawer} 
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)',
            zIndex: 1040, display: 'block'
          }}
        />
      )}

      {/* Main Sidebar Element */}
      <aside 
        className={`sgit-sidebar ${isMobileOpen ? 'mobile-drawer-open' : ''}`}
        style={{
          width: isMobileOpen ? '280px' : sidebarWidth,
          minWidth: isMobileOpen ? '280px' : sidebarWidth,
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1050,
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s ease',
          boxShadow: 'var(--shadow-glass)'
        }}
      >
        {/* Sidebar Header: Logo & Collapse Button */}
        <div style={{
          padding: '1.25rem 1rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed && !isMobileOpen ? 'center' : 'space-between',
          gap: '0.75rem'
        }}>
          <Link to="/dashboard" onClick={closeMobileDrawer} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img 
              src="/assets/sgit-logo.jpg" 
              alt="SGIT AUTONOMOUS Logo" 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                objectFit: 'cover',
                border: '2px solid var(--accent-primary)',
                flexShrink: 0
              }}
              onError={(e) => { e.target.src = '/clg logo 1.jpg'; }}
            />
            {(!isCollapsed || isMobileOpen) && (
              <div>
                <span style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                  SGIT <span className="text-gradient">AUTONOMOUS</span>
                </span>
                <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Student Portal
                </div>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle Button */}
          {!isMobileOpen && (
            <button
              onClick={toggleCollapse}
              aria-label="Toggle Sidebar"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                borderRadius: '8px',
                padding: '0.35rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition-fast)'
              }}
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}
        </div>

        {/* Student Profile Card Header */}
        <div style={{
          padding: '1rem',
          borderBottom: '1px solid var(--border-color)',
          background: 'rgba(255, 255, 255, 0.02)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <img 
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
            alt={user.name} 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--accent-primary)',
              flexShrink: 0
            }}
            onError={(e) => { e.target.src = '/assets/sgit-logo.jpg'; }}
          />
          {(!isCollapsed || isMobileOpen) && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
                {user.department || 'CSE'} • {user.year || '3rd Year'}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items Scroll Container */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.75rem 0.6rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem'
        }}>
          {studentNavItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMobileDrawer}
                title={isCollapsed && !isMobileOpen ? item.name : ''}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: isCollapsed && !isMobileOpen ? '0.75rem 0' : '0.65rem 0.85rem',
                  justifyContent: isCollapsed && !isMobileOpen ? 'center' : 'flex-start',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  background: isActive ? 'var(--gradient-brand)' : 'transparent',
                  boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
                  transition: 'var(--transition-fast)'
                }}
              >
                <Icon size={18} style={{ color: isActive ? '#ffffff' : 'var(--accent-primary)', flexShrink: 0 }} />
                {(!isCollapsed || isMobileOpen) && <span>{item.name}</span>}
              </Link>
            );
          })}

          {/* Career Toolkit Accordion Group */}
          <div>
            <button
              onClick={() => setToolkitExpanded(!toolkitExpanded)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: isCollapsed && !isMobileOpen ? '0.75rem 0' : '0.65rem 0.85rem',
                justifyContent: isCollapsed && !isMobileOpen ? 'center' : 'space-between',
                borderRadius: 'var(--radius-sm)',
                background: toolkitExpanded ? 'rgba(227, 30, 36, 0.08)' : 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 700,
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileText size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                {(!isCollapsed || isMobileOpen) && <span>Career Toolkit</span>}
              </div>
              {(!isCollapsed || isMobileOpen) && (
                <ChevronDown 
                  size={14} 
                  style={{ 
                    transform: toolkitExpanded ? 'rotate(180deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.2s ease' 
                  }} 
                />
              )}
            </button>

            {/* Accordion Sub-items */}
            {toolkitExpanded && (!isCollapsed || isMobileOpen) && (
              <div style={{
                paddingLeft: '1.5rem',
                marginTop: '0.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem',
                borderLeft: '2px solid rgba(227, 30, 36, 0.3)',
                marginLeft: '1.1rem'
              }}>
                {careerToolkitSubItems.map((sub) => {
                  const SubIcon = sub.icon;
                  const isSubActive = location.pathname === sub.path;
                  return (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      onClick={closeMobileDrawer}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.45rem 0.6rem',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '0.825rem',
                        fontWeight: isSubActive ? 800 : 600,
                        color: isSubActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                        background: isSubActive ? 'rgba(227, 30, 36, 0.12)' : 'transparent'
                      }}
                    >
                      <SubIcon size={14} style={{ color: isSubActive ? 'var(--accent-primary)' : 'var(--text-muted)' }} />
                      <span>{sub.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Remaining Student Nav Items */}
          {studentNavItems.slice(4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeMobileDrawer}
                title={isCollapsed && !isMobileOpen ? item.name : ''}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: isCollapsed && !isMobileOpen ? '0.75rem 0' : '0.65rem 0.85rem',
                  justifyContent: isCollapsed && !isMobileOpen ? 'center' : 'flex-start',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  background: isActive ? 'var(--gradient-brand)' : 'transparent',
                  boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
                  transition: 'var(--transition-fast)'
                }}
              >
                <Icon size={18} style={{ color: isActive ? '#ffffff' : 'var(--accent-primary)', flexShrink: 0 }} />
                {(!isCollapsed || isMobileOpen) && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* Logout Footer Button */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid var(--border-color)',
          marginTop: 'auto'
        }}>
          <button
            onClick={() => {
              logout();
              if (closeMobileDrawer) closeMobileDrawer();
            }}
            className="btn-secondary"
            title={isCollapsed && !isMobileOpen ? 'Logout' : ''}
            style={{
              width: '100%',
              justifyContent: isCollapsed && !isMobileOpen ? 'center' : 'flex-start',
              gap: '0.75rem',
              padding: '0.65rem 0.85rem',
              fontSize: '0.85rem',
              color: 'var(--accent-primary)',
              borderColor: 'rgba(227, 30, 36, 0.3)'
            }}
          >
            <LogOut size={18} />
            {(!isCollapsed || isMobileOpen) && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
