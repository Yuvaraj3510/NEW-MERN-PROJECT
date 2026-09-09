import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { bookingAPI } from '../services/api';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  QrCode, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const MyBookingsPage = ({ setActivePage, onSelectEvent }) => {
  const { user, isAuthenticated } = useAuth();
  const { setActiveTicketPass, showToast } = useEvents();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    // 1. Load local wallet passes first
    const localPasses = JSON.parse(localStorage.getItem('districtpulse_my_bookings') || '[]');
    setBookings(localPasses);

    // 2. Try fetching from backend API
    try {
      const res = await bookingAPI.getMyBookings();
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        // Merge without duplicates
        const combined = [...res.data];
        localPasses.forEach((lp) => {
          if (!combined.some((b) => b.bookingReference === lp.bookingReference)) {
            combined.push(lp);
          }
        });
        setBookings(combined);
      }
    } catch (err) {
      console.warn('Using local pass wallet:', err.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this ticket pass?')) return;

    try {
      await bookingAPI.cancel(id).catch(() => {});
    } catch (err) {}

    // Update local state and storage
    const updated = bookings.map((b) => {
      if ((b._id || b.id) === id) {
        return { ...b, bookingStatus: 'cancelled' };
      }
      return b;
    });

    setBookings(updated);
    localStorage.setItem('districtpulse_my_bookings', JSON.stringify(updated));
    showToast('Ticket Pass Cancelled', 'info');
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '80px', paddingTop: '20px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-district">Pass Wallet</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>My Event Passes & Bookings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Present your encrypted QR code at district turnstiles for contactless VIP entry.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <Sparkles size={32} className="animate-spin" style={{ color: 'var(--accent-primary)', marginBottom: '12px' }} />
          <div>Retrieving your ticket wallet...</div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Ticket size={44} color="var(--accent-cyan)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No Active Passes Yet</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', maxWidth: '420px', margin: '0 auto 24px auto' }}>
            You haven't reserved tickets for any upcoming district experiences. Explore the city calendar and book your next night out!
          </p>
          <button onClick={() => setActivePage('home')} className="btn btn-glow">
            <span>Explore District Events</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {bookings.map((booking) => {
            const ev = booking.event || {};
            const isCancelled = booking.bookingStatus === 'cancelled';

            return (
              <div
                key={booking._id || booking.id || booking.bookingReference}
                className="glass-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                  opacity: isCancelled ? 0.6 : 1,
                }}
              >
                {/* Event Thumb & Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: '280px' }}>
                  <img
                    src={ev.bannerImage || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80'}
                    alt={ev.title}
                    style={{ width: '90px', height: '90px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                  />

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge badge-district" style={{ fontSize: '0.68rem' }}>
                        {ev.district || 'Metro District'}
                      </span>
                      {isCancelled ? (
                        <span style={{ fontSize: '0.72rem', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                          <XCircle size={13} /> Cancelled
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                          <CheckCircle2 size={13} /> Confirmed Pass
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                      {ev.title || 'District Event'}
                    </h3>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} /> {ev.startDate ? new Date(ev.startDate).toLocaleDateString() : 'Upcoming'}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} /> {ev.venue?.name || 'Main Hall'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tier & Code */}
                <div style={{ textAlign: 'left', minWidth: '160px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tier & Passes</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#a5b4fc', marginTop: '2px' }}>
                    {booking.tierName} (x{booking.quantity})
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    REF: {booking.bookingReference}
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                    Total: ${booking.totalAmount}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {!isCancelled && (
                    <button
                      onClick={() => setActiveTicketPass(booking)}
                      className="btn btn-glow"
                      style={{ padding: '10px 18px', fontSize: '0.88rem' }}
                    >
                      <QrCode size={16} />
                      <span>View QR Pass</span>
                    </button>
                  )}

                  {!isCancelled && (
                    <button
                      onClick={() => handleCancelBooking(booking._id || booking.id)}
                      className="btn btn-danger"
                      style={{ padding: '10px 14px', fontSize: '0.82rem' }}
                    >
                      Cancel
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
