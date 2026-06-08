# TharaBliss

A full-stack website for a luxury OEM fragrance and cosmetics manufacturer.

## Tech Stack
- **Backend**: Django 5 + Django REST Framework + SQLite
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Styling**: Cormorant Garamond + Jost typography, luxury design system

## Project Structure
```
TharaBliss/
├── backend/          # Django REST API
│   ├── mysite/       # Settings, URLs
│   ├── products/     # Products, Categories, Capabilities, Certifications, Testimonials
└── frontend/         # Next.js App Router
    ├── app/
    │   ├── page.tsx              # Homepage
    │   ├── products/page.tsx     # Product catalogue (client-side filtered)
    │   ├── dashboard/page.tsx
    │    ├── journal/page.tsx
    │   └── about/page.tsx  # Product detail
    ├── components/
    │   └── Navbar.tsx
    └── lib/api.ts     # API client
```

## Quick Start

### 1. Start Django Backend (Terminal 1)
```bash
cd backend
pip install -r requirements.txt   # or use the packages listed below
python manage.py runserver
```
Backend runs at: http://localhost:8000

Admin panel: http://localhost:8000/admin
- Username: `admin`  Password: `admin123`

### 2. Start Next.js Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:3000

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products/ | List all products |
| GET | /api/products/?featured=true | Featured products |
| GET | /api/products/{slug}/ | Product detail |
| GET | /api/categories/ | All categories |
| GET | /api/capabilities/ | Manufacturing capabilities |
| GET | /api/certifications/ | Quality certifications |
| GET | /api/testimonials/ | Client testimonials |
| GET | /api/stats/ | Company statistics |
| POST | /api/inquiries/ | Submit contact inquiry |

## Django Dependencies
```
django>=5.0
djangorestframework
django-cors-headers
pillow
python-decouple
```

## Design System
- **Primary font**: Cormorant Garamond (display/headings)
- **Body font**: Jost (clean sans-serif)
- **Colors**: Cream (#FAF7F2), Gold (#C9A84C), Charcoal (#1A1510), Beige (#F0EAE0)
- **Animations**: CSS reveal-on-scroll, gold shimmer, hover states, mouse parallax hero

## Key Features
- ✅ Scroll-triggered reveal animations
- ✅ Interactive mouse-parallax hero
- ✅ Filterable product catalogue
- ✅ Fully responsive (mobile + desktop)