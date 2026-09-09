import React from 'react';
import { useEvents } from '../context/EventContext';
import { X, Printer, CheckCircle, Sparkles, MapPin, Calendar, Clock, User, QrCode } from 'lucide-react';

export const TicketPass = () => {
  const { activeTicketPass, setActiveTicketPass } = useEvents();

  if (!activeTicketPass) return null;

  const booking = activeTicketPass;
  const event = booking.event || {};
  const attendee = booking.attendeeInfo || {};

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 8, 15, 0.88)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div 
        className="animate-fade-in printable-ticket-area"
        style={{
          width: '100%',
          maxWidth: '520px',
          position: 'relative',
        }}
      >
        {/* Floating Close Button (Hidden when printing) */}
        <button
          onClick={() => setActiveTicketPass(null)}
          style={{
            position: 'absolute',
            top: '-16px',
            right: '-16px',
            background: '#1e293b',
            border: '1px solid var(--border-glass)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}
          className="no-print"
        >
          <X size={20} />
        </button>

        {/* Boarding Pass Ticket Card */}
        <div className="ticket-pass-card" style={{ padding: '32px' }}>
          
          {/* Header Banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-cyan) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Sparkles size={16} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>District<span className="gradient-text-neon">Pulse</span></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '0.8rem', fontWeight: 700 }}>
              <CheckCircle size={15} />
              <span>OFFICIAL PASS</span>
            </div>
          </div>

          {/* Event Title & District */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              {event.district || 'Metro District Event'}
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginTop: '4px', lineHeight: '1.3' }}>
              {event.title || 'Special District Experience'}
            </h3>
          </div>

          {/* Key Info Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-glass)',
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date & Time</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Calendar size={13} color="var(--accent-cyan)" />
                {event.startDate ? new Date(event.startDate).toLocaleDateString() : 'Upcoming'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Doors Open</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Clock size={13} color="var(--accent-cyan)" />
                {event.doorsOpen || '19:00'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tier & Passes</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#a5b4fc', marginTop: '2px' }}>
                {booking.tierName} (x{booking.quantity})
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Attendee</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {attendee.fullName || 'Guest'}
              </div>
            </div>
          </div>

          {/* Venue Address */}
          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <MapPin size={15} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{event.venue?.name || 'Main Arena'} • {event.venue?.address || 'Metro District Avenue'}</span>
          </div>

          {/* Dashed Separator */}
          <div className="ticket-divider-dashed" />

          {/* QR Code Pass Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '10px 0',
          }}>
            <div style={{
              background: '#ffffff',
              padding: '12px',
              borderRadius: '16px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
              marginBottom: '12px',
            }}>
              {booking.qrCodeDataUrl ? (
                <img 
                  src={booking.qrCodeDataUrl} 
                  alt="Entry QR Pass" 
                  style={{ width: '150px', height: '150px', display: 'block' }} 
                />
              ) : (
                <div style={{ width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', color: '#0f172a' }}>
                  <QrCode size={100} />
                </div>
              )}
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.15em', color: '#ffffff' }}>
              {booking.bookingReference}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Scan at district turnstile or event entrance gate
            </div>
          </div>

          {/* Actions Bar (No Print) */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }} className="no-print">
            <button
              onClick={handlePrint}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '10px' }}
            >
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setActiveTicketPass(null)}
              className="btn btn-primary"
              style={{ flex: 1, padding: '10px' }}
            >
              <span>Done</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
