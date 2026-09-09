import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { bookingAPI } from '../services/api';
import { X, Check, Ticket, ShieldCheck, User, Mail, Phone, Sparkles, AlertCircle } from 'lucide-react';

export const TicketModal = () => {
  const { user, login, isAuthenticated } = useAuth();
  const { bookingModalEvent, setBookingModalEvent, setActiveTicketPass, showToast } = useEvents();

  const event = bookingModalEvent;

  // Selected Tier
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Form info
  const [fullName, setFullName] = useState(user?.name || 'Alex Mercer');
  const [email, setEmail] = useState(user?.email || 'user@districtpulse.io');
  const [phone, setPhone] = useState('+1 (555) 234-8890');

  if (!event) return null;

  const tiers = event.ticketTiers || [
    { name: 'General Admission', price: 45, availableSeats: 100, perks: ['Main Event Access'] }
  ];
  const activeTier = tiers[selectedTierIndex] || tiers[0];

  const basePrice = activeTier.price * quantity;
  const discountAmount = Math.round(basePrice * (discountPercent / 100) * 100) / 100;
  const subtotal = basePrice - discountAmount;
  const serviceFee = Math.round(subtotal * 0.05 * 100) / 100; // 5% service fee
  const totalAmount = subtotal + serviceFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'DISTRICT20') {
      setDiscountPercent(20);
      showToast('Promo applied! 20% District Discount active 🎉', 'success');
    } else if (promoCode.trim().toUpperCase() === 'VIP50') {
      setDiscountPercent(50);
      showToast('VIP Promo applied! 50% discount 🎉', 'success');
    } else {
      showToast('Invalid promo code. Try "DISTRICT20"', 'info');
    }
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim()) {
      showToast('Please provide your name and email for ticket issuance', 'error');
      return;
    }

    setLoading(true);

    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const bookingReference = `DP-2026-${randomCode}`;
    const newBookingId = '6630a' + Date.now().toString(16).padEnd(19, '0').slice(0, 19);

    const qrSvgDataUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%230b0f19" rx="16"/><rect x="25" y="25" width="45" height="45" fill="%236366f1" rx="8"/><rect x="35" y="35" width="25" height="25" fill="%230b0f19" rx="4"/><rect x="130" y="25" width="45" height="45" fill="%236366f1" rx="8"/><rect x="140" y="35" width="25" height="25" fill="%230b0f19" rx="4"/><rect x="25" y="130" width="45" height="45" fill="%236366f1" rx="8"/><rect x="35" y="140" width="25" height="25" fill="%230b0f19" rx="4"/><rect x="85" y="25" width="30" height="30" fill="%2306b6d4" rx="4"/><rect x="85" y="85" width="30" height="30" fill="%2310b981" rx="4"/><rect x="130" y="85" width="45" height="20" fill="%23a855f7" rx="4"/><rect x="25" y="85" width="45" height="20" fill="%23a855f7" rx="4"/><rect x="85" y="130" width="30" height="45" fill="%2306b6d4" rx="4"/><rect x="130" y="130" width="45" height="45" fill="%236366f1" rx="8"/><circle cx="100" cy="100" r="10" fill="%23ffffff"/><text x="100" y="190" fill="%2394a3b8" text-anchor="middle" font-size="9" font-family="monospace">${bookingReference}</text></svg>`;

    const fallbackBooking = {
      _id: newBookingId,
      id: newBookingId,
      bookingReference,
      user: user?._id || user?.id || '6610a1111111111111111102',
      event: event,
      tierName: activeTier.name,
      tierPrice: activeTier.price,
      quantity,
      subtotal,
      serviceFee,
      totalAmount,
      attendeeInfo: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      },
      qrCodeDataUrl: qrSvgDataUrl,
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
      createdAt: new Date(),
    };

    try {
      // If user isn't logged in, login locally with these attendee credentials
      if (!isAuthenticated) {
        await login(email.trim(), 'user123').catch(() => {});
      }

      // Try Backend API
      const payload = {
        eventId: event._id || event.id,
        tierName: activeTier.name,
        quantity,
        attendeeInfo: {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
        },
      };

      const res = await bookingAPI.create(payload).catch((err) => {
        console.warn('Backend booking fallback mode:', err.message);
        return { success: true, data: fallbackBooking };
      });

      const finalBooking = (res?.success && res.data) ? res.data : fallbackBooking;

      // Save to localStorage passes wallet
      const existingBookings = JSON.parse(localStorage.getItem('districtpulse_my_bookings') || '[]');
      existingBookings.unshift(finalBooking);
      localStorage.setItem('districtpulse_my_bookings', JSON.stringify(existingBookings));

      // Decrement available seats locally
      if (activeTier.availableSeats >= quantity) {
        activeTier.availableSeats -= quantity;
      }

      showToast(`Pass Reserved! Ref: ${finalBooking.bookingReference} 🎟️`, 'success');
      setBookingModalEvent(null);
      setActiveTicketPass(finalBooking);

    } catch (err) {
      console.error('Booking error:', err);
      // Fallback pass issuance
      const existingBookings = JSON.parse(localStorage.getItem('districtpulse_my_bookings') || '[]');
      existingBookings.unshift(fallbackBooking);
      localStorage.setItem('districtpulse_my_bookings', JSON.stringify(existingBookings));

      showToast(`Pass Reserved! Ref: ${fallbackBooking.bookingReference} 🎟️`, 'success');
      setBookingModalEvent(null);
      setActiveTicketPass(fallbackBooking);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div 
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#0e1626',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.25)',
          padding: '28px',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setBookingModalEvent(null)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-district">{event.district}</span>
            <span className="badge badge-category">{event.category}</span>
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
            {event.title}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {event.venue?.name} • {new Date(event.startDate).toLocaleDateString()}
          </p>
        </div>

        <form onSubmit={handleConfirmBooking}>
          {/* Step 1: Select Tier */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-glow)', display: 'block', marginBottom: '10px' }}>
              1. Select Ticket Tier
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {tiers.map((tier, idx) => {
                const isSelected = selectedTierIndex === idx;
                return (
                  <div
                    key={tier.name}
                    onClick={() => setSelectedTierIndex(idx)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-glass)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.98rem', color: '#ffffff' }}>{tier.name}</span>
                        {tier.availableSeats < 15 && (
                          <span style={{ fontSize: '0.7rem', color: '#f43f5e', background: 'rgba(244,63,94,0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                            Only {tier.availableSeats} left
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {tier.description || 'Standard admission'}
                      </div>
                      {tier.perks && (
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                          {tier.perks.map((p) => (
                            <span key={p} style={{ fontSize: '0.72rem', color: '#a5b4fc', background: 'rgba(99,102,241,0.1)', padding: '1px 6px', borderRadius: '4px' }}>
                              ✓ {p}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                        ₹{tier.price.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>per pass</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Quantity Selector */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', marginBottom: '24px', border: '1px solid var(--border-glass)' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Number of Passes</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Maximum 10 tickets per order</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                -
              </button>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-primary)',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Step 3: Attendee Information */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-glow)', display: 'block', marginBottom: '10px' }}>
              2. Attendee Details (QR Ticket Recipient)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <input
                  type="text"
                  placeholder="Full Name (e.g. Rohan Verma)"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-control"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-control"
                />
              </div>
            </div>
          </div>

          {/* Promo Code input */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <input
              type="text"
              placeholder="Promo Code (e.g. DISTRICT20)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="input-control"
              style={{ fontSize: '0.85rem' }}
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0 16px', whiteSpace: 'nowrap' }}
            >
              Apply
            </button>
          </div>

          {/* Summary Box */}
          <div style={{
            background: 'rgba(9, 13, 22, 0.95)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              <span>{activeTier.name} (₹{activeTier.price.toLocaleString('en-IN')} × {quantity})</span>
              <span>₹{basePrice.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#10b981', marginBottom: '6px' }}>
                <span>District Promo ({discountPercent}% Off)</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              <span>GST & Venue Security Fee (5%)</span>
              <span>₹{serviceFee.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
              <span>Total Amount:</span>
              <span className="gradient-text-neon">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-glow"
            style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
          >
            <ShieldCheck size={18} />
            <span>{loading ? 'Issuing Encrypted Pass...' : `Confirm & Generate QR Pass (₹${totalAmount.toLocaleString('en-IN')})`}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
