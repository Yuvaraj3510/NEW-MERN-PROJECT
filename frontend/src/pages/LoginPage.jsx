import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import { Sparkles, Shield, User, Lock, Mail, MapPin, Zap, ArrowRight } from 'lucide-react';

export const LoginPage = ({ setActivePage }) => {
  const { login, register, loginAsDemo } = useAuth();
  const { districtsList, showToast } = useEvents();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [districtPreference, setDistrictPreference] = useState('Bengaluru Tech & Silicon Corridor');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (res.success) {
          showToast(`Welcome back, ${res.user.name.split(' ')[0]}!`, 'success');
          setActivePage('home');
        } else {
          showToast(res.message || 'Login failed', 'error');
        }
      } else {
        const res = await register({
          name,
          email,
          password,
          districtPreference,
        });
        if (res.success) {
          showToast(`Account created! Welcome to DistrictPulse, ${res.user.name}!`, 'success');
          setActivePage('home');
        } else {
          showToast(res.message || 'Registration failed', 'error');
        }
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role) => {
    setLoading(true);
    const res = await loginAsDemo(role);
    if (res.success) {
      showToast(`Logged in as Demo ${role === 'admin' ? 'District Administrator (Aarav Sharma)' : 'Explorer User (Rohan Verma)'}`, 'success');
      setActivePage(role === 'admin' ? 'admin' : 'home');
    } else {
      showToast(res.message || 'Demo login failed', 'error');
    }
    setLoading(false);
  };

  return (
    <div className="container animate-fade-in" style={{
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '36px',
          background: '#0d1424',
          border: '1px solid rgba(99, 102, 241, 0.35)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), var(--shadow-neon)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-cyan) 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
          }}>
            <Sparkles size={24} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            {mode === 'login' ? 'Sign in to DistrictPulse' : 'Create an Account'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {mode === 'login' ? 'Access your smart passes & district bookmarks' : 'Join thousands discovering metro experiences'}
          </p>
        </div>

        {/* 1-Click Fast Demo Credentials Bar */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            ⚡ 1-Click Quick Demo Access
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleQuickDemo('user')}
              disabled={loading}
              className="btn btn-secondary"
              style={{ fontSize: '0.82rem', padding: '8px 10px' }}
            >
              <User size={14} />
              <span>Rohan Verma (User)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              disabled={loading}
              className="btn"
              style={{
                fontSize: '0.82rem',
                padding: '8px 10px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <Shield size={14} />
              <span>Aarav Sharma (Admin)</span>
            </button>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: 'var(--radius-md)',
          padding: '4px',
          marginBottom: '24px',
        }}>
          <button
            onClick={() => setMode('login')}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: mode === 'login' ? 'var(--accent-primary)' : 'transparent',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: mode === 'register' ? 'var(--accent-primary)' : 'transparent',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Register
          </button>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Ananya Iyer"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-control"
              />
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. rohan@districtpulse.in"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-control"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-control"
            />
          </div>

          {mode === 'register' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Preferred Metro District
              </label>
              <select
                value={districtPreference}
                onChange={(e) => setDistrictPreference(e.target.value)}
                className="input-control"
                style={{ cursor: 'pointer' }}
              >
                {districtsList.map((d) => (
                  <option key={d.name} value={d.name} style={{ background: '#0f172a' }}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.98rem' }}
          >
            <span>{loading ? 'Processing...' : mode === 'login' ? 'Sign In to Hub' : 'Create Account'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

      </div>
    </div>
  );
};
