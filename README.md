# TharaBliss

A full-stack e-commerce website for a luxury Thai aroma balm brand. Features a product catalogue with scent filtering, social shop links (Shopee & TikTok), an editorial design system, an interactive helper chatbot, a custom branded QR code generator, and a help-center / FAQ page.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Django 5.2 + Django REST Framework 3.17 |
| **Backend Admin** | Django Jazzmin custom theme + django-admin-sortable2 ordering |
| **Database** | PostgreSQL (Neon, serverless) |
| **Media Storage** | Cloudinary |
| **Frontend** | Next.js 16 (App Router) + React 19 + TypeScript |
| **Styling** | Tailwind CSS v4 + custom CSS |
| **Animations** | Framer Motion |
| **E2E Testing** | Playwright |
| **QR Code & Image Export** | `qrcode.react` + `html-to-image` |
| **Chat Interface** | `@chatscope/chat-ui-kit-react` |
| **Deployment** | Vercel (frontend + backend) |

## Project Structure

```
TharaBliss/
├── backend/
│   ├── mysite/                   # Django settings, URLs, WSGI
│   ├── products/                 # Products, Categories, SiteSettings app
│   │   ├── models.py             # Product, Category, SiteSettings, ProductAnnouncement models
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py              # django-admin-sortable2 ordering & custom admin actions
│   ├── static/                   # Static assets for customized admin panel
│   │   ├── css/                  # Custom CSS for Django Jazzmin
│   │   │   └── custom_admin.css
│   │   ├── images/               # Admin logo branding
│   │   │   └── logo.png
│   │   └── js/                   # Custom JavaScript for Django Jazzmin
│   │       └── custom_admin.js
│   ├── requirements.txt
│   └── vercel.json               # Backend Vercel deployment config
└── frontend/
    ├── app/
    │   ├── layout.tsx             # Root layout — fonts, metadata, chatbot/loader wrappers
    │   ├── globals.css            # Design tokens, body/heading font rules, blob animations
    │   ├── page.tsx               # Redirects to /dashboard
    │   ├── dashboard/             # Homepage — hero, brand promise, product highlights
    │   ├── products/              # Full catalogue + /products/[id] detail page with QR Code
    │   ├── about/                 # Brand story & values
    │   ├── journal/               # Journal / editorial content
    │   └── help-center/           # Help & FAQ page
    ├── components/
    │   ├── chatbot/               # Scent assistant chatbot
    │   │   └── ChatbotWidget.tsx
    │   ├── layout/                # Global layout components
    │   │   ├── DecoratedBackground.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── PageLoader.tsx
    │   │   └── SocialLinks.tsx
    │   ├── products/              # Product features
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductCarousel.tsx
    │   │   ├── ProductInteractive.tsx
    │   │   └── ProductQRCode.tsx  # Customized QR Code card generator & download
    │   └── ui/                    # Reusable animation helper components
    │       ├── Animations.tsx
    │       └── Reveal.tsx
    ├── lib/
    │   ├── api.ts                 # Typed API client (products, announcements, site settings)
    │   └── faqData.ts             # Static FAQ and chatbot response mapping data
    ├── tests/                     # Playwright E2E Test Suite
    │   ├── about.spec.ts
    │   ├── chatbot-widget.spec.ts
    │   ├── dashboard.spec.ts
    │   ├── help-center.spec.ts
    │   ├── journal.spec.ts
    │   ├── navigation.spec.ts
    │   ├── product-detail.spec.ts
    │   ├── product-page.spec.ts
    │   └── request.spec.ts
    └── playwright.config.ts       # Playwright E2E configuration
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

### 3. Running End-to-End Tests

The frontend is equipped with a Playwright-based test suite covering all primary pages and widget integrations.

```bash
cd frontend

# Install Playwright browsers (first-time only)
npx playwright install

# Run all test suites
npm run test

# Run tests in UI interactive mode
npx playwright test --ui
```

## Key Features

### 🌿 Chatbot Widget
- A global assistant integrated into the root layout.
- Offers interactive conversations, quick replies, and automatic FAQ matching to guide customers.
- Periodically polls active product announcements from the backend and alerts users to new updates.
- Supports draggable sizing adjustments, persistent history in local storage, and high-performance layout transitions.

### 📱 Customized Branded QR Code Generator
- Integrated on the product pages to share details and catalog links easily.
- Features custom branding with the Thara Bliss logo embedded directly in the center of the QR code canvas.
- Renders customized cards using `qrcode.react`, styled with reduced space between text lines and optimized typography.
- Built-in capability to capture and download the QR card as high-resolution PNG image using `html-to-image`.

### 🎨 Django Jazzmin Admin Portal
- A modernized administrative dashboard customized specifically with the brand's aesthetic (Sage Green, Cream colors).
- Configured with customized stylesheets (`custom_admin.css`) and custom branding scripts (`custom_admin.js`).
- Supports drag-and-drop manual product sorting powered by `django-admin-sortable2`.
- Custom admin actions like "📣 Send announcement for selected products" to publish instant updates for the homepage chatbot widget.

## Environment Variables

### Backend (`.env`)

```env
DATABASE_URL=postgresql://user:password@host/dbname
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SECRET_KEY=your_django_secret_key
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/products/` | List all active products |
| `GET`  | `/api/products/{id}/` | Product detail by ID |
| `GET`  | `/api/site-settings/` | Shopee & TikTok shop URLs |
| `GET`  | `/api/announcements/` | Fetch active product announcements |

## Data Models

**Product** — `name`, `description`, `price`, `order` (manual sort index), `scent` (choices below), `image` (Cloudinary), `category`, `is_active`, `is_set_product`, `created_at`

> Scent choices: `Thara Mist` · `Poised Pear & Freesia` · `Aqua No.1` · `Box Set` · `Trio Set`

**Category** — `name`, `description`

**SiteSettings** — `shopee_regular_url`, `shopee_set_url`, `tiktok_url`

**ProductAnnouncement** — `product` (FK), `message` (up to 300 characters), `created_at`, `is_active`

## Pages & Navigation

| Route | Page |
|-------|------|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Homepage — hero banner, brand promise, product highlights |
| `/products` | Full product catalogue with scent filtering |
| `/products/[id]` | Individual product detail with QR Code generator |
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
- **Backend** — deployed via `vercel.json` using `@vercel/python` pointed at `wsgi.py`; set `DATABASE_URL` and Cloudinary credentials in Vercel environment variables.

CORS is configured to allow requests from `https://thara-bliss.vercel.app`.
