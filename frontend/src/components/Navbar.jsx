import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { 
  Sparkles, 
  MapPin, 
  Ticket, 
  Heart, 
  Shield, 
  LogOut, 
  User as UserIcon, 
  PlusCircle, 
  Search,
  Menu,
  X
} from 'lucide-react';

export const Navbar = ({ activePage, setActivePage }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { selectedDistrict, setSelectedDistrict, districtsList } = useEvents();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNav = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-glass)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* Logo */}
        <div 
          onClick={() => handleNav('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-cyan) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
          }}>
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>District</span>
              <span className="gradient-text-neon">Pulse</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              MERN Event Hub & Ticketing
            </div>
          </div>
        </div>

        {/* District Fast Selector */}
        <div style={{ display: 'none', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.04)', padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-glass)' }} className="desktop-district-pill">
          <MapPin size={15} color="var(--accent-cyan)" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>District:</span>
          <select 
            value={selectedDistrict} 
            onChange={(e) => setSelectedDistrict(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="All Districts" style={{ background: '#0f172a' }}>All Metro Districts</option>
            {districtsList.map((d) => (
              <option key={d.name} value={d.name} style={{ background: '#0f172a' }}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '18px' }} className="desktop-nav">
          <button 
            onClick={() => handleNav('home')} 
            className={`btn ${activePage === 'home' ? 'btn-secondary' : ''}`}
            style={{ border: 'none', background: activePage === 'home' ? 'rgba(99, 102, 241, 0.15)' : 'transparent', color: activePage === 'home' ? '#a5b4fc' : 'var(--text-secondary)' }}
          >
            Discover
          </button>

          {isAuthenticated && (
            <>
              <button 
                onClick={() => handleNav('bookings')} 
                className="btn"
                style={{ border: 'none', background: activePage === 'bookings' ? 'rgba(99, 102, 241, 0.15)' : 'transparent', color: activePage === 'bookings' ? '#a5b4fc' : 'var(--text-secondary)' }}
              >
                <Ticket size={17} />
                <span>My Passes</span>
              </button>

              <button 
                onClick={() => handleNav('wishlist')} 
                className="btn"
                style={{ border: 'none', background: activePage === 'wishlist' ? 'rgba(99, 102, 241, 0.15)' : 'transparent', color: activePage === 'wishlist' ? '#a5b4fc' : 'var(--text-secondary)' }}
              >
                <Heart size={17} />
                <span>Wishlist</span>
              </button>
            </>
          )}

          {isAdmin && (
            <button 
              onClick={() => handleNav('admin')} 
              className="btn"
              style={{
                background: activePage === 'admin' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <Shield size={16} />
              <span>Admin Portal</span>
            </button>
          )}

          {/* Auth Controls */}
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '5px 12px 5px 6px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-glass)',
                  cursor: 'pointer',
                }}
              >
                <img 
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'} 
                  alt={user.name} 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name.split(' ')[0]}</span>
              </div>

              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '48px',
                  width: '210px',
                  background: '#0f172a',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '8px',
                  zIndex: 1000,
                }}>
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-glass)', marginBottom: '6px' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{user.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{user.email}</div>
                    <span className="badge badge-district" style={{ marginTop: '4px', fontSize: '0.65rem' }}>{user.role}</span>
                  </div>

                  {isAdmin && (
                    <div 
                      onClick={() => handleNav('create-event')}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.85rem' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <PlusCircle size={15} color="var(--accent-cyan)" />
                      <span>Create New Event</span>
                    </div>
                  )}

                  <div 
                    onClick={() => { logout(); setUserDropdownOpen(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.85rem', color: '#fb7185' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(244,63,94,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={() => handleNav('login')} 
                className="btn btn-glow"
                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              >
                Sign In / Demo
              </button>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <div style={{ display: 'none' }} className="mobile-menu-trigger">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary" 
            style={{ padding: '8px' }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      <style>{`
        @media (min-width: 860px) {
          .desktop-district-pill { display: flex !important; }
        }
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-trigger { display: block !important; }
        }
      `}</style>
    </header>
  );
};
