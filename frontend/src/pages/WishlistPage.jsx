import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { EventCard } from '../components/EventCard';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage = ({ setActivePage, onSelectEvent }) => {
  const { user, isAuthenticated } = useAuth();
  const { events } = useEvents();

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <Heart size={48} color="#f43f5e" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '10px' }}>Sign in to View Saved Events</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Bookmark your dream festivals, raves, and summits to keep track of presales and ticket availability.
        </p>
        <button onClick={() => setActivePage('login')} className="btn btn-primary">
          Sign In Now
        </button>
      </div>
    );
  }

  const wishlistIds = user?.wishlist || [];
  const wishlistedEvents = events.filter((e) => wishlistIds.includes(e._id || e.id));

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '80px', paddingTop: '20px' }}>
      
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-district">Saved Collection</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>My Saved Wishlist</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          {wishlistedEvents.length} bookmarked district experiences.
        </p>
      </div>

      {wishlistedEvents.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Heart size={44} color="#f43f5e" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Your Wishlist is Empty</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
            Click the heart icon on any event card to save it here for quick access later.
          </p>
          <button onClick={() => setActivePage('home')} className="btn btn-glow">
            <span>Discover Events</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="event-grid">
          {wishlistedEvents.map((ev) => (
            <EventCard 
              key={ev._id || ev.id} 
              event={ev} 
              onSelectEvent={onSelectEvent} 
            />
          ))}
        </div>
      )}

    </div>
  );
};
