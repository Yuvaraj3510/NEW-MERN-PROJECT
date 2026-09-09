import React from 'react';
import { useEvents } from '../context/EventContext';
import { DistrictSelector } from '../components/DistrictSelector';
import { CategoryPills } from '../components/CategoryPills';
import { EventCard } from '../components/EventCard';
import { Search, Sparkles, Flame, Shield, MapPin, Calendar, ArrowRight, Activity } from 'lucide-react';

export const HomePage = ({ onSelectEvent, setActivePage }) => {
  const { events, loading, searchQuery, setSearchQuery, selectedDistrict } = useEvents();

  const featuredEvents = events.filter((e) => e.featured);
  const heroEvent = featuredEvents[0] || events[0];

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      
      {/* Hero Showcase Section */}
      <section style={{
        marginTop: '24px',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(30, 41, 69, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
        border: '1px solid var(--border-glass)',
        padding: '48px 40px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg), var(--shadow-neon)',
      }}>
        {/* Glow Spheres */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="badge badge-district">
              <Activity size={12} color="var(--accent-cyan)" /> Live City Pulse
            </span>
            <span className="badge badge-featured">
              <Sparkles size={12} /> Metro 2026 Season
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '18px' }}>
            Discover District Events, <br />
            <span className="gradient-text-neon">Live Vibes & Smart Ticketing.</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '640px', lineHeight: '1.6' }}>
            Explore immersive festivals, cyber concerts, tech summits, and secret speakeasies across all metropolitan quarters. Instant QR ticketing with zero scalping.
          </p>

          {/* Integrated Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(9, 13, 22, 0.85)',
            border: '1px solid var(--border-focus)',
            borderRadius: 'var(--radius-lg)',
            padding: '6px 8px 6px 18px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            maxWidth: '640px',
          }}>
            <Search size={20} color="var(--text-muted)" style={{ marginRight: '12px' }} />
            <input 
              type="text" 
              placeholder="Search by artist, event title, tech summit, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.98rem',
                outline: 'none',
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 8px' }}
              >
                Clear
              </button>
            )}
            <button className="btn btn-primary" style={{ padding: '10px 22px' }}>
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* District Selector & Filter Bar */}
      <DistrictSelector />

      {/* Category Pills */}
      <CategoryPills />

      {/* Live Events Grid */}
      <section style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {searchQuery ? `Search Results for "${searchQuery}"` : selectedDistrict === 'All Districts' ? 'All Upcoming District Events' : `Events in ${selectedDistrict}`}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {events.length} active experiences available for instant booking
            </p>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <Sparkles size={32} className="animate-spin" style={{ marginBottom: '12px', color: 'var(--accent-primary)' }} />
            <div>Syncing District Event Feed...</div>
          </div>
        ) : events.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '70px 20px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-glass)'
          }}>
            <MapPin size={40} color="var(--accent-cyan)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No events found in this selection</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Try selecting "All Districts" or adjusting your search terms.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); }}
              className="btn btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="event-grid">
            {events.map((ev) => (
              <EventCard 
                key={ev._id || ev.id} 
                event={ev} 
                onSelectEvent={onSelectEvent} 
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
