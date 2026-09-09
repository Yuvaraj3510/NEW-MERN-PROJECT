import React from 'react';
import { useEvents } from '../context/EventContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Notification = () => {
  const { toast } = useEvents();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} color="#10b981" />;
      case 'error':
        return <AlertCircle size={18} color="#f43f5e" />;
      default:
        return <Info size={18} color="#06b6d4" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return 'rgba(16, 185, 129, 0.4)';
      case 'error': return 'rgba(244, 63, 94, 0.4)';
      default: return 'rgba(6, 182, 212, 0.4)';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 1100,
      background: '#0f172a',
      border: `1px solid ${getBorderColor()}`,
      borderRadius: 'var(--radius-md)',
      padding: '14px 20px',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#ffffff',
      fontSize: '0.9rem',
      fontWeight: 500,
    }} className="animate-fade-in">
      {getIcon()}
      <span>{toast.message}</span>
    </div>
  );
};
