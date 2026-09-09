export const allDistrictEvents = [
  // =========================================================================
  // 1. BENGALURU TECH & SILICON CORRIDOR (KORAMANGALA / INDIRANAGAR / WHITEFIELD)
  // =========================================================================
  {
    _id: '6620a2222222222222222201',
    id: '6620a2222222222222222201',
    title: 'Bengaluru Pulse Electronic & Synthwave Festival 2026',
    slug: 'bengaluru-electronic-festival-2026',
    tagline: 'India\'s premier electronic audio spectacle with 360-degree laser mapping.',
    description: 'Experience India\'s largest open-air electronic gathering at Bengaluru Palace Grounds. Top national and global DJ headliners, curated food streets with authentic South & North Indian culinary pop-ups, and immersive visual domes.',
    category: 'Music & Concerts',
    district: 'Bengaluru Tech & Silicon Corridor',
    venue: {
      name: 'Bengaluru Palace Grounds - Gate 4',
      address: 'Jayachamaraja Road, Vasanth Nagar, Bengaluru, Karnataka 560052',
      city: 'Bengaluru',
      coordinates: { lat: 12.9982, lng: 77.5921 },
    },
    startDate: new Date(Date.now() + 86400000 * 3),
    doorsOpen: '17:00',
    bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'SteppinOut & Sunburn India', contactEmail: 'events@sunburnindia.com', verified: true },
    ticketTiers: [
      { name: 'Early Bird General Access', price: 999, totalSeats: 2500, availableSeats: 820, perks: ['Main Stage Entry', 'Food Village Access'] },
      { name: 'VIP Sky Deck Lounge', price: 2999, totalSeats: 400, availableSeats: 45, perks: ['Elevated VIP Deck', '2x Complimentary Drinks', 'Dedicated Fast Entry'] },
      { name: 'Artist Backstage Lounge', price: 6999, totalSeats: 60, availableSeats: 8, perks: ['Backstage Pass', 'Artist Meet & Greet', 'VIP Hospitality'] }
    ],
    featured: true, trending: true, rating: 4.92, reviewsCount: 340, tags: ['EDM', 'Bengaluru', 'Palace Grounds', 'Concert']
  },
  {
    _id: '6620a2222222222222222202',
    id: '6620a2222222222222222202',
    title: 'India AI & DeepTech Innovation Summit 2026',
    slug: 'india-ai-deeptech-summit-2026',
    tagline: 'Where 4,000+ Indian AI engineers, unicorn founders & venture capitalists converge.',
    description: 'India\'s flagship 2-day conference on Agentic AI, Indic LLMs, Semiconductor Startups, and Cloud Infrastructure. Keynotes by top Indian tech titans, live pitch finals with ₹5 Crore in venture prizes, and networking pavilions.',
    category: 'Tech & Innovation',
    district: 'Bengaluru Tech & Silicon Corridor',
    venue: {
      name: 'BIEC - Bengaluru International Exhibition Centre',
      address: '10th Mile, Tumkur Road, Madavara Post, Bengaluru, Karnataka 562123',
      city: 'Bengaluru',
      coordinates: { lat: 13.0617, lng: 77.4754 },
    },
    startDate: new Date(Date.now() + 86400000 * 7),
    doorsOpen: '08:30',
    bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'TechSparks & Frontier India', contactEmail: 'summit@techsparks.in', verified: true },
    ticketTiers: [
      { name: 'Developer & Student Pass', price: 1499, totalSeats: 1500, availableSeats: 320, perks: ['All Technical Keynotes', 'Hackathon Entry', 'Lunch & Coffee'] },
      { name: 'Founder & VC Executive Pass', price: 5999, totalSeats: 500, availableSeats: 68, perks: ['Investor 1-on-1 Lounge', 'Exclusive Gala Dinner', 'Fast-Track Badge'] }
    ],
    featured: true, trending: true, rating: 4.88, reviewsCount: 195, tags: ['AI', 'Bengaluru', 'TechSparks', 'Startups']
  },
  {
    _id: '6620a2222222222222222203',
    id: '6620a2222222222222222203',
    title: 'Great Indian Craft Beer & Food Carnival Bengaluru',
    slug: 'bengaluru-craft-beer-food-carnival',
    tagline: '35+ artisanal microbreweries, Karnataka street food alley & live indie bands.',
    description: 'Celebrate Bengaluru as the Pub Capital of India! Taste fresh brews from Toit, Arbor, and Windmills alongside authentic Mangalorean ghee roast, Dosas, and international grills.',
    category: 'Food & Culinary',
    district: 'Bengaluru Tech & Silicon Corridor',
    venue: {
      name: 'Jaymahal Palace Hotel Lawns',
      address: '1 Jayamahal Main Road, Near Cantonment, Bengaluru, Karnataka 560046',
      city: 'Bengaluru',
      coordinates: { lat: 12.9972, lng: 77.5960 },
    },
    startDate: new Date(Date.now() + 86400000 * 5),
    doorsOpen: '13:00',
    bannerImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Bangalore Food Guild', contactEmail: 'cheers@blrcraftfest.in', verified: true },
    ticketTiers: [
      { name: 'Carnival Tasting Pass', price: 499, totalSeats: 2000, availableSeats: 720, perks: ['Entry + 4 Beer Tasting Coupons', 'Commemorative Mug'] },
      { name: 'Unlimited Sampling VIP Pass', price: 1899, totalSeats: 300, availableSeats: 45, perks: ['Unlimited Sampling (1pm-5pm)', 'VIP Seating Lounge'] }
    ],
    featured: false, trending: true, rating: 4.94, reviewsCount: 210, tags: ['Craft Beer', 'Food', 'Bengaluru', 'Carnival']
  },
  {
    _id: '6620a2222222222222222204',
    id: '6620a2222222222222222204',
    title: 'Indiranagar 100ft Road Midnight Rooftop Crawl',
    slug: 'indiranagar-rooftop-crawl',
    tagline: 'Access 4 premier rooftops in Indiranagar with guest DJs and complimentary shots.',
    description: 'Hop between top nightlife venues along 100ft Road with VIP priority access, dedicated hosts, and signature cocktails.',
    category: 'Nightlife & Clubs',
    district: 'Bengaluru Tech & Silicon Corridor',
    venue: {
      name: 'Indiranagar 100ft Road Hub',
      address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
      city: 'Bengaluru',
      coordinates: { lat: 12.9719, lng: 77.6412 },
    },
    startDate: new Date(Date.now() + 86400000 * 6),
    doorsOpen: '20:30',
    bannerImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Bangalore After Dark', contactEmail: 'crawl@blrnightlife.in', verified: true },
    ticketTiers: [
      { name: 'All-Access Club Crawl Pass', price: 899, totalSeats: 350, availableSeats: 90, perks: ['Entry to 4 Clubs', '4 Free Welcome Shots', 'Host Guide'] }
    ],
    featured: false, trending: true, rating: 4.85, reviewsCount: 125, tags: ['Nightlife', 'Indiranagar', 'Pub Crawl']
  },

  // =========================================================================
  // 2. MUMBAI MARINE DRIVE & SOUTH BOMBAY (BANDRA / NARIMAN POINT / WORLI)
  // =========================================================================
  {
    _id: '6620a2222222222222222205',
    id: '6620a2222222222222222205',
    title: 'Arijit Singh Symphony Live at NSCI Dome Mumbai',
    slug: 'arijit-singh-symphony-mumbai-2026',
    tagline: 'An unforgettable evening with 60 orchestral musicians & Bollywood\'s greatest voice.',
    description: 'India\'s most celebrated playback singer live at the world-class NSCI Dome Worli. Experience magical renditions of chartbuster romantic anthems and sufi ballads under grand acoustic production.',
    category: 'Music & Concerts',
    district: 'Mumbai Marine Drive & South Bombay',
    venue: {
      name: 'NSCI Dome - Sardar Vallabhbhai Patel Stadium',
      address: 'Lala Lajpatrai Marg, Lotus Colony, Worli, Mumbai, Maharashtra 400018',
      city: 'Mumbai',
      coordinates: { lat: 18.9772, lng: 72.8152 },
    },
    startDate: new Date(Date.now() + 86400000 * 8),
    doorsOpen: '18:00',
    bannerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Wizcraft & BookMyShow Live', contactEmail: 'tickets@mumbaiconcerts.in', verified: true },
    ticketTiers: [
      { name: 'Silver Tier Arena', price: 1499, totalSeats: 3000, availableSeats: 850, perks: ['Arena Seating', 'Great Acoustics'] },
      { name: 'Gold Fan Zone Pit', price: 3499, totalSeats: 1200, availableSeats: 180, perks: ['Close Proximity to Stage', 'Fan Gift Voucher'] },
      { name: 'Diamond VIP Lounge', price: 8999, totalSeats: 200, availableSeats: 18, perks: ['Front Row Sofa Seating', 'VIP Valet Parking', 'Dinner Buffet'] }
    ],
    featured: true, trending: true, rating: 4.98, reviewsCount: 620, tags: ['Bollywood', 'Arijit Singh', 'NSCI Dome', 'Mumbai']
  },
  {
    _id: '6620a2222222222222222206',
    id: '6620a2222222222222222206',
    title: 'Kala Ghoda Arts & Heritage Festival Mumbai',
    slug: 'kala-ghoda-arts-festival-2026',
    tagline: '9 days of vibrant street art, live theatre, literature, and heritage walks.',
    description: 'Asia\'s largest multidisciplinary street arts festival! Explore stunning visual art installations, open-air theatre at Horniman Circle Garden, stand-up comedy, and handicraft bazaars.',
    category: 'Arts & Theatre',
    district: 'Mumbai Marine Drive & South Bombay',
    venue: {
      name: 'Kala Ghoda Heritage Precinct & Amphitheatre',
      address: 'K. Dubash Marg, Fort, Mumbai, Maharashtra 400001',
      city: 'Mumbai',
      coordinates: { lat: 18.9298, lng: 72.8333 },
    },
    startDate: new Date(Date.now() + 86400000 * 12),
    doorsOpen: '10:00',
    bannerImage: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Kala Ghoda Association', contactEmail: 'info@kalaghodaarts.org', verified: true },
    ticketTiers: [
      { name: 'Festival Badge Pass', price: 299, totalSeats: 5000, availableSeats: 2200, perks: ['Entry to all 12 Art Zones', 'Heritage Map'] },
      { name: 'Curated Heritage Walk + High Tea', price: 1199, totalSeats: 80, availableSeats: 14, perks: ['2-hour Historian Guided Walk', 'High Tea at Taj Mahal Palace'] }
    ],
    featured: true, trending: false, rating: 4.95, reviewsCount: 310, tags: ['Kala Ghoda', 'Art Festival', 'South Bombay', 'Theatre']
  },
  {
    _id: '6620a2222222222222222207',
    id: '6620a2222222222222222207',
    title: 'Mumbai Midnight Coastal Marathon (Sea Link & Marine Drive)',
    slug: 'mumbai-midnight-coastal-marathon',
    tagline: 'Run 10K & 21K along Queen\'s Necklace under illuminated coastal lights.',
    description: 'An electrifying athletic night run starting at Marine Drive promenade, continuing across the illuminated Bandra-Worli Sea Link, backed by live Dhol-Tasha troupes at cheering checkpoints.',
    category: 'Sports & Fitness',
    district: 'Mumbai Marine Drive & South Bombay',
    venue: {
      name: 'Marine Drive Promenade & NCPA',
      address: 'Marine Drive, Nariman Point, Mumbai, Maharashtra 400021',
      city: 'Mumbai',
      coordinates: { lat: 18.9250, lng: 72.8220 },
    },
    startDate: new Date(Date.now() + 86400000 * 15),
    doorsOpen: '22:30',
    bannerImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Mumbai Road Runners Club', contactEmail: 'marathon@mumbairunners.in', verified: true },
    ticketTiers: [
      { name: '10K Runner Bib + DryFit Kit', price: 999, totalSeats: 3500, availableSeats: 940, perks: ['Timing Chip Bib', 'Official Finisher Medal', 'LED Glow Bands'] },
      { name: '21K Half Marathon Elite Pass', price: 1499, totalSeats: 1500, availableSeats: 310, perks: ['Half Marathon Entry', 'Finisher Jacket', 'Post-Race Breakfast'] }
    ],
    featured: false, trending: true, rating: 4.91, reviewsCount: 180, tags: ['Marathon', 'Marine Drive', 'Sea Link', 'Fitness']
  },

  // =========================================================================
  // 3. DELHI NCR & HERITAGE CULTURAL QUARTER (CP / JLN STADIUM / HAUZ KHAS)
  // =========================================================================
  {
    _id: '6620a2222222222222222208',
    id: '6620a2222222222222222208',
    title: 'Sufi & Qawwali Mystical Night at Nizamuddin Courtyard',
    slug: 'sufi-qawwali-night-delhi',
    tagline: 'Soul-stirring verses of Amir Khusrau by world-renowned Nizami Brothers.',
    description: 'Immerse in the timeless magic of traditional Sufi qawwali under candlelit arches. Experience powerful vocal harmonies, harmonium melodies, and divine poetry with fragrant rose petals and royal Awadhi kebabs.',
    category: 'Music & Concerts',
    district: 'Delhi NCR & Heritage Cultural Quarter',
    venue: {
      name: 'India Habitat Centre - Amphitheatre',
      address: 'Lodhi Road, Near Airforce Bal Bharati School, New Delhi, Delhi 110003',
      city: 'New Delhi',
      coordinates: { lat: 28.5900, lng: 77.2249 },
    },
    startDate: new Date(Date.now() + 86400000 * 9),
    doorsOpen: '18:30',
    bannerImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Spic Macay & Delhi Heritage Trust', contactEmail: 'sufi@delhiculture.org', verified: true },
    ticketTiers: [
      { name: 'Amphitheatre Seating', price: 599, totalSeats: 600, availableSeats: 140, perks: ['Amphitheatre Seat', 'Complimentary Kashmiri Kahwa'] },
      { name: 'Royal Baithak Front Carpet', price: 1599, totalSeats: 100, availableSeats: 16, perks: ['Front Row Baithak Cushion', 'Gourmet Kebab Platter'] }
    ],
    featured: true, trending: false, rating: 4.97, reviewsCount: 190, tags: ['Sufi', 'Qawwali', 'Delhi', 'Classical']
  },
  {
    _id: '6620a2222222222222222209',
    id: '6620a2222222222222222209',
    title: 'Old Delhi Chandni Chowk Royal Culinary Trail',
    slug: 'chandni-chowk-royal-culinary-trail',
    tagline: 'Savor legendary Paranthe Wali Gali, Karim\'s kebabs, rabri jalebis & Daulat Ki Chaat.',
    description: 'Guided by master culinary historians through the labyrinthine streets of Shahjahanabad. Taste authentic dishes crafted with recipes perfected across four centuries of Mughal culinary heritage.',
    category: 'Food & Culinary',
    district: 'Delhi NCR & Heritage Cultural Quarter',
    venue: {
      name: 'Chandni Chowk Heritage Gateway',
      address: 'Opposite Red Fort, Chandni Chowk, Old Delhi, Delhi 110006',
      city: 'New Delhi',
      coordinates: { lat: 28.6562, lng: 77.2310 },
    },
    startDate: new Date(Date.now() + 86400000 * 4),
    doorsOpen: '16:30',
    bannerImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Delhi Food Walks', contactEmail: 'trails@delhifoodwalks.com', verified: true },
    ticketTiers: [
      { name: 'Food Walker Pass (All 8 Tastings)', price: 799, totalSeats: 35, availableSeats: 8, perks: ['8 Iconic Heritage Tastings', 'E-Rickshaw Ride', 'Bottled Mineral Water'] }
    ],
    featured: false, trending: true, rating: 4.96, reviewsCount: 145, tags: ['Street Food', 'Old Delhi', 'Mughlai', 'Culinary']
  },
  {
    _id: '6620a2222222222222222210',
    id: '6620a2222222222222222210',
    title: 'Delhi Comic Con & Pop Culture Arena 2026',
    slug: 'delhi-comic-con-2026',
    tagline: 'India\'s greatest pop culture, anime, gaming & cosplay championship.',
    description: 'Meet comic artists, voice actors, experience massive gaming zones from Sony & Xbox, and witness India\'s Grand National Cosplay Finals with over ₹10 Lakhs in prizes.',
    category: 'District Festivals',
    district: 'Delhi NCR & Heritage Cultural Quarter',
    venue: {
      name: 'NSIC Exhibition Grounds - Okhla',
      address: 'Okhla Industrial Estate, Phase III, New Delhi, Delhi 110020',
      city: 'New Delhi',
      coordinates: { lat: 28.5492, lng: 77.2687 },
    },
    startDate: new Date(Date.now() + 86400000 * 14),
    doorsOpen: '11:00',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Comic Con India', contactEmail: 'info@comicconindia.com', verified: true },
    ticketTiers: [
      { name: 'Single Day Pass', price: 899, totalSeats: 4000, availableSeats: 1200, perks: ['All Exhibition Halls', 'Cosplay Stage Entry', 'Goodie Bag'] },
      { name: 'SuperFan 3-Day VIP Pass', price: 2499, totalSeats: 500, availableSeats: 70, perks: ['3-Day Unlimited Entry', 'Exclusive Comic Merch', 'Fast Track Queue'] }
    ],
    featured: true, trending: true, rating: 4.89, reviewsCount: 280, tags: ['Comic Con', 'Gaming', 'Cosplay', 'Delhi']
  },

  // =========================================================================
  // 4. GOA COASTAL & BEACHSIDE DISTRICT (VAGATOR / ANJUNA / CALANGUTE)
  // =========================================================================
  {
    _id: '6620a2222222222222222211',
    id: '6620a2222222222222222211',
    title: 'Sunburn Festival Goa 2026: Beachside Mega Arena',
    slug: 'sunburn-festival-goa-2026',
    tagline: 'Asia\'s biggest dance music festival on the sun-drenched sands of Vagator.',
    description: '3 days of pure sonic euphoria on the Goan coast. 4 massive stages, 100+ top EDM producers, fire jugglers, bungee jumps, beach football tournaments, and sunset chillout stages.',
    category: 'Music & Concerts',
    district: 'Goa Coastal & Beachside District',
    venue: {
      name: 'Vagator Beach Arena & Cliff Grounds',
      address: 'Vagator Beach Road, Anjuna, Bardez, Goa 403509',
      city: 'Goa',
      coordinates: { lat: 15.5992, lng: 73.7380 },
    },
    startDate: new Date(Date.now() + 86400000 * 18),
    doorsOpen: '14:00',
    bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Sunburn Festival Official', contactEmail: 'goa@sunburn.in', verified: true },
    ticketTiers: [
      { name: 'Festival GA 3-Day Pass', price: 3499, totalSeats: 8000, availableSeats: 2100, perks: ['3-Day All Stage Access', 'Beach Village Entry'] },
      { name: 'VIP Sunset Deck Pass', price: 7999, totalSeats: 800, availableSeats: 110, perks: ['Elevated Cliffside Deck', 'Express Bar', 'VIP Parking'] },
      { name: 'VVIP Cabana Table for 6', price: 34999, totalSeats: 40, availableSeats: 5, perks: ['Private Luxury Cabana', 'Bottle Service Included', 'Dedicated Butler'] }
    ],
    featured: true, trending: true, rating: 4.96, reviewsCount: 850, tags: ['Sunburn', 'Goa', 'EDM', 'Beach Party']
  },
  {
    _id: '6620a2222222222222222212',
    id: '6620a2222222222222222212',
    title: 'Goa Sunset Catamaran & Bioluminescent Night Cruise',
    slug: 'goa-sunset-catamaran-cruise',
    tagline: 'Sail into Arabian sea sunsets with live saxophonist & Goan seafood barbecue.',
    description: 'Cruise along the Chapora river estuary into the open sea. Witness dolphins leaping at golden hour, followed by night music and fresh grilled prawns under starlit skies.',
    category: 'Nightlife & Clubs',
    district: 'Goa Coastal & Beachside District',
    venue: {
      name: 'Chapora River Jetty & Catamaran Pier',
      address: 'Chapora Fort Road, Siolim, Goa 403517',
      city: 'Goa',
      coordinates: { lat: 15.6050, lng: 73.7390 },
    },
    startDate: new Date(Date.now() + 86400000 * 7),
    doorsOpen: '16:30',
    bannerImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Goa Ocean Sailing Club', contactEmail: 'sail@goacatamaran.in', verified: true },
    ticketTiers: [
      { name: 'Sunset Cruise + 2 Cocktails', price: 1899, totalSeats: 120, availableSeats: 32, perks: ['3-Hour Cruise', 'Live Saxophone', 'Goan BBQ Sampler'] }
    ],
    featured: false, trending: true, rating: 4.93, reviewsCount: 140, tags: ['Yacht Cruise', 'Goa', 'Sunset', 'Nightlife']
  },
  {
    _id: '6620a2222222222222222213',
    id: '6620a2222222222222222213',
    title: 'Goa International Surfing & Stand-Up Paddle Cup',
    slug: 'goa-surfing-sup-cup-2026',
    tagline: 'India\'s top wave riders battle on the scenic breaks of Morjim and Ashwem.',
    description: 'Cheer on surfers catching Arabian sea swells. Includes beginner surf clinics, beach yoga sessions at dawn, and beach volleyball matches.',
    category: 'Sports & Fitness',
    district: 'Goa Coastal & Beachside District',
    venue: {
      name: 'Morjim Surf Beach & Club',
      address: 'Morjim Beach Road, Pernem, Goa 403512',
      city: 'Goa',
      coordinates: { lat: 15.6320, lng: 73.7340 },
    },
    startDate: new Date(Date.now() + 86400000 * 16),
    doorsOpen: '07:00',
    bannerImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Surfing Federation of India', contactEmail: 'comp@surfindia.org', verified: true },
    ticketTiers: [
      { name: 'Spectator Pass + Surf Clinic', price: 699, totalSeats: 300, availableSeats: 95, perks: ['1-Hour Beginner Surf Lesson', 'Surfboard Rental'] }
    ],
    featured: false, trending: false, rating: 4.88, reviewsCount: 65, tags: ['Surfing', 'Goa', 'Beach Sports', 'Fitness']
  },

  // =========================================================================
  // 5. HYDERABAD CYBERABAD & HITEC CITY (GACHIBOWLI / JUBILEE HILLS)
  // =========================================================================
  {
    _id: '6620a2222222222222222214',
    id: '6620a2222222222222222214',
    title: 'Hyderabad Dum Biryani & Royal Nizami Food Conclave',
    slug: 'hyderabad-dum-biryani-conclave',
    tagline: '50 master Ustads prepare royal mutton dum biryani, haleem & double ka meetha.',
    description: 'The ultimate celebration of Deccan gastronomy! Feast on authentic clay-pot dum biryanis from legendary Old City houses, Marag soup, Pathar ka Gosht, and Irani Chai.',
    category: 'Food & Culinary',
    district: 'Hyderabad Cyberabad & HITEC City',
    venue: {
      name: 'Shilparamam Arts & Cultural Village',
      address: 'HITEC City, Madhapur, Hyderabad, Telangana 500081',
      city: 'Hyderabad',
      coordinates: { lat: 17.4526, lng: 78.3780 },
    },
    startDate: new Date(Date.now() + 86400000 * 11),
    doorsOpen: '12:00',
    bannerImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Deccan Culinary Trust', contactEmail: 'biryani@hyderabadfood.in', verified: true },
    ticketTiers: [
      { name: 'Feast Wristband (5 Tastings)', price: 599, totalSeats: 2500, availableSeats: 820, perks: ['5 Royal Food Samplers', 'Irani Chai & Osmania Biscuit'] },
      { name: 'Nawabi Dastarkhwan (Family Table for 4)', price: 2499, totalSeats: 150, availableSeats: 28, perks: ['Full 7-Course Dastarkhwan', 'Reserved Seating'] }
    ],
    featured: true, trending: true, rating: 4.97, reviewsCount: 310, tags: ['Biryani', 'Hyderabad', 'Haleem', 'Nizami']
  },
  {
    _id: '6620a2222222222222222215',
    id: '6620a2222222222222222215',
    title: 'Gachibowli Esports Championship: Free Fire & BGMI Finals',
    slug: 'gachibowli-esports-championship-2026',
    tagline: 'India\'s top 16 gaming squads battle for ₹1.5 Crore on a 120-foot arena stage.',
    description: 'Experience roaring stadium esports at Gachibowli Indoor Stadium! Watch elite Indian BGMI and PC teams compete with live pro caster analysis, cosplay shows, and VR gaming arcades.',
    category: 'Sports & Fitness',
    district: 'Hyderabad Cyberabad & HITEC City',
    venue: {
      name: 'Gachibowli Indoor Stadium',
      address: 'Old Mumbai Highway, Gachibowli, Hyderabad, Telangana 500032',
      city: 'Hyderabad',
      coordinates: { lat: 17.4435, lng: 78.3489 },
    },
    startDate: new Date(Date.now() + 86400000 * 13),
    doorsOpen: '11:00',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Nodwin Gaming & Krafton India', contactEmail: 'arena@indiatournaments.in', verified: true },
    ticketTiers: [
      { name: 'Stadium Spectator Pass', price: 399, totalSeats: 4000, availableSeats: 1400, perks: ['Stadium Seating', 'Free Play Area Access'] },
      { name: 'Front Stage Player Pit Pass', price: 999, totalSeats: 500, availableSeats: 60, perks: ['Front Row Player Sightline', 'Official Jersey'] }
    ],
    featured: true, trending: false, rating: 4.85, reviewsCount: 160, tags: ['Esports', 'BGMI', 'Gaming', 'Hyderabad']
  },
  {
    _id: '6620a2222222222222222216',
    id: '6620a2222222222222222216',
    title: 'Cyberabad Autonomous Tech & Generative AI Hackathon',
    slug: 'cyberabad-genai-hackathon',
    tagline: '36-hour sprint building multilingual enterprise AI & FinTech solutions.',
    description: 'Hosted inside T-Hub 2.0, the world\'s largest startup incubator. High-speed compute, mentors from Google & Microsoft India, and venture funding for winning prototypes.',
    category: 'Workshops',
    district: 'Hyderabad Cyberabad & HITEC City',
    venue: {
      name: 'T-Hub 2.0 Innovation Complex',
      address: '20 Knowledge City, Madhapur, Hyderabad, Telangana 500081',
      city: 'Hyderabad',
      coordinates: { lat: 17.4360, lng: 78.3810 },
    },
    startDate: new Date(Date.now() + 86400000 * 20),
    doorsOpen: '09:00',
    bannerImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'T-Hub Hyderabad', contactEmail: 'hackathon@t-hub.co', verified: true },
    ticketTiers: [
      { name: 'Hacker Team Pass (Per Member)', price: 349, totalSeats: 250, availableSeats: 45, perks: ['Cloud Credits', '36h Meals & Energy Drinks', 'Prize Eligibility'] }
    ],
    featured: false, trending: false, rating: 4.91, reviewsCount: 55, tags: ['Hackathon', 'T-Hub', 'Hyderabad', 'AI']
  },

  // =========================================================================
  // 6. JAIPUR & RAJASTHAN HERITAGE QUARTER (AMBER FORT / DIGGI PALACE)
  // =========================================================================
  {
    _id: '6620a2222222222222222217',
    id: '6620a2222222222222222217',
    title: 'Jaipur International Literature & Arts Festival (JLF 2026)',
    slug: 'jaipur-literature-festival-2026',
    tagline: 'The world\'s greatest literary gathering inside royal pink city courtyards.',
    description: 'Join Nobel laureates, Booker Prize winners, historians, and thinkers under colorful shamianas at Diggi Palace. Features morning musical ragas, book signings, and evening heritage performances.',
    category: 'Arts & Theatre',
    district: 'Jaipur & Rajasthan Heritage Quarter',
    venue: {
      name: 'Hotel Diggi Palace & Lawns',
      address: 'Diggi House, Shivaji Marg, C Scheme, Jaipur, Rajasthan 302004',
      city: 'Jaipur',
      coordinates: { lat: 26.9070, lng: 75.8110 },
    },
    startDate: new Date(Date.now() + 86400000 * 22),
    doorsOpen: '09:00',
    bannerImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Teamwork Arts JLF', contactEmail: 'delegate@jlflitfest.org', verified: true },
    ticketTiers: [
      { name: 'General Delegate Pass', price: 499, totalSeats: 3000, availableSeats: 920, perks: ['All Literary Stages', 'Morning Music Access'] },
      { name: 'Royal Heritage Friend of Festival', price: 4999, totalSeats: 200, availableSeats: 24, perks: ['Private Delegate Lounge', 'Lunch with Authors', 'Evening Gala Dinner'] }
    ],
    featured: true, trending: true, rating: 4.99, reviewsCount: 420, tags: ['JLF', 'Jaipur', 'Literature', 'Heritage']
  },
  {
    _id: '6620a2222222222222222218',
    id: '6620a2222222222222222218',
    title: 'Amber Fort Royal Sound & Light Projection Spectacle',
    slug: 'amber-fort-sound-light-spectacle',
    tagline: '600 years of Rajput valor narrated by Amitabh Bachchan on the ancient fortress walls.',
    description: 'A magical night at Maota Lake beneath the illuminated Amber Fort. Visual storytelling projected across sandstone fortresses accompanied by Rajasthani folk musicians.',
    category: 'District Festivals',
    district: 'Jaipur & Rajasthan Heritage Quarter',
    venue: {
      name: 'Amber Fort & Palace Complex',
      address: 'Devisinghpura, Amer, Jaipur, Rajasthan 302001',
      city: 'Jaipur',
      coordinates: { lat: 26.9855, lng: 75.8513 },
    },
    startDate: new Date(Date.now() + 86400000 * 10),
    doorsOpen: '19:00',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Rajasthan Tourism Development', contactEmail: 'tourism@rajasthan.gov.in', verified: true },
    ticketTiers: [
      { name: 'Lake View Grandstand Seat', price: 299, totalSeats: 600, availableSeats: 180, perks: ['Prime Sightline Seat', 'Audio Headphone Receiver'] }
    ],
    featured: false, trending: false, rating: 4.92, reviewsCount: 175, tags: ['Amber Fort', 'Jaipur', 'Projection', 'Royal']
  },
  {
    _id: '6620a2222222222222222219',
    id: '6620a2222222222222222219',
    title: 'Traditional Block Printing & Blue Pottery Masterclass',
    slug: 'jaipur-block-printing-blue-pottery-workshop',
    tagline: 'Learn centuries-old Sanganeri hand block printing and glazed blue quartz pottery.',
    description: 'Hands-on masterclass led by national award-winning artisans. Print your own pure cotton Dupatta / Stole with natural vegetable dyes and shape blue pottery tiles to take home.',
    category: 'Workshops',
    district: 'Jaipur & Rajasthan Heritage Quarter',
    venue: {
      name: 'Anokhi Crafts & Heritage Studio',
      address: 'Kheri Gate, Amber, Jaipur, Rajasthan 302028',
      city: 'Jaipur',
      coordinates: { lat: 26.9890, lng: 75.8580 },
    },
    startDate: new Date(Date.now() + 86400000 * 14),
    doorsOpen: '10:30',
    bannerImage: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Jaipur Artisan Heritage Trust', contactEmail: 'crafts@jaipurarts.org', verified: true },
    ticketTiers: [
      { name: 'Workshop Seat + Material Kit', price: 899, totalSeats: 30, availableSeats: 7, perks: ['Pure Cotton Stole', 'Natural Dyes & Blocks', 'Take-Home Creation'] }
    ],
    featured: false, trending: false, rating: 4.97, reviewsCount: 48, tags: ['Handicraft', 'Jaipur', 'Workshop', 'Artisan']
  },

  // =========================================================================
  // 7. KOLKATA CULTURAL & PARK STREET QUARTER (VICTORIA MEMORIAL / SALT LAKE)
  // =========================================================================
  {
    _id: '6620a2222222222222222220',
    id: '6620a2222222222222222220',
    title: 'Kolkata Grand Durga Carnival & Dhunuchi Dance Arena',
    slug: 'kolkata-durga-carnival-dhunuchi-2026',
    tagline: 'UNESCO Intangible Heritage celebration with 1,000+ Dhak drummers & festive lights.',
    description: 'Witness the grand spectacle of Kolkata\'s iconic Durga Carnival at Red Road. Mesmerizing rhythmic Dhunuchi dance competitions, world-famous pandal artistic floats, and authentic Bengali sweets like Rosogolla and Sandesh.',
    category: 'District Festivals',
    district: 'Kolkata Cultural & Park Street Quarter',
    venue: {
      name: 'Red Road & Victoria Memorial Cultural Quad',
      address: 'Red Road, Maidan, Kolkata, West Bengal 700021',
      city: 'Kolkata',
      coordinates: { lat: 22.5448, lng: 88.3426 },
    },
    startDate: new Date(Date.now() + 86400000 * 17),
    doorsOpen: '16:00',
    bannerImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Bengal Heritage & Arts Trust', contactEmail: 'carnival@kolkataculture.in', verified: true },
    ticketTiers: [
      { name: 'Grandstand Viewer Pass', price: 349, totalSeats: 3500, availableSeats: 1100, perks: ['Reserved Bleacher Seat', 'Complimentary Mishti Box'] },
      { name: 'VIP Pavilion & High Tea Pass', price: 1299, totalSeats: 250, availableSeats: 38, perks: ['Covered Royal Pavilion', 'Bengali High Tea Buffet', 'VIP Parking'] }
    ],
    featured: true, trending: true, rating: 4.98, reviewsCount: 290, tags: ['Kolkata', 'Durga Carnival', 'Heritage', 'Culture']
  },
  {
    _id: '6620a2222222222222222221',
    id: '6620a2222222222222222221',
    title: 'Park Street Winter Jazz & Bangla Rock Festival',
    slug: 'park-street-jazz-rock-festival',
    tagline: 'Iconic live jazz legends & pioneering Bangla rock acts at Salt Lake Stadium Arena.',
    description: 'Kolkata\'s love affair with live music continues! 2 electrifying days with top Indian jazz quartets, saxophone masters, and legendary Bangla rock bands performing under night sky lasers.',
    category: 'Music & Concerts',
    district: 'Kolkata Cultural & Park Street Quarter',
    venue: {
      name: 'Nicco Park Big Lawns & Open Amphitheatre',
      address: 'HM Block, Sector IV, Bidhannagar, Kolkata, West Bengal 700106',
      city: 'Kolkata',
      coordinates: { lat: 22.5707, lng: 88.4237 },
    },
    startDate: new Date(Date.now() + 86400000 * 21),
    doorsOpen: '17:30',
    bannerImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Kolkata Music Society & Someplace Else', contactEmail: 'live@kolkatamusic.org', verified: true },
    ticketTiers: [
      { name: 'Rock & Jazz General Arena', price: 699, totalSeats: 2000, availableSeats: 640, perks: ['Amphitheatre Entry', 'Food Village Access'] },
      { name: 'Front Lounge Fan Pass', price: 1899, totalSeats: 300, availableSeats: 42, perks: ['Front Stage Seating', 'Complimentary Mocktails'] }
    ],
    featured: false, trending: true, rating: 4.89, reviewsCount: 130, tags: ['Jazz', 'Bangla Rock', 'Park Street', 'Kolkata']
  },

  // =========================================================================
  // 8. CHENNAI COASTAL & MUSIC QUARTER (MYLAPORE / ECR / MARINA BEACH)
  // =========================================================================
  {
    _id: '6620a2222222222222222222',
    id: '6620a2222222222222222222',
    title: 'Margazhi Classical Carnatic & Bharatanatyam Mahotsav',
    slug: 'margazhi-carnatic-bharatanatyam-mahotsav',
    tagline: 'Sublime divine ragas, mridangam jugalbandi & classical dance at The Music Academy.',
    description: 'Chennai\'s world-renowned December Music Season! Experience legendary Carnatic vocalists, veena virtusos, and classical Bharatanatyam exponents followed by authentic traditional Mylapore Sabha canteen feasts (Filter Coffee & Ghee Roast Dosai).',
    category: 'Arts & Theatre',
    district: 'Chennai Coastal & Music Quarter',
    venue: {
      name: 'The Music Academy Madras - Main Auditorium',
      address: '168 TTK Road, Royapettah, Alwarpet, Chennai, Tamil Nadu 600014',
      city: 'Chennai',
      coordinates: { lat: 13.0427, lng: 80.2548 },
    },
    startDate: new Date(Date.now() + 86400000 * 16),
    doorsOpen: '17:00',
    bannerImage: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'The Music Academy Madras & Kalakshetra', contactEmail: 'info@musicacademymadras.org', verified: true },
    ticketTiers: [
      { name: 'Balcony Classical Pass', price: 399, totalSeats: 800, availableSeats: 210, perks: ['Balcony Seating', 'Sabha Canteen Access'] },
      { name: 'Grand Auditorium Orchestra Row', price: 1499, totalSeats: 200, availableSeats: 25, perks: ['Prime Acoustic Seating', 'Traditional Canteen Tasting Coupon'] }
    ],
    featured: true, trending: false, rating: 4.97, reviewsCount: 310, tags: ['Carnatic', 'Bharatanatyam', 'Chennai', 'Margazhi']
  },
  {
    _id: '6620a2222222222222222223',
    id: '6620a2222222222222222223',
    title: 'Chennai ECR Coastal Sunset Car & Superbike Meet',
    slug: 'chennai-ecr-coastal-supercar-meet',
    tagline: '150+ exotic supercars, vintage classics & coastal cruise down East Coast Road.',
    description: 'South India\'s most anticipated petrolhead gathering! Admire Ferraris, Porsches, customized muscle cars, and royal Enfields lined along the scenic Mahabalipuram coastal highway.',
    category: 'Sports & Fitness',
    district: 'Chennai Coastal & Music Quarter',
    venue: {
      name: 'ECR Bay View Arena & Driveway',
      address: 'East Coast Road, Near Kovalam Beach, Chennai, Tamil Nadu 603112',
      city: 'Chennai',
      coordinates: { lat: 12.7890, lng: 80.2480 },
    },
    startDate: new Date(Date.now() + 86400000 * 6),
    doorsOpen: '15:30',
    bannerImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    organizer: { name: 'Madras Motor Sports Club', contactEmail: 'drive@chennaisupercars.in', verified: true },
    ticketTiers: [
      { name: 'Spectator Paddock Pass', price: 299, totalSeats: 1500, availableSeats: 480, perks: ['Paddock Access', 'Photo Zone with Supercars'] },
      { name: 'VIP Pitlane & Drivers Meet Pass', price: 999, totalSeats: 150, availableSeats: 19, perks: ['Pitlane Entry', 'Driver Meet & Greet', 'Complimentary Red Bull'] }
    ],
    featured: false, trending: true, rating: 4.93, reviewsCount: 165, tags: ['Supercars', 'Chennai', 'ECR', 'Motorsport']
  }
];

