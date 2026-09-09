# 🌌 DistrictPulse — Event Management & Smart QR Ticket Booking System (MERN Stack)

**DistrictPulse** is an ultra-modern, district-centric Event Discovery and Smart Ticketing platform developed with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. Featuring dark glassmorphic aesthetics, multi-tier ticket reservations, dynamic verifiable QR code passes, and an organizer & admin performance analytics dashboard.

---

## 🏛️ Project Synopsis Alignment

| S.No. | Synopsis Section | Implementation Details in DistrictPulse |
| :--- | :--- | :--- |
| **01** | **Introduction** | Digital hub for managing, discovering, and reserving experiences across all city districts. |
| **02** | **Objective** | Real-time discovery, scannable QR ticket generation, multi-tier seat management, and admin dashboard. |
| **03** | **Scope** | District filters, live search, interactive ticket calculations, Apple-Wallet style pass generation, and admin portal. |
| **04** | **Modules** | 10 modularized subsystems: Auth, Profile, Event CRUD, District Filter, Search, Ticketing, Pass Wallet, Analytics, Notification, Database. |
| **05** | **Technologies** | MongoDB, Express.js, React.js, Node.js, JWT, Bcrypt, QRcode, CSS Glassmorphism Design System. |
| **06** | **Expected Outcome** | Production-ready, responsive, secure web app with interactive QR passes and instant seed data. |

---

## ✨ Key Features & Highlights

- 🏙️ **Metro District Filter**: Seamlessly explore events by geographic zones (*Downtown Arts District, Silicon Tech Bay, Marina Waterfront, Historic Cultural Quarter, Midtown Arena, Riverside Parkside*).
- 🎟️ **Multi-Tier Ticket Booking**: Choose from General Admission, VIP Lounge, Soundcheck, and Early Bird tiers with automatic seat decrementing and promo discounts (`DISTRICT20`, `VIP50`).
- 📱 **Encrypted Smart QR Passes**: Instantly generate scannable entry QR codes, booking reference IDs, and printable boarding-pass styled tickets.
- 💼 **Admin & Organizer Portal**: Live KPI analytics (Revenue, Tickets Sold, Occupancy, Active Events), Attendee Lists, and Event Publisher.
- ⚡ **Zero-Config Resilient Database**: Built-in intelligent In-Memory Fallback store with pre-populated seed data so the full system works immediately with or without a local MongoDB service.

---

## 🚀 Quick Start & DevOps Guide

### Option 1: Docker Compose (DevOps Recommended)
```bash
# 1. Build and run microservices
docker compose up --build -d

# 2. View running containers
docker compose ps

# Web App: http://localhost:5173
# API Health: http://localhost:8000/api/health
```

### Option 2: One-Click Windows Launcher
Double-click `run-project.bat` in the root folder to launch frontend and backend simultaneously.

### Option 3: Manual Execution
```bash
# Terminal 1 - Backend:
cd backend && npm install && npm start

# Terminal 2 - Frontend:
cd frontend && npm install && npm run dev
```

---

## 🔑 Pre-Configured Demo Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **District Administrator** | `admin@districtpulse.io` | `admin123` | Full admin metrics, event creation, attendee management |
| **Explorer User** | `user@districtpulse.io` | `user123` | Ticket bookings, pass wallet, wishlist bookmarks |
| **Event Organizer** | `elena@novaproductions.com` | `elena123` | Event publisher & booking manager |

*(Quick 1-Click login buttons are also available directly on the Sign-In page!)*

---

## 📡 RESTful API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register new user/organizer
- `POST /api/auth/login` — Login & receive JWT token
- `GET /api/auth/me` — Get authenticated user details
- `POST /api/auth/wishlist/:eventId` — Toggle bookmark on an event

### Events (`/api/events`)
- `GET /api/events` — Get all events (supports `?district=`, `?category=`, `?search=`, `?sort=`)
- `GET /api/events/meta/districts` — Get metadata for all metro districts
- `GET /api/events/:id` — Get single event details
- `POST /api/events` — Create new event (Admin / Organizer)
- `PUT /api/events/:id` — Update event
- `DELETE /api/events/:id` — Delete event (Admin)

### Bookings (`/api/bookings`)
- `POST /api/bookings` — Book ticket pass and generate QR code
- `GET /api/bookings/my` — Get user's active passes
- `GET /api/bookings/ref/:reference` — Lookup pass by reference code
- `PUT /api/bookings/:id/cancel` — Cancel reservation

### Admin Portal (`/api/admin`)
- `GET /api/admin/analytics` — High-level revenue and occupancy metrics
- `GET /api/admin/users` — List registered platform members
- `GET /api/admin/bookings` — List all attendee passes and transactions
