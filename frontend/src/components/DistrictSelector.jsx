import React from 'react';
import { useEvents } from '../context/EventContext';
import { MapPin, Sparkles, Cpu, Anchor, Landmark, Zap, Trees, Compass } from 'lucide-react';

export const DistrictSelector = () => {
  const { selectedDistrict, setSelectedDistrict, districtsList } = useEvents();

  const getDistrictIcon = (name) => {
    if (name.includes('Arts')) return <Sparkles size={16} />;
    if (name.includes('Tech')) return <Cpu size={16} />;
    if (name.includes('Waterfront')) return <Anchor size={16} />;
    if (name.includes('Cultural') || name.includes('Historic')) return <Landmark size={16} />;
    if (name.includes('Midtown') || name.includes('Arena')) return <Zap size={16} />;
    if (name.includes('Riverside')) return <Trees size={16} />;
    return <Compass size={16} />;
  };

  return (
    <div style={{ margin: '28px 0 20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={18} color="var(--accent-cyan)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Explore by Metro District</h3>
        </div>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          {selectedDistrict === 'All Districts' ? 'Showing all regions' : `Filtering: ${selectedDistrict}`}
        </span>
      </div>

      <div style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '8px',
        scrollbarWidth: 'none',
      }}>
        {/* All Districts pill */}
        <button
          onClick={() => setSelectedDistrict('All Districts')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            background: selectedDistrict === 'All Districts' ? 'linear-gradient(135deg, var(--accent-primary) 0%, #8b5cf6 100%)' : 'rgba(255,255,255,0.04)',
            color: selectedDistrict === 'All Districts' ? '#ffffff' : 'var(--text-secondary)',
            border: selectedDistrict === 'All Districts' ? '1px solid var(--accent-primary)' : '1px solid var(--border-glass)',
            fontWeight: 600,
            fontSize: '0.86rem',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: selectedDistrict === 'All Districts' ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none',
          }}
        >
          <Compass size={16} />
          <span>All Districts</span>
        </button>

        {districtsList.map((d) => {
          const isSelected = selectedDistrict === d.name;
          return (
            <button
              key={d.name}
              onClick={() => setSelectedDistrict(d.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                background: isSelected ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-cyan) 100%)' : 'rgba(255,255,255,0.04)',
                color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-glass)',
                fontWeight: 600,
                fontSize: '0.86rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 15px rgba(6, 182, 212, 0.4)' : 'none',
              }}
            >
              {getDistrictIcon(d.name)}
              <span>{d.name}</span>
              {d.badge && (
                <span style={{
                  fontSize: '0.68rem',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  background: isSelected ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.1)',
                  color: isSelected ? '#ffffff' : '#94a3b8'
                }}>
                  {d.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
