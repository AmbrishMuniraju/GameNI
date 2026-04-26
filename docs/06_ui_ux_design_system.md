# 06 — UI/UX Design System

## Design Philosophy: "The Kinetic Gallery"

The design system is built on the premise that sports platforms should feel like **high-performance athletic wear** — functional, minimal, and confident. Not playful or childish. Not corporate or sterile.

### Core Principles

1. **The "No-Line" Rule:** Prohibit 1px solid borders as visual boundaries. Depth is communicated through background color shifts between surface tones (tonal layering), not drawn lines.
2. **Tonal Layering:** Use a stack of materials to create depth: `surface` → `surface-container` → `surface-container-high` → `surface-container-highest`.
3. **Intentional Asymmetry:** Editorial-style layouts. Not everything needs to be centered in a rigid grid.
4. **Glassmorphism for Navigation:** Navbar and search use 60% opacity backgrounds with 20px backdrop-blur.
5. **Micro-animations Everywhere:** Hover states, card transitions, and toast notifications should all have smooth, purposeful motion.

---

## Design Tokens

### Colour Palette

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#00eedc` | Primary actions, links, active states |
| `--primary-container` | `#00d0c0` | Gradient endpoint, filled buttons |
| `--secondary` | `#ffb692` | Warm accent, gradient text |
| `--secondary-container` | `#fd6c00` | Urgency (live pulse, alerts) |
| `--bg` / `--surface` | `#131313` | Page background |
| `--surface-container-low` | `#1c1b1b` | Section differentiation |
| `--surface-container` | `#201f1f` | Card backgrounds |
| `--surface-container-high` | `#2a2a2a` | Elevated cards, modals |
| `--surface-container-highest` | `#353534` | Active inputs, hover states |
| `--on-surface` | `#e5e2e1` | Primary text |
| `--text-muted` | `#859493` | Secondary text, captions |
| `--border` | `rgba(59, 73, 73, 0.15)` | Subtle outlines (use sparingly) |

### Typography

| Token | Value | Usage |
|---|---|---|
| `--font-headline` | `Lexend` | All headings (h1–h3). Geometric, authoritative. |
| `--font-body` | `Manrope` | Body text, labels, captions. Technical, legible. |

**Scale:**
- Hero H1: `clamp(2.5rem, 8vw, 4.5rem)`, weight 900, line-height 1.0
- Section H2: `2.5rem`, weight 800
- Card H3: `1.1rem`, weight 700
- Body: `1rem`, weight 400
- Caption: `0.85rem`, weight 600

### Shape

| Token | Value |
|---|---|
| `--radius` | `4px` (buttons, tags, inputs) |
| `--radius-lg` | `8px` (cards, modals) |
| `--radius-full` | `999px` (badges, pills, avatars) |

### Elevation / Shadow

| Token | Value |
|---|---|
| `--shadow` | `0px 24px 48px rgba(0, 0, 0, 0.4)` |

---

## Component Library

### Buttons
| Variant | Style |
|---|---|
| **Primary** | Gradient `primary → primary-container`, black text, uppercase, letter-spacing 0.05em |
| **Outline** | Transparent bg, `primary` border + text |
| **Ghost** | Transparent bg, `on-surface` text, no border |
| **Small** | Reduced padding (6px 16px), 0.8rem font-size |

### Cards
All cards use `surface-container` background, `radius-lg` corners, and a subtle scale+shadow on hover.

| Card Type | Contents |
|---|---|
| **Venue Card** | Image (240px), sport badge, name, area, tags, price (£), rating |
| **Game Card** | Sport badge, slot status, title, venue/time/level, watcher count, host avatar, fee, Watch + Join buttons |
| **Trainer Card** | Avatar (initials), name, sport, stats (experience, students, rating), rate, Book button |

### Navigation
- Glassmorphic navbar: `background: rgba(19,19,19,0.6); backdrop-filter: blur(20px);`
- Scrolled state adds `background: rgba(19,19,19,0.95);`
- City selector with disabled "Coming Soon" options

### Modals
- Overlay: `rgba(0,0,0,0.7)` with `backdrop-filter: blur(4px)`
- Modal: `surface-container-high` background, `radius-lg`, `modalIn` animation

### Toasts
- Bottom-right positioned
- Auto-dismiss after 3 seconds
- Success (green icon) and Error (orange icon) variants

---

## Screen Inventory

| Screen | Route | Description |
|---|---|---|
| **Home** | `/` | Hero + search bar + sport chips + venue grid + live matches |
| **Book** | `/book` | Venue discovery with sport/area filters and sort options |
| **Play** | `/play` | Game feed with sport filters, Create Game CTA |
| **Train** | `/train` | Trainer marketplace with sport filters |
| **Venue Detail** | `/venue/:id` | Full venue page with map, photos, reviews, slot picker |
| **Game Detail** | `/game/:id` | Full game page with player list, chat, host profile |
| **User Profile** | `/profile` | Reliability score, games played, watchlist, upcoming games |
| **Host Dashboard** | `/host` | Attendance, payments, waitlist, game history |
| **Auth Modal** | overlay | Log In / Sign Up tabs |
| **Booking Modal** | overlay | Slot picker + summary + confirm |

---

## Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `< 480px` | Mobile (single column, stacked nav) |
| `480px – 768px` | Tablet (2-column grid) |
| `768px – 1024px` | Small desktop |
| `> 1024px` | Desktop (3-column grid, full nav) |

---

## Accessibility Requirements

- All interactive elements must have unique, descriptive `id` attributes
- All buttons must have `aria-label` when icon-only
- Colour contrast must meet WCAG AA (4.5:1 for text)
- Focus states must be visible (outline: 2px solid `--primary`)
- All images must have meaningful `alt` text
- Keyboard navigation must work for all modals and forms
