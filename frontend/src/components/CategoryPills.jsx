import React from 'react';
import { useEvents } from '../context/EventContext';
import { Music, Cpu, Moon, Palette, Utensils, Trophy, PartyPopper, BookOpen, Layers } from 'lucide-react';

export const CategoryPills = () => {
  const { selectedCategory, setSelectedCategory, categoriesList } = useEvents();

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Music & Concerts': return <Music size={15} />;
      case 'Tech & Innovation': return <Cpu size={15} />;
      case 'Nightlife & Clubs': return <Moon size={15} />;
      case 'Arts & Theatre': return <Palette size={15} />;
      case 'Food & Culinary': return <Utensils size={15} />;
      case 'Sports & Fitness': return <Trophy size={15} />;
      case 'District Festivals': return <PartyPopper size={15} />;
      case 'Workshops': return <BookOpen size={15} />;
      default: return <Layers size={15} />;
    }
  };

  const defaultCategories = [
    'All Categories',
    'Music & Concerts',
    'Tech & Innovation',
    'Nightlife & Clubs',
    'Arts & Theatre',
    'Food & Culinary',
    'Sports & Fitness',
    'District Festivals',
  ];

  const list = categoriesList.length > 0 ? categoriesList : defaultCategories;

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      overflowX: 'auto',
      padding: '4px 0 16px 0',
      scrollbarWidth: 'none',
    }}>
      {list.map((cat) => {
        const active = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: 'var(--radius-sm)',
              background: active ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              color: active ? '#a5b4fc' : 'var(--text-secondary)',
              border: active ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-glass)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            {getCategoryIcon(cat)}
            <span>{cat}</span>
          </button>
        );
      })}
    </div>
  );
};
