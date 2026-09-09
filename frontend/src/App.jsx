import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TicketModal } from './components/TicketModal';
import { TicketPass } from './components/TicketPass';
import { Notification } from './components/Notification';

// Pages
import { HomePage } from './pages/HomePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { WishlistPage } from './pages/WishlistPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { CreateEventPage } from './pages/CreateEventPage';

const AppContent = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setActivePage('event-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDiscovery = () => {
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Navigation */}
      <Navbar activePage={activePage} setActivePage={handleNavigate} />

      {/* Main Content Dynamic Routing */}
      <main style={{ flex: 1 }}>
        {activePage === 'home' && (
          <HomePage 
            onSelectEvent={handleSelectEvent} 
            setActivePage={handleNavigate} 
          />
        )}

        {activePage === 'event-detail' && (
          <EventDetailPage 
            event={selectedEvent} 
            onBack={handleBackToDiscovery} 
          />
        )}

        {activePage === 'bookings' && (
          <MyBookingsPage 
            setActivePage={handleNavigate} 
            onSelectEvent={handleSelectEvent} 
          />
        )}

        {activePage === 'wishlist' && (
          <WishlistPage 
            setActivePage={handleNavigate} 
            onSelectEvent={handleSelectEvent} 
          />
        )}

        {activePage === 'login' && (
          <LoginPage 
            setActivePage={handleNavigate} 
          />
        )}

        {activePage === 'admin' && (
          <AdminDashboard 
            setActivePage={handleNavigate} 
            onSelectEvent={handleSelectEvent} 
          />
        )}

        {activePage === 'create-event' && (
          <CreateEventPage 
            setActivePage={handleNavigate} 
            onSelectEvent={handleSelectEvent} 
          />
        )}
      </main>

      {/* Global Modals & Overlays */}
      <TicketModal />
      <TicketPass />
      <Notification />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <AppContent />
      </EventProvider>
    </AuthProvider>
  );
}
