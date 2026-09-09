import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2,
  Train, 
  Car, 
  Accessibility,
  Compass
} from 'lucide-react';

export const VenueMap = ({ event }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const venue = event?.venue || {
    name: 'District Arena & Convention Pavilion',
    address: '100 Metro Boulevard',
    city: 'Metro District',
    coordinates: { lat: 37.7749, lng: -122.4194 },
  };

  // Get district-specific coordinates if not provided
  const getCoordinates = () => {
    if (venue.coordinates?.lat && venue.coordinates?.lng) {
      return venue.coordinates;
    }
    const d = (event?.district || '').toLowerCase();
    if (d.includes('arts') || d.includes('downtown')) return { lat: 37.7749, lng: -122.4194 };
    if (d.includes('tech') || d.includes('silicon')) return { lat: 37.7833, lng: -122.4167 };
    if (d.includes('marina') || d.includes('waterfront')) return { lat: 37.8080, lng: -122.4177 };
    if (d.includes('historic') || d.includes('cultural')) return { lat: 37.7915, lng: -122.4045 };
    if (d.includes('midtown') || d.includes('arena')) return { lat: 37.7680, lng: -122.3920 };
    if (d.includes('riverside')) return { lat: 37.7550, lng: -122.4200 };
    return { lat: 37.7749, lng: -122.4194 };
  };

  const coords = getCoordinates();
  const fullAddress = `${venue.name}, ${venue.address || ''}, ${venue.city || event?.district || 'Metro City'}`;
  
  // Real Google Maps navigation URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  
  // OpenStreetMap Interactive Embed URL
  const bboxDelta = 0.008;
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - bboxDelta}%2C${coords.lat - bboxDelta}%2C${coords.lng + bboxDelta}%2C${coords.lat + bboxDelta}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`;

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Navigation size={18} color="var(--accent-cyan)" />
          <span>Real Venue & District Map</span>
        </h3>

        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-glass)',
            borderRadius: '6px',
            padding: '4px 8px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
          }}
          title={expanded ? 'Minimize Map' : 'Expand Map View'}
        >
          {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          <span>{expanded ? 'Collapse' : 'Expand'}</span>
        </button>
      </div>

      {/* Real Interactive Map Iframe Container */}
      <div style={{
        height: expanded ? '380px' : '230px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)',
        marginBottom: '16px',
        transition: 'height 0.3s ease',
      }}>
        <iframe
          title="Interactive Venue Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={osmUrl}
          style={{
            filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(110%)',
            border: 0,
            display: 'block',
          }}
        />

        {/* Live GPS Coordinates Overlay Badge */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          background: 'rgba(9, 13, 22, 0.88)',
          backdropFilter: 'blur(8px)',
          padding: '4px 10px',
          borderRadius: '6px',
          border: '1px solid var(--border-glass)',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--accent-cyan)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Compass size={12} />
          <span>{coords.lat.toFixed(4)}° N, {Math.abs(coords.lng).toFixed(4)}° W</span>
        </div>
      </div>

      {/* Venue Address Info */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
              {venue.name}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
              <span>{venue.address || 'Metro District Avenue'}</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', paddingLeft: '18px' }}>
              {venue.city || 'Metro City'} • {event?.district}
            </div>
          </div>

          <button
            onClick={handleCopyAddress}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-glass)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: copied ? '#10b981' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Transit & Parking Details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        background: 'rgba(255, 255, 255, 0.02)',
        padding: '12px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-glass)',
        marginBottom: '16px',
        fontSize: '0.78rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
          <Train size={15} color="var(--accent-primary)" />
          <span>Metro Line 4 / Express Station</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
          <Car size={15} color="#10b981" />
          <span>On-Site Secure Parking</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', gridColumn: 'span 2' }}>
          <Accessibility size={15} color="#f59e0b" />
          <span>100% Step-Free Accessible Entrance</span>
        </div>
      </div>

      {/* Live Google Maps Directions CTA */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-glow"
        style={{
          width: '100%',
          padding: '10px 16px',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          textDecoration: 'none',
        }}
      >
        <span>Open in Google Maps / Get Live Directions</span>
        <ExternalLink size={15} />
      </a>

    </div>
  );
};
