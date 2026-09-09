import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { Calendar, MapPin, Heart, Star, Ticket, ArrowUpRight, Flame } from 'lucide-react';

export const EventCard = ({ event, onSelectEvent }) => {
  const { user, toggleWishlist, isAuthenticated } = useAuth();
  const { setBookingModalEvent, showToast } = useEvents();

  const isWishlisted = user?.wishlist?.includes(event._id || event.id);

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      showToast('Please sign in to save events to your wishlist', 'info');
      return;
    }
    await toggleWishlist(event._id || event.id);
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    setBookingModalEvent(event);
  };

  // Format Date
  const eventDate = new Date(event.startDate);
  const formattedMonth = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
  const formattedDay = eventDate.getDate();
  const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Get lowest price
  const lowestPrice = event.ticketTiers && event.ticketTiers.length > 0
    ? Math.min(...event.ticketTiers.map((t) => t.price))
    : 0;

  return (
    <div 
      className="glass-card animate-fade-in"
      onClick={() => onSelectEvent(event)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Card Image Banner */}
      <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden' }}>
        <img 
          src={event.bannerImage} 
          alt={event.title} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        />

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
        }} />

        {/* Date Badge */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          background: 'rgba(9, 13, 22, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          padding: '6px 12px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.05em' }}>
            {formattedMonth}
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, lineHeight: 1, color: '#ffffff' }}>
            {formattedDay}
          </div>
        </div>

        {/* Trending / Featured Badge */}
        <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', gap: '6px' }}>
          {event.trending && (
            <span className="badge badge-trending">
              <Flame size={12} /> Trending
            </span>
          )}
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(9, 13, 22, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isWishlisted ? '#f43f5e' : '#ffffff',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Heart size={16} fill={isWishlisted ? '#f43f5e' : 'transparent'} />
          </button>
        </div>

        {/* District Tag on Image Bottom */}
        <div style={{ position: 'absolute', bottom: '12px', left: '14px' }}>
          <span className="badge badge-district" style={{ background: 'rgba(9, 13, 22, 0.9)' }}>
            <MapPin size={11} color="var(--accent-cyan)" /> {event.district}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category & Rating */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
            {event.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: '#fcd34d' }}>
            <Star size={13} fill="#fcd34d" />
            <span style={{ fontWeight: 700 }}>{event.rating || 4.9}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({event.reviewsCount || 40})</span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px', color: '#ffffff', lineClamp: 2 }}>
          {event.title}
        </h3>

        {/* Tagline / Snippet */}
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.5', flex: 1 }}>
          {event.tagline || event.description?.slice(0, 95) + '...'}
        </p>

        {/* Venue info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          <Calendar size={13} />
          <span>{formattedTime} Doors Open</span>
          <span>•</span>
          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '170px' }}>
            {event.venue?.name}
          </span>
        </div>

        {/* Card Footer: Price & Book Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-glass)',
          paddingTop: '14px',
          marginTop: 'auto',
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tickets From
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              ₹{lowestPrice.toLocaleString('en-IN')}
              <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-secondary)' }}> / person</span>
            </div>
          </div>

          <button 
            onClick={handleBookNow}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Ticket size={15} />
            <span>Book</span>
          </button>
        </div>
      </div>
    </div>
  );
};
