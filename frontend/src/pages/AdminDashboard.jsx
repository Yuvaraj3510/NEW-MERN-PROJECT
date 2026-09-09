import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { adminAPI, eventAPI } from '../services/api';
import { 
  Shield, 
  DollarSign, 
  Ticket, 
  Users, 
  Calendar, 
  TrendingUp, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  QrCode, 
  Search,
  Sparkles,
  CheckCircle,
  Clock
} from 'lucide-react';

export const AdminDashboard = ({ setActivePage, onSelectEvent }) => {
  const { user, isAdmin } = useAuth();
  const { events, refreshEvents, setActiveTicketPass, showToast } = useEvents();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'events', 'bookings', 'users'
  const [stats, setStats] = useState(null);
  const [allBookings, setAllBookings] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingSearch, setBookingSearch] = useState('');

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, bookingsRes, usersRes] = await Promise.all([
        adminAPI.getAnalytics(),
        adminAPI.getBookings(),
        adminAPI.getUsers(),
      ]);

      if (analyticsRes?.success) setStats(analyticsRes.stats);
      if (bookingsRes?.success) setAllBookings(bookingsRes.data || []);
      if (usersRes?.success) setAllUsers(usersRes.data || []);
    } catch (err) {
      console.error('Load admin data error:', err);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event from the district catalog?')) return;

    try {
      const res = await eventAPI.delete(id);
      if (res.success) {
        showToast('Event removed successfully', 'success');
        refreshEvents();
        loadAdminData();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  if (!isAdmin) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <Shield size={48} color="#f43f5e" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '10px' }}>Admin Access Required</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Please sign in with administrator or event organizer credentials.
        </p>
        <button onClick={() => setActivePage('login')} className="btn btn-primary">
          Sign In as Admin
        </button>
      </div>
    );
  }

  const filteredBookings = allBookings.filter((b) => {
    const s = bookingSearch.toLowerCase();
    return (
      b.bookingReference?.toLowerCase().includes(s) ||
      b.attendeeInfo?.fullName?.toLowerCase().includes(s) ||
      b.event?.title?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '80px', paddingTop: '20px' }}>
      
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '32px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-featured">
              <Shield size={12} /> Management Portal
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>DistrictPulse Administration</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Real-time event performance, ticketing metrics, revenue statistics and attendee logs.
          </p>
        </div>

        <button 
          onClick={() => setActivePage('create-event')} 
          className="btn btn-glow"
          style={{ padding: '12px 22px' }}
        >
          <PlusCircle size={18} />
          <span>Publish New Event</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '36px',
      }}>
        {/* Total Revenue */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Revenue</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={18} color="#10b981" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>
            ₹{stats?.totalRevenue ? Number(stats.totalRevenue).toLocaleString('en-IN') : '0'}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <TrendingUp size={13} /> +18.4% this month
          </div>
        </div>

        {/* Passes Sold */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Tickets Sold</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ticket size={18} color="var(--accent-primary)" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>
            {stats?.totalTicketsSold || '0'}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>
            Across {stats?.totalEvents || events.length} active events
          </div>
        </div>

        {/* Active Events */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Active Events</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={18} color="var(--accent-cyan)" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>
            {stats?.totalEvents || events.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            In 6 Metro Districts
          </div>
        </div>

        {/* Total Users */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Registered Users</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} color="#f59e0b" />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff' }}>
            {stats?.totalUsers || allUsers.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#10b981', marginTop: '4px' }}>
            {stats?.occupancyRate || '80%'} avg event occupancy
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div style={{
        display: 'flex',
        gap: '10px',
        borderBottom: '1px solid var(--border-glass)',
        paddingBottom: '12px',
        marginBottom: '28px',
      }}>
        {[
          { id: 'overview', label: 'Overview & Events', icon: <Calendar size={16} /> },
          { id: 'bookings', label: `Attendee Bookings (${allBookings.length})`, icon: <Ticket size={16} /> },
          { id: 'users', label: `Users Directory (${allUsers.length})`, icon: <Users size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              background: activeTab === tab.id ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.04)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & Events Table */}
      {activeTab === 'overview' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>District Events Catalog</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{events.length} listed events</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>Event</th>
                  <th style={{ padding: '12px' }}>District</th>
                  <th style={{ padding: '12px' }}>Date</th>
                  <th style={{ padding: '12px' }}>Tiers</th>
                  <th style={{ padding: '12px' }}>Rating</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev._id || ev.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={ev.bannerImage} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: '#ffffff' }}>{ev.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ev.venue?.name}</div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <span className="badge badge-district" style={{ fontSize: '0.7rem' }}>{ev.district}</span>
                    </td>
                    <td style={{ padding: '14px 12px', color: 'var(--text-secondary)' }}>
                      {new Date(ev.startDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '14px 12px', color: '#a5b4fc' }}>
                      {ev.ticketTiers?.length || 1} Tiers
                    </td>
                    <td style={{ padding: '14px 12px', color: '#fcd34d', fontWeight: 700 }}>
                      ★ {ev.rating || 4.9}
                    </td>
                    <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          onClick={() => onSelectEvent(ev)}
                          className="btn btn-secondary"
                          style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(ev._id || ev.id)}
                          className="btn btn-danger"
                          style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Bookings & Attendees */}
      {activeTab === 'bookings' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Attendee Passes & Verification</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
              <Search size={16} color="var(--text-muted)" style={{ marginRight: '8px' }} />
              <input 
                type="text"
                placeholder="Search by Ref or Attendee..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>Pass Ref</th>
                  <th style={{ padding: '12px' }}>Attendee</th>
                  <th style={{ padding: '12px' }}>Event</th>
                  <th style={{ padding: '12px' }}>Tier / Qty</th>
                  <th style={{ padding: '12px' }}>Amount</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>QR Pass</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b._id || b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '14px 12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      {b.bookingReference}
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ fontWeight: 700, color: '#ffffff' }}>{b.attendeeInfo?.fullName || 'Guest'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.attendeeInfo?.email}</div>
                    </td>
                    <td style={{ padding: '14px 12px', color: 'var(--text-secondary)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {b.event?.title || 'District Event'}
                    </td>
                    <td style={{ padding: '14px 12px', color: '#a5b4fc' }}>
                      {b.tierName} (x{b.quantity})
                    </td>
                    <td style={{ padding: '14px 12px', fontWeight: 800, color: '#ffffff' }}>
                      ₹{Number(b.totalAmount || 0).toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <span className="badge badge-featured" style={{ fontSize: '0.7rem' }}>
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                      <button
                        onClick={() => setActiveTicketPass(b)}
                        className="btn btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        <QrCode size={13} />
                        <span>Pass</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Users */}
      {activeTab === 'users' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>Registered Platform Members</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {allUsers.map((u) => (
              <div key={u._id || u.id} style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={u.avatar} alt="" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#ffffff' }}>{u.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                    <span className="badge badge-district" style={{ fontSize: '0.65rem' }}>{u.role}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{u.districtPreference}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
