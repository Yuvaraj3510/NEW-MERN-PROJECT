import React from 'react';
import { Sparkles, MapPin, ShieldCheck, HeartHandshake, Mail, Github, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      marginTop: '80px',
      borderTop: '1px solid var(--border-glass)',
      background: 'rgba(9, 13, 22, 0.95)',
      paddingTop: '60px',
      paddingBottom: '40px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '50px',
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-cyan) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Sparkles size={18} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>District<span className="gradient-text-neon">Pulse</span></span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>
              The modern district-wide event management, live discovery, and real-time smart QR ticketing ecosystem powered by the MERN Stack.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="badge badge-district"><ShieldCheck size={12} /> Verified Tickets</span>
              <span className="badge badge-category"><HeartHandshake size={12} /> Zero Resale Gouging</span>
            </div>
          </div>

          {/* Districts Col */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-glow)', marginBottom: '16px' }}>
              Metro Districts
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              <li>Downtown Arts District</li>
              <li>Silicon Tech Bay</li>
              <li>Marina Waterfront Pier</li>
              <li>Historic Cultural Quarter</li>
              <li>Midtown Arena & Colosseum</li>
              <li>Riverside Parkside</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-glow)', marginBottom: '16px' }}>
              Platform Features
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              <li>Dynamic QR Ticket Passes</li>
              <li>Multi-Tier Seat Management</li>
              <li>Organizer Analytics Engine</li>
              <li>Instant Confirmation & PDF Passes</li>
              <li>RESTful API & JWT Security</li>
            </ul>
          </div>

          {/* Newsletter / Stay in the loop */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-glow)', marginBottom: '16px' }}>
              District Newsletter
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px' }}>
              Get weekly curated drops of secret gigs, rooftop raves, and VIP ticket presales in your district.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="input-control" 
                style={{ padding: '8px 12px', fontSize: '0.85rem' }} 
              />
              <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-glass)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          color: 'var(--text-muted)',
          fontSize: '0.82rem',
        }}>
          <div>
            © 2026 DistrictPulse MERN Project. Designed for modern event management.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>MongoDB</span>
            <span>Express.js</span>
            <span>React.js</span>
            <span>Node.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
