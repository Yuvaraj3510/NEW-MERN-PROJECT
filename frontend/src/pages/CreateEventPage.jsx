import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { eventAPI } from '../services/api';
import { ArrowLeft, Sparkles, Plus, Trash2, CheckCircle2, Image as ImageIcon } from 'lucide-react';

export const CreateEventPage = ({ setActivePage, onSelectEvent }) => {
  const { user } = useAuth();
  const { districtsList, categoriesList, refreshEvents, showToast } = useEvents();

  const [loading, setLoading] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Music & Concerts');
  const [district, setDistrict] = useState('Bengaluru Tech & Silicon Corridor');
  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [startDate, setStartDate] = useState('');
  const [doorsOpen, setDoorsOpen] = useState('18:00');
  const [bannerImage, setBannerImage] = useState('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80');
  const [tags, setTags] = useState('Concert, Live, India, Music');

  // Dynamic Ticket Tiers
  const [ticketTiers, setTicketTiers] = useState([
    { name: 'General Admission', price: 499, totalSeats: 500, availableSeats: 500, description: 'Standard Entry Pass', perks: ['Main Event Access'] },
    { name: 'VIP Pass', price: 1499, totalSeats: 100, availableSeats: 100, description: 'VIP Lounge & Fast Track', perks: ['Express Entrance', 'VIP Lounge Access'] },
  ]);

  const handleAddTier = () => {
    setTicketTiers([
      ...ticketTiers,
      { name: 'New Tier', price: 999, totalSeats: 200, availableSeats: 200, description: 'Tier description', perks: ['Perk 1'] },
    ]);
  };

  const handleRemoveTier = (index) => {
    if (ticketTiers.length <= 1) {
      showToast('Event must have at least one ticket tier', 'info');
      return;
    }
    setTicketTiers(ticketTiers.filter((_, idx) => idx !== index));
  };

  const handleTierChange = (index, field, value) => {
    const updated = [...ticketTiers];
    updated[index][field] = field === 'price' || field === 'totalSeats' || field === 'availableSeats' ? Number(value) : value;
    if (field === 'totalSeats') {
      updated[index].availableSeats = Number(value);
    }
    setTicketTiers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !venueName || !startDate) {
      showToast('Please fill out all mandatory fields', 'error');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title,
        tagline,
        description,
        category,
        district,
        venue: {
          name: venueName,
          address: venueAddress || `${venueName}, ${district}`,
          city: venueAddress.includes('Bengaluru') ? 'Bengaluru' : venueAddress.includes('Mumbai') ? 'Mumbai' : 'Bengaluru',
        },
        startDate: new Date(startDate),
        doorsOpen,
        bannerImage,
        ticketTiers,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        organizer: {
          name: user?.name || 'District Pulse India',
          avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          contactEmail: user?.email || 'organizer@districtpulse.in',
          verified: true,
        },
      };

      const res = await eventAPI.create(payload);
      if (res.success && res.data) {
        showToast('Event published successfully to district calendar! 🎉', 'success');
        refreshEvents();
        onSelectEvent(res.data);
      } else {
        throw new Error(res.message || 'Creation failed');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '80px', paddingTop: '20px' }}>
      
      <div style={{ marginBottom: '24px' }}>
        <button 
          onClick={() => setActivePage('admin')}
          className="btn btn-secondary"
          style={{ padding: '8px 14px', fontSize: '0.85rem', marginBottom: '16px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Admin Portal</span>
        </button>

        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Create & Publish District Event</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Add your event details, configure multi-tier ticket pricing, and activate scannable QR passes.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '840px' }}>
        
        {/* Section 1: Core Info */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text-glow)' }}>
            1. General Experience Information
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Event Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Bengaluru Pulse Electronic & Synthwave Festival 2026"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-control"
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Catchy Tagline / One-liner
            </label>
            <input
              type="text"
              placeholder="e.g. India's premier electronic audio spectacle with 360-degree laser mapping"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="input-control"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                District Location *
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="input-control"
              >
                {districtsList.map((d) => (
                  <option key={d.name} value={d.name} style={{ background: '#0f172a' }}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-control"
              >
                {categoriesList.filter((c) => c !== 'All Categories').map((cat) => (
                  <option key={cat} value={cat} style={{ background: '#0f172a' }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Detailed Description *
            </label>
            <textarea
              rows={4}
              placeholder="Describe the experience, headline performers, schedule, age limits, and special highlights..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-control"
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>

        {/* Section 2: Date, Venue & Media */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text-glow)' }}>
            2. Date, Venue & Media
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Event Date & Time *
              </label>
              <input
                type="datetime-local"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-control"
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Doors Open (e.g. 18:30)
              </label>
              <input
                type="text"
                placeholder="19:00"
                value={doorsOpen}
                onChange={(e) => setDoorsOpen(e.target.value)}
                className="input-control"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Venue Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Bengaluru Palace Grounds - Gate 4"
                required
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                className="input-control"
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Address / Landmark
              </label>
              <input
                type="text"
                placeholder="e.g. Jayachamaraja Road, Vasanth Nagar, Bengaluru"
                value={venueAddress}
                onChange={(e) => setVenueAddress(e.target.value)}
                className="input-control"
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Banner Image URL
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={bannerImage}
              onChange={(e) => setBannerImage(e.target.value)}
              className="input-control"
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Search Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="Electronic, Rave, Nightlife, Live"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="input-control"
            />
          </div>
        </div>

        {/* Section 3: Ticket Tiers */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-glow)' }}>
              3. Ticket Tiers & Capacity
            </h3>
            <button
              type="button"
              onClick={handleAddTier}
              className="btn btn-secondary"
              style={{ fontSize: '0.82rem', padding: '6px 14px' }}
            >
              <Plus size={14} />
              <span>Add Tier</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {ticketTiers.map((tier, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-glass)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>Tier #{idx + 1}</span>
                  {ticketTiers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTier(idx)}
                      style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tier Name</label>
                    <input
                      type="text"
                      value={tier.name}
                      onChange={(e) => handleTierChange(idx, 'name', e.target.value)}
                      className="input-control"
                      style={{ padding: '8px 12px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Price (₹)</label>
                    <input
                      type="number"
                      value={tier.price}
                      onChange={(e) => handleTierChange(idx, 'price', e.target.value)}
                      className="input-control"
                      style={{ padding: '8px 12px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Seats</label>
                    <input
                      type="number"
                      value={tier.totalSeats}
                      onChange={(e) => handleTierChange(idx, 'totalSeats', e.target.value)}
                      className="input-control"
                      style={{ padding: '8px 12px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tier Description & Perks</label>
                  <input
                    type="text"
                    value={tier.description}
                    onChange={(e) => handleTierChange(idx, 'description', e.target.value)}
                    className="input-control"
                    style={{ padding: '8px 12px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-glow"
          style={{ width: '100%', padding: '16px', fontSize: '1.05rem', fontWeight: 800 }}
        >
          <Sparkles size={20} />
          <span>{loading ? 'Publishing Event...' : 'Publish to District Calendar'}</span>
        </button>

      </form>

    </div>
  );
};
