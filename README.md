# bt-shipper-app

The shipper-facing mobile app for BharatTruck. Built with Expo 51 and React Native, it lets freight customers log in, book trucks, track live shipments, and view booking history.

**Platform:** iOS · Android (React Native / Expo 51)  
**Stack:** Expo · React Native · TypeScript · Expo Router · Zustand · Axios

---

## Quickstart

```bash
cp .env.example .env
npm install
npm run start               # Expo dev server — scan QR with Expo Go
```

Or from the repo root:

```bash
./bt start shipper
```

Expo will print a QR code. Scan it with the **Expo Go** app on a physical device, or press `i` / `a` to open in iOS Simulator / Android Emulator.

---

## Environment Variables

Copy `.env.example` and set the backend URLs:

```bash
EXPO_PUBLIC_AUTH_URL=http://localhost:3001
EXPO_PUBLIC_BOOKING_URL=http://localhost:3002
EXPO_PUBLIC_PRICING_URL=http://localhost:3003
EXPO_PUBLIC_PAYMENT_URL=http://localhost:3004
```

For a physical device on the same Wi-Fi, replace `localhost` with your machine's local IP (e.g. `192.168.1.42`).

> All env vars must be prefixed `EXPO_PUBLIC_` to be accessible in the app bundle.

---

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start Expo dev server |
| `npm run android` | Open on Android device/emulator |
| `npm run ios` | Open on iOS Simulator |
| `npm run build:web` | Export as a web app |

---

## Screens

### Auth flow (`app/(auth)/`)

| Screen | File | Description |
|--------|------|-------------|
| Phone entry | `phone.tsx` | Enter Indian mobile number |
| OTP verification | `otp.tsx` | 6-digit OTP input |
| Email capture | `email.tsx` | Optional email for invoice delivery |
| Tier info | `tier-info.tsx` | Explains shipper KYC tiers |

### Main tabs (`app/(tabs)/`)

| Tab | File | Description |
|-----|------|-------------|
| Home | `index.tsx` | Dashboard — quick book + active shipment summary |
| Bookings | `bookings.tsx` | Active / past booking list with status badges |
| Track | *(planned)* | Live map with driver location |
| Profile | *(planned)* | Account, KYC status, payment methods |

---

## Project Structure

```
bt-shipper-app/
├── app/
│   ├── _layout.tsx             # Root layout — font loading, theme provider
│   ├── index.tsx               # Entry redirect (auth check → tabs or login)
│   ├── (auth)/                 # Unauthenticated screens
│   │   ├── phone.tsx
│   │   ├── otp.tsx
│   │   ├── email.tsx
│   │   └── tier-info.tsx
│   └── (tabs)/                 # Authenticated tab navigator
│       ├── _layout.tsx
│       ├── index.tsx           # Home / dashboard
│       └── bookings.tsx        # Booking list (active + past tabs)
├── components/
│   ├── BookingCard.tsx         # Status-aware booking summary card
│   ├── Button.tsx              # Themed primary button
│   ├── Input.tsx               # Themed text input
│   ├── TierBadge.tsx           # KYC tier indicator (Level 1/2/3)
│   └── ThemeContext.tsx        # Light/dark theme provider
├── lib/
│   └── mockData.ts             # Mock bookings for UI development
├── app.json                    # Expo config — name, slug, icons
├── tsconfig.json
└── .env.example
```

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `expo-router` | File-based navigation (same pattern as Next.js) |
| `expo-location` | GPS for live tracking (driver position on map) |
| `react-native-maps` | Map rendering for shipment tracking screen |
| `zustand` | Lightweight global state (auth token, active booking) |
| `axios` | HTTP client for backend API calls |
| `@expo-google-fonts/space-grotesk` | Brand typography |

---

## Booking Status Reference

| Status | Meaning |
|--------|---------|
| `pending` | Booking created, awaiting driver acceptance |
| `confirmed` | Driver assigned, payment escrowed |
| `in_transit` | Driver confirmed pickup via OTP |
| `delivered` | ePOD submitted, payment released |
| `cancelled` | Cancelled by shipper |

---

## Development Notes

- The app currently uses `lib/mockData.ts` for booking list UI — real API calls will replace this when bt-booking-service JWT auth is wired (Sprint 3).
- Theme (light/dark) is managed via `ThemeContext` — all components read from `theme.*` tokens rather than hardcoded colors.
- Navigation uses Expo Router's file-based routing; `(auth)` and `(tabs)` are route groups (parentheses = no URL segment).
- The driver tracking tab will use `expo-location` + WebSocket to bt-booking-service for real-time position updates.
