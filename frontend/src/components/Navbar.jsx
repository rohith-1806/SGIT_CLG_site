import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, Moon, LogIn, LogOut, ShieldAlert, Menu, X, ChevronDown, User, Settings
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // IF AUTHENTICATED STUDENT: Do NOT render global top Navbar.
  // StudentPortalLayout handles the student top header with sidebar!
  if (user && user.role === 'student') {
    return null;
  }

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'superadmin') return '/sadmin/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return '/dashboard';
  };

  // Pre-Login Menu Items (STRICTLY: Home, About, FAQ, Contact Us)
  const preLoginLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed-top-navbar" style={{ backdropFilter: 'blur(16px)', zIndex: 1000 }}>
      {/* Brand Logo & Name */}
      <Link to={user ? getDashboardPath() : '/'} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
        <img 
          src="/assets/sgit-logo.jpg" 
          alt="SGIT AUTONOMOUS Logo" 
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            objectFit: 'cover',
            border: '2px solid var(--accent-primary)',
            boxShadow: 'var(--shadow-glow)'
          }}
          onError={(e) => { e.target.src = '/clg logo 1.jpg'; }}
        />
        <div>
          <span style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            SGIT <span className="text-gradient">AUTONOMOUS</span>
          </span>
          <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            College Career Portal
          </div>
        </div>
      </Link>

      {/* Pre-Login or Admin Menu Navigation */}
      <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {!user ? (
          /* PRE-LOGIN NAVBAR: STRICTLY Home, About, FAQ, Contact Us */
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
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
                    borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    paddingBottom: '0.25rem',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        ) : (
          /* ADMIN & SUPER ADMIN NAVIGATION */
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <Link to={getDashboardPath()} style={{ textDecoration: 'none', fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldAlert size={16} /> <span>Command Center</span>
            </Link>
          </div>
        )}
      </div>

      {/* Right Controls: Theme Toggle & Login/User Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            color: 'var(--text-primary)', padding: '0.5rem', borderRadius: '10px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          {theme === 'dark' ? <Sun size={17} style={{ color: 'var(--accent-gold)' }} /> : <Moon size={17} style={{ color: 'var(--accent-primary)' }} />}
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {/* Profile Dropdown for Admin / Superadmin */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setUserDropdownOpen(true)}
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              <button 
                className="btn-primary" 
                style={{ padding: '0.45rem 0.9rem', fontSize: '0.825rem', gap: '0.4rem', borderRadius: '10px' }}
              >
                <User size={15} /> <span>{user.name.split(' ')[0]}</span> <ChevronDown size={14} />
              </button>

              {userDropdownOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, width: '200px',
                  background: '#0d0d12', border: '1px solid var(--border-color)', borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem',
                  zIndex: 9999
                }}>
                  <button 
                    onClick={handleLogout} 
                    style={{ background: 'transparent', border: 'none', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.825rem', color: 'var(--accent-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <LogOut size={14} /> <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}>
            <LogIn size={16} /> <span>Login</span>
          </Link>
        )}

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Mobile Menu"
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'none' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
