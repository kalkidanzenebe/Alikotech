# AlikoTech

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-blue.svg)](#)

> **Practical construction technology built around how projects are actually delivered.**  
> AlikoTech is the construction technology business of **AlikoHub LLC**, bridging US operations and African construction realities with offices in SeaTac, WA and Addis Ababa, Ethiopia.

---

## 🏗️ Overview

AlikoTech develops modern digital infrastructure for the architecture, engineering, and construction (AEC) industries across Africa and emerging markets.

Our flagship product, **[Alikore](https://alikore.alikohub.com/)**, provides a unified workspace for:
- Field updates & site activity reporting
- Project records & milestone tracking
- Subcontractor and cross-functional team coordination
- Cost visibility, change orders & contract controls
- AI-assisted workflow automation with human review in the loop

---

## 🌟 Key Modules & Platform Features

### 1. Corporate Web Presence
- **Home (`/`)**: Dynamic landing page featuring market reality insights, engineering architecture, and pilot program showcases.
- **About (`/about`)**: Company vision, operating principles, and cross-border delivery model.
- **Products (`/products`)**: In-depth breakdown of the Alikore ConTech suite.
- **Leadership & Advisory (`/leadership`)**: Executive team profiles and strategic advisory council.
- **Careers (`/careers`) & Contact (`/contact`)**: Global office details (SeaTac, WA & Addis Ababa) and talent pipelines.

### 2. Operational Control Dashboard (`/dashboard`)
- **Executive Analytics**: Key project health indicators, completion percentages, active task burndowns, and site inspection status.
- **Project Directory (`/dashboard/projects`)**: Central project repository with client visibility toggles, schedule controls, and milestone tracking.
- **Task Management (`/dashboard/tasks`)**: Structured workflows spanning `TODO` ➔ `PENDING` ➔ `IN_PROGRESS` ➔ `REVIEW` ➔ `COMPLETED` ➔ `BLOCKED`.
- **Contracts (`/dashboard/contracts`)**: Lifecycle management from draft to execution, value tracking, and amendments.
- **Field Inspections (`/dashboard/inspections`)**: Audit scheduling, multi-item pass/fail safety & quality checklists, and field notes.
- **User Directory & RBAC (`/dashboard/users`)**: Role-based access control with discrete permission sets for `ADMIN`, `CONTRACTOR`, and `CLIENT`.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Core Framework** | React 18 (TypeScript), Vite |
| **Styling & Design System** | Tailwind CSS, Radix UI Primitives (shadcn/ui), Framer Motion, Lucide Icons |
| **Data & State Management** | TanStack React Query v5, Axios (with Bearer token interception & automatic 401 redirect) |
| **Forms & Validation** | React Hook Form, Zod schemas |
| **Data Visualization** | Recharts |
| **Routing & RBAC** | React Router DOM v6 with Protected Route guards |
| **Testing & Quality** | Vitest, React Testing Library, Playwright, ESLint |

---

## 📁 Repository Structure

```text
src/
├── assets/                 # Brand logos, team portraits, photography
├── components/
│   ├── auth/               # ProtectedRoute and authentication guards
│   ├── home/               # Modular landing page sections
│   ├── shared/             # Status badges, confirm dialogs, skeletons
│   ├── ui/                 # Accessible Radix UI components (Dialog, Table, etc.)
│   ├── visual/             # Animated backdrop grids, counters, reveal containers
│   ├── Navbar.tsx          # Public responsive navigation
│   ├── Footer.tsx          # Global corporate footer
│   └── DashboardSidebar.tsx # Collapsible management navigation
├── contexts/
│   └── AuthContext.tsx     # Session state, tokens, and role switcher
├── features/
│   ├── contracts/          # Contracts list and dialog modals
│   ├── dashboard/          # Metric stat cards and summary graphs
│   ├── inspections/        # Inspection checklist managers
│   ├── projects/           # Project portfolio and detailed management
│   ├── tasks/              # Task board and assignment modals
│   └── users/              # Administrative user access tables
├── hooks/                  # Custom React Query mutation & query hooks
├── lib/
│   ├── api-client.ts       # Centralized Axios client
│   ├── rbac.ts             # Permission matrix for roles
│   ├── alikore.ts          # Ecosystem URLs and product links
│   ├── company.ts          # Office locations and social channels
│   └── validations.ts      # Zod validation schemas
├── pages/                  # Public and dashboard route views
└── types/                  # Domain enums and API contract interfaces
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or later
- **npm** or **bun**

### Installation

```bash
# Clone repository
git clone https://github.com/kalkidanzenebe/Alikotech.git
cd Alikotech

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://con-tech.alikohub.com
```

### Development Server

```bash
npm run dev
```

The application will start on `http://localhost:8080`.

---

## 🧪 Testing & Build

```bash
# Run unit and integration tests
npm test

# Run tests in watch mode
npm run test:watch

# Execute code linting
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🏢 Global Offices

- **United States**: 19550 International Blvd Suite STE 301, SeaTac, WA 98188  
- **Ethiopia**: Addis Ababa, Bole Dembel, Tigi's Building, 12th Floor  

---

## 📄 License & Ownership

Copyright © 2026 **AlikoTech** / **AlikoHub LLC**. All rights reserved.  
Unauthorized distribution, reproduction, or modification of this codebase is strictly prohibited.
