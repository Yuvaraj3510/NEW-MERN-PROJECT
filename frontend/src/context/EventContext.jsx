import React, { createContext, useContext, useState, useEffect } from 'react';
import { eventAPI } from '../services/api';
import { allDistrictEvents } from '../services/eventsData';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(allDistrictEvents);
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const initialDistricts = [
    { name: 'Bengaluru Tech & Silicon Corridor', tagline: 'Koramangala, Indiranagar & Palace Grounds', badge: 'Tech Hub', accentColor: '#06b6d4' },
    { name: 'Mumbai Marine Drive & South Bombay', tagline: 'Worli NSCI Dome, Bandra & Sea Link', badge: 'Bollywood & Coastal', accentColor: '#6366f1' },
    { name: 'Delhi NCR & Heritage Cultural Quarter', tagline: 'Connaught Place, IHC & Chandni Chowk', badge: 'Heritage & Food', accentColor: '#f59e0b' },
    { name: 'Goa Coastal & Beachside District', tagline: 'Vagator Sunburn, Anjuna & Morjim Beach', badge: 'Beach & EDM', accentColor: '#10b981' },
    { name: 'Hyderabad Cyberabad & HITEC City', tagline: 'Gachibowli Stadium, Shilparamam & T-Hub', badge: 'Biryani & Esports', accentColor: '#ec4899' },
    { name: 'Jaipur & Rajasthan Heritage Quarter', tagline: 'Amber Fort, Diggi Palace JLF & Bazaars', badge: 'Royal Heritage', accentColor: '#8b5cf6' },
    { name: 'Kolkata Cultural & Park Street Quarter', tagline: 'Victoria Memorial, Nicco Park & Salt Lake', badge: 'Arts & Culture', accentColor: '#f43f5e' },
    { name: 'Chennai Coastal & Music Quarter', tagline: 'Marina Beach, Kalakshetra & ECR', badge: 'Classical & Coastal', accentColor: '#14b8a6' },
  ];

  const initialCategories = [
    'All Categories',
    'Music & Concerts',
    'Tech & Innovation',
    'Nightlife & Clubs',
    'Arts & Theatre',
    'Food & Culinary',
    'Sports & Fitness',
    'District Festivals',
    'Workshops',
  ];

  const [districtsList, setDistrictsList] = useState(initialDistricts);
  const [categoriesList, setCategoriesList] = useState(initialCategories);

  // Modal states
  const [bookingModalEvent, setBookingModalEvent] = useState(null);
  const [activeTicketPass, setActiveTicketPass] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch districts metadata
  const fetchDistricts = async () => {
    try {
      const res = await eventAPI.getDistrictsMeta();
      if (res?.success && res.districts?.length > 0) {
        setDistrictsList(res.districts);
        setCategoriesList(res.categories);
      }
    } catch (err) {
      console.warn('Districts meta fallback active');
    }
  };

  const fetchEvents = async (customParams = {}) => {
    try {
      const params = {
        district: selectedDistrict,
        category: selectedCategory,
        search: searchQuery,
        ...customParams,
      };
      const res = await eventAPI.getAll(params);
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setEvents(res.data);
        return;
      }
    } catch (err) {
      // If network call fails or backend restarted, filter from rich local dataset seamlessly
    }

    // High performance fallback filter
    let filtered = [...allDistrictEvents];
    if (selectedDistrict && selectedDistrict !== 'All Districts') {
      filtered = filtered.filter((e) => e.district.toLowerCase() === selectedDistrict.toLowerCase());
    }
    if (selectedCategory && selectedCategory !== 'All Categories') {
      filtered = filtered.filter((e) => e.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (searchQuery) {
      const s = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(s) ||
          e.description.toLowerCase().includes(s) ||
          e.tags?.some((t) => t.toLowerCase().includes(s)) ||
          e.venue?.name?.toLowerCase().includes(s)
      );
    }
    setEvents(filtered);
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [selectedDistrict, selectedCategory, searchQuery]);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        selectedDistrict,
        setSelectedDistrict,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        districtsList,
        categoriesList,
        bookingModalEvent,
        setBookingModalEvent,
        activeTicketPass,
        setActiveTicketPass,
        toast,
        showToast,
        refreshEvents: fetchEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
