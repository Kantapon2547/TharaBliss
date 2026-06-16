# TharaBliss

A full-stack e-commerce website for a luxury aroma balm brand, featuring a product catalogue with scent filtering, social shop links (Shopee & TikTok), and a clean editorial design system.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Django 5.2 + Django REST Framework |
| **Database** | PostgreSQL (Neon, serverless) |
| **Media Storage** | Cloudinary |
| **Frontend** | Next.js 16 (App Router) + TypeScript |
| **Styling** | Tailwind CSS v4 + Framer Motion |
| **Deployment** | Vercel (frontend + backend) |

## Project Structure

```
TharaBliss/
├── backend/
│   ├── mysite/               # Django settings, URLs, WSGI
│   ├── products/             # Products, Categories, SiteSettings app
│   │   ├── models.py         # Product, Category, SiteSettings models
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── requirements.txt
│   └── vercel.json           # Backend deployment config
└── frontend/
    ├── app/
    │   ├── page.tsx           # Redirects to /dashboard (homepage)
    │   ├── dashboard/         # Main homepage with hero, services, products
    │   ├── products/          # Product catalogue + [id] detail page
    │   ├── about/             # Brand story page
    │   ├── journal/           # Journal/blog page
    │   └── help-center/       # Help & FAQ page
    ├── components/
    │   ├── Navbar.tsx         # Responsive navbar with scroll effect
    │   ├── ProductCard.tsx
    │   └── ProductInteractive.tsx
    ├── lib/
    │   └── api.ts             # Typed API client (products, site settings)
    └── public/images/         # Static assets (banners, products, services)
```

## Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- A PostgreSQL database (or update `settings.py` to use SQLite for local dev)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Create a .env file with your credentials
cp .env.example .env   # or create manually (see Environment Variables below)

# Run migrations
python manage.py migrate

# Create a superuser
python manage.py createsuperuser

# Start the dev server
python manage.py runserver
```

Backend runs at: `http://localhost:8000`  
Admin panel: `http://localhost:8000/admin`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create a .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start the dev server
npm run dev
```

Frontend runs at: `http://localhost:3000`

## Environment Variables

### Backend (`.env`)

```env
DATABASE_URL=postgresql://user:password@host/dbname
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products/` | List all active products |
| `GET` | `/api/products/{id}/` | Product detail by ID |
| `GET` | `/api/site-settings/` | Shopee & TikTok shop URLs |

## Data Models

**Product** — `name`, `description`, `price`, `scent` (choices: Thara Mist / Poised Pear & Freesia / Aqua No.1), `image` (Cloudinary), `category`, `is_active`, `is_set_product`

**Category** — `name`, `description`

**SiteSettings** — `shopee_regular_url`, `shopee_set_url`, `tiktok_url`

## Pages & Navigation

| Route | Page |
|-------|------|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Homepage — hero banner, brand promise, product highlights |
| `/products` | Full product catalogue with scent filtering |
| `/products/[id]` | Individual product detail |
| `/about` | Brand story and values |
| `/journal` | Journal / editorial content |
| `/help-center` | FAQ and customer support |

## Design System

- **Primary font**: Cormorant Garamond (display / headings)
- **Body font**: Jost (sans-serif)
- **Colors**: Cream `#FAF7F2` · Gold `#C9A84C` · Charcoal `#1A1510` · Beige `#F0EAE0`
- **Animations**: Framer Motion scroll-reveal, gold shimmer, hover states, mobile-responsive menu

## Deployment

Both services are deployed on Vercel.

- **Frontend** — standard Next.js Vercel deployment; set `NEXT_PUBLIC_API_URL` in environment variables.
- **Backend** — deployed via `vercel.json` using `@vercel/python` pointed at `mysite/wsgi.py`; set `DATABASE_URL` and Cloudinary credentials in Vercel environment variables.

CORS is configured to allow requests from `https://thara-bliss.vercel.app`.