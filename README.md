# Veterinary Appointment Application

A modern veterinary appointment scheduling dashboard built with Next.js 16, Chakra UI v3, and Tailwind CSS v4. Features a calendar-based appointment system with sidebar navigation, client-side appointment booking, and rescheduling capabilities.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.9 | React framework with App Router |
| [React](https://react.dev/) | 19.2.4 | UI library |
| [Chakra UI](https://chakra-ui.com/) | 3.36.0 | Component library (namespace API) |
| [Tailwind CSS](https://tailwindcss.com/) | 4.3.2 | Utility-first CSS |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | Type safety |
| [Formik](https://formik.org/) | 2.4.9 | Form state management |
| [Moment.js](https://momentjs.com/) | 2.30.1 | Date/time manipulation |
| [react-datepicker](https://reactdatepicker.com/) | 9.1.0 | Date picker component |
| [Iconify](https://iconify.design/) | 6.0.2 | Icon framework |

## Features

- **Sidebar Navigation** — Collapsible sidebar with 8 menu items (Home, Appointments, Messages, Contacts, Data Analytics, Subscription, Help Center, Settings) and active-state highlighting
- **Header Search Bar** — Top bar with search input, user avatar/menu, notification, settings, and sign-out buttons
- **Appointment Calendar** — Full day calendar view with:
  - Horizontal time-lane layout (5:00 AM – 4:00 AM)
  - Appointment cards positioned by time via `getBoundingClientRect()` / `offsetTop`
  - Date navigation (previous/next day, date picker)
  - Randomized background colors per appointment
- **Appointment Booking Dialog** — Overlay form for creating new appointments with:
  - Pet name, breed, age, gender, and photo upload
  - Owner name
  - Veterinary info (name, address, contact)
  - Service type selection
  - Date and time picker
- **Right-Side Drawer** — Slide-out panel showing appointment details with veterinary contact info
- **Reschedule Modal** — Dialog for changing appointment date/time
- **Responsive Layout** — Full-height viewport layout with scrollable calendar body

## Architecture

```
app/                          # Next.js App Router
├── layout.tsx                # Root layout (Geist font, Chakra provider)
├── page.tsx                  # Entry page (SideNavbar + HeaderSearchBar + AppointmentCalendar)
└── globals.css               # Tailwind CSS import + CSS custom properties

components/                   # Application components
├── AppointmentCalendar.tsx   # Main calendar with time lanes, appointment cards, dialogs
├── AppointmentForm.tsx       # Formik-based appointment creation form
├── AppointmentRescheduleForm.tsx  # Formik-based reschedule form
├── HeaderSearchBar.tsx       # Top bar with search, avatar, actions
├── RescheduleModal.tsx       # Reschedule dialog wrapper
├── RightSideDrawer.tsx       # Appointment detail slide-out drawer
├── SideNavbar.tsx            # Collapsible side navigation
├── constants.ts              # Shared constants (time ranges, dummy data, services, sidebars)
└── svgComponents.tsx         # Inline SVG icon components

hooks/
└── useGenerateRandomColor.ts # Hook for random hex color generation

providers/
└── chakraUIProvider.tsx      # Chakra UI provider wrapper

public/                       # Static assets (SVG icons)
assets/                       # PNG/SVG images for sidebar, header, appointments
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (port 8010)
npm run dev

# Build for production
npm run build

# Start production server (port 8010)
npm start

# Run linter
npm run lint
```

Open [http://localhost:8010](http://localhost:8010) in your browser.

## Project Status

This is an **initial release (v0.1.0)** with client-side functionality and mock data. No backend or database integration yet — all appointment data is sourced from `dummyAppointmentData` in `constants.ts`.

### Planned / Future Work

- Backend API integration (REST or GraphQL)
- Authentication and user management
- Persistent appointment storage
- Real-time notifications
- Data analytics dashboard
- Responsive/mobile layout refinements
- Unit and integration tests
- CI/CD pipeline

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port `8010` |
| `npm run build` | Build for production |
| `npm start` | Start production server on port `8010` |
| `npm run lint` | Run ESLint across the codebase |
