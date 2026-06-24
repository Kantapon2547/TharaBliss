# TharaBliss

A full-stack e-commerce website for a luxury Thai aroma balm brand. Features a product catalogue with scent filtering, social shop links (Shopee & TikTok), an editorial design system, and a help-center / FAQ page.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Django 5.2 + Django REST Framework 3.17 |
| **Database** | PostgreSQL (Neon, serverless) |
| **Media Storage** | Cloudinary |
| **Frontend** | Next.js 15 (App Router) + TypeScript |
| **Styling** | Tailwind CSS v4 + custom CSS |
| **Animations** | Framer Motion |
| **Deployment** | Vercel (frontend + backend) |

## Project Structure

```
TharaBliss/
├── backend/
│   ├── mysite/                   # Django settings, URLs, WSGI
│   ├── products/                 # Products, Categories, SiteSettings app
│   │   ├── models.py             # Product, Category, SiteSettings models
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py              # django-admin-sortable2 ordering
│   ├── requirements.txt
│   └── vercel.json               # Backend Vercel deployment config
└── frontend/
    ├── app/
    │   ├── layout.tsx             # Root layout — fonts, metadata, global wrappers
    │   ├── globals.css            # Design tokens, body/heading font rules, blob animations
    │   ├── page.tsx               # Redirects to /dashboard
    │   ├── dashboard/             # Homepage — hero, brand promise, product highlights
    │   ├── products/              # Full catalogue + /products/[id] detail page
    │   ├── about/                 # Brand story & values
    │   ├── journal/               # Journal / editorial content
    │   └── help-center/           # Help & FAQ page
    ├── components/
    │   ├── Navbar.tsx             # Responsive navbar with scroll effect
    │   ├── ProductCard.tsx        # Product card used in catalogue
    │   ├── ProductCarousel.tsx    # Auto-scrolling product carousel
    │   ├── ProductInteractive.tsx # Interactive product detail view
    │   ├── Animations.tsx         # Shared Framer Motion animation helpers
    │   ├── Reveal.tsx             # Scroll-reveal wrapper component
    │   ├── SocialLinks.tsx        # Shopee & TikTok link buttons
    │   ├── BackToTop.tsx          # Floating back-to-top button
    │   ├── PageLoader.tsx         # Page transition / loading overlay
    │   ├── FloatingDecoration.tsx # Decorative background blobs
    │   └── DecoratedBackground.tsx
    ├── lib/
    │   └── api.ts                 # Typed API client (products, site settings)
    └── public/images/             # Static assets (banners, products, services)
```

## Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- A PostgreSQL database (or update `settings.py` to use SQLite for local dev)

### 1. Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv ../venv
source ../venv/bin/activate   # Windows: ..\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file with your credentials (see Environment Variables below)

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

**Product** — `name`, `description`, `price`, `order` (manual sort index), `scent` (choices below), `image` (Cloudinary), `category`, `is_active`, `is_set_product`, `created_at`

> Scent choices: `Thara Mist` · `Poised Pear & Freesia` · `Aqua No.1` · `Box Set` · `Trio Set`

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

- **Display font**: Playfair Display (headings via `--font-playfair`)
- **Body font**: Inter (body text via `--font-inter`)
- **Colors**: Cream `#FAF7F2` · Sage Green `#0F6E56` · Charcoal `#2F3A33` · Beige `#EFEAE1`
- **Animations**: Framer Motion scroll-reveal, floating blob backgrounds, hover states, page loader, mobile-responsive menu

## Deployment

Both services are deployed on Vercel.

- **Frontend** — standard Next.js Vercel deployment; set `NEXT_PUBLIC_API_URL` in Vercel environment variables.
- **Backend** — deployed via `vercel.json` using `@vercel/python` pointed at `mysite/wsgi.py`; set `DATABASE_URL` and Cloudinary credentials in Vercel environment variables.

CORS is configured to allow requests from `https://thara-bliss.vercel.app`.