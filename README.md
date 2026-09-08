# MaxValid Frontend Development Internship Assignment

A responsive, production-ready React application built with Next.js (App Router), Tailwind CSS, and custom React hooks. This project implements the UI according to the MaxValid Figma design specifications, featuring a public news/blog portal and a dedicated admin management dashboard.

## 🚀 Live Demo & Links

- Live Application: https://maxvalid-news-portal.vercel.app/
- Figma Design: https://www.figma.com/design/B4Pc6Pr0lmnU3RqWSJ2gOR/Task-Intern?node-id=1-18990&m=dev
- GitHub Repository: https://github.com/Syed-Takmil/MaxValid-News-Portal

---

## 🛠️ Tech Stack & Architecture

- Framework: Next.js 14+ (React 18, App Router)
- Language: JavaScript (ES6+)
- Styling: Tailwind CSS (Mobile-first responsive styling)
- Icons: lucide-react
- State & Logic: Functional Components, Custom React Hooks (usePagination, useDebounce)

---

## ✨ Key Features & Implementation Details

### 📱 Responsive Layout & UI/UX
- Adaptive Design: Fully optimized across Mobile, Tablet, and Desktop screen sizes.
- Admin Layout: Persistent sidebar navigation implemented via app/admin/layout.jsx.
- Mobile Experience: Bottom tab navigation for mobile view, mirroring desktop sidebar capabilities.
- Custom 404 Page: User-friendly fallback routing (app/not-found.jsx).

### ⚡ Technical Capabilities & Bonus Features Implemented
- Custom Pagination Hook (usePagination): Dynamic page calculation, dynamic range generation, active state highlighting, and customizable items-per-page.
- Debounced Search (useDebounce): Smooth performance when filtering articles by keyword without unnecessary state thrashing.
- Error & Data Fallbacks: Integrated API fetching using async/await with built-in mock dataset fallback handling.
- Semantic HTML & Accessibility: Proper document structure (<header>, <main>, <aside>, <section>, <table>) paired with accessible contrast ratios and states.

---

## 📁 Project Structure

src/
├── app/
│   ├── admin/
│   │   ├── layout.jsx        # Admin Dashboard persistent layout & sidebar wrapper
│   │   └── news/
│   │       └── page.jsx      # Blog & News Management table view
│   ├── page.jsx              # Public News & Articles page
│   ├── not-found.jsx         # Custom 404 page
│   └── layout.jsx            # Root application layout
├── components/
│   ├── AdminSidebar.jsx      # Admin Sidebar navigation
│   ├── Navbar.jsx            # Public Header / Navigation
│   ├── Footer.jsx            # Desktop Footer
│   └── MobileBottomNav.jsx   # Mobile Bottom Navigation
├── hooks/
│   ├── usePagination.js      # Reusable pagination hook
│   └── useDebounce.js        # Reusable search debounce hook
└── data/
    └── newsData.js           # Mock dataset and category definitions
public/                       # Static assets
README.md                     # Project documentation

---

## 🛠️ Local Setup & Installation

Follow these steps to run the project locally on your machine:

1. Clone the Repository:
   git clone https://github.com/Syed-Takmil/MaxValid-News-Portal
   cd your-repo

2. Install Dependencies:
   npm install

3. Start the Development Server:
   npm run dev

4. Open in Browser:
   Navigate to http://localhost:3000 to view the application.

---

## 🧪 Available Scripts

- npm run dev – Launches the local development server.
- npm run build – Creates an optimized production build.
- npm run start – Starts the production server.