import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Heart, 
  Share2, 
  Ticket, 
  CheckCircle, 
  ShieldCheck, 
  Users, 
  Navigation,
  Sparkles
} from 'lucide-react';
import { VenueMap } from '../components/VenueMap';

export const EventDetailPage = ({ event, onBack }) => {
  const { user, toggleWishlist, isAuthenticated } = useAuth();
  const { setBookingModalEvent, showToast } = useEvents();

  if (!event) return null;

  const isWishlisted = user?.wishlist?.includes(event._id || event.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Event link copied to clipboard! 📋', 'success');
  };

  const handleBook = () => {
    setBookingModalEvent(event);
  };

  const eventDate = new Date(event.startDate);
  const formattedDate = eventDate.toLocaleDateString('default', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '80px', paddingTop: '20px' }}>
      
      {/* Top Nav Back */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button 
          onClick={onBack}
          className="btn btn-secondary"
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Discovery</span>
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => toggleWishlist(event._id || event.id)}
            className="btn btn-secondary"
            style={{ padding: '8px 14px', color: isWishlisted ? '#f43f5e' : 'inherit' }}
          >
            <Heart size={16} fill={isWishlisted ? '#f43f5e' : 'transparent'} />
            <span>{isWishlisted ? 'Saved' : 'Save'}</span>
          </button>
          <button 
            onClick={handleShare}
            className="btn btn-secondary"
            style={{ padding: '8px 14px' }}
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Hero Banner Showcase */}
      <div style={{
        position: 'relative',
        height: '420px',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        marginBottom: '36px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-glass)',
      }}>
        <img 
          src={event.bannerImage} 
          alt={event.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(9, 13, 22, 0.95) 0%, rgba(9, 13, 22, 0.4) 60%, transparent 100%)',
        }} />

        {/* Content over banner */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '32px',
          right: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '20px',
        }}>
          <div style={{ maxWidth: '720px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <span className="badge badge-district">{event.district}</span>
              <span className="badge badge-category">{event.category}</span>
              {event.trending && <span className="badge badge-trending">Trending</span>}
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#ffffff', lineHeight: '1.2' }}>
              {event.title}
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', marginTop: '6px' }}>
              {event.tagline}
            </p>
          </div>

          <button 
            onClick={handleBook}
            className="btn btn-glow"
            style={{ padding: '14px 28px', fontSize: '1.05rem', fontWeight: 700 }}
          >
            <Ticket size={20} />
            <span>Book Tickets Now</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Details Left, Sidebar Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)',
        gap: '36px',
      }}>
        
        {/* Left Column */}
        <div>
          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}>
            <div className="glass-panel" style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date & Schedule</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <Calendar size={16} color="var(--accent-cyan)" />
                {formattedDate}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Doors Open</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <Clock size={16} color="var(--accent-cyan)" />
                {event.doorsOpen || '19:00 PM'}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Audience Rating</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fcd34d', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <Star size={16} fill="#fcd34d" />
                {event.rating || 4.9} / 5.0 ({event.reviewsCount || 48} verified reviews)
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '14px' }}>About this Experience</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
              {event.description}
            </p>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div style={{ marginTop: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {event.tags.map((t) => (
                  <span key={t} style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-glass)',
                  }}>
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Ticket Tiers Overview */}
          <div className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '18px' }}>Available Ticket Tiers</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {(event.ticketTiers || []).map((tier) => (
                <div 
                  key={tier.name}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 20px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-glass)',
                    gap: '16px',
                  }}
                >
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#ffffff' }}>{tier.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {tier.description}
                    </div>
                    {tier.perks && (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                        {tier.perks.map((p) => (
                          <span key={p} style={{ fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle size={12} /> {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff' }}>₹{tier.price.toLocaleString('en-IN')}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tier.availableSeats} available</div>
                    </div>
                    <button 
                      onClick={handleBook}
                      className="btn btn-primary"
                      style={{ padding: '8px 18px', fontSize: '0.88rem' }}
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Venue Map & Organizer */}
        <div>
          {/* Real Interactive Venue Map */}
          <VenueMap event={event} />

          {/* Organizer Card */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
              District Organizer
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img 
                src={event.organizer?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'} 
                alt="Organizer" 
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.95rem' }}>
                  <span>{event.organizer?.name || 'District Pulse Productions'}</span>
                  <ShieldCheck size={16} color="#34d399" />
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {event.organizer?.contactEmail || 'verified.organizer@districtpulse.io'}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
