# 03 — Core Features

## Feature Priority Matrix

Features are organized into three tiers based on launch priority and impact.

---

## 🟢 Tier 1: MVP (Launch Features)

### F1. Venue Discovery & Booking
**Purpose:** Solve the logistics problem — the table stakes.

| Sub-feature | Description |
|---|---|
| **Venue Listings** | Display venues with name, sport, area, tags, rating, price, and available slots. |
| **Sport Filtering** | Filter venues by sport type (Football, Badminton, Swimming, etc.). |
| **Slot Selection** | Interactive time-slot picker showing available, booked, and selected slots. |
| **Booking Confirmation** | Modal with summary (venue, sport, date, time, price) and confirm action. |
| **Google Maps Integration** | Show venue location on an embedded map with directions. |
| **Favourites** | Heart/bookmark venues for quick access later. |

**Acceptance Criteria:**
- User can discover, filter, and book a venue in under 60 seconds.
- Booked slots are visually distinct (greyed out) and unclickable.
- Booking confirmation generates a reference number and sends a confirmation (email/SMS).

---

### F2. Game Discovery & Joining
**Purpose:** Make "Joining > Starting" — the core psychological insight.

| Sub-feature | Description |
|---|---|
| **Game Feed** | Scrollable list of upcoming games, sorted by date/time. |
| **Game Card** | Shows sport, title, venue, date/time, skill level, host, fee, slots remaining, and watchers count. |
| **Join Game** | One-tap join for games with available slots. Triggers confirmation toast. |
| **Skill Level Tags** | Each game is tagged: Beginner, Intermediate, Advanced, All Levels. |
| **Host Profile** | Tapping the host name shows their reliability score, games hosted, and badge status. |

**Acceptance Criteria:**
- User can browse and join a game in under 30 seconds.
- Full games show "Waitlist Open" instead of "X slots left".

---

### F3. The Lurk Layer (Watchlist)
**Purpose:** Solve the "soft arrival" problem. Let users engage without committing.

| Sub-feature | Description |
|---|---|
| **Watch Button** | Star/eye icon on every game card. Toggles watchlist status. |
| **Watcher Count** | Shows "X players watching" on each game card (social proof). |
| **My Watchlist** | Dedicated section in user profile showing all watched games. |
| **Notifications** | When a watched game gets a cancellation, the watcher is notified. |

**Acceptance Criteria:**
- Watching a game requires zero public commitment (no name shown to others).
- Watchers are notified when a slot opens.
- Organizers can see the watcher count (anonymous) to gauge demand.

---

### F4. Reserve / Sub-In Mechanic
**Purpose:** Serve the "Inconsistent Intermediate" — the most commercially valuable persona.

| Sub-feature | Description |
|---|---|
| **Join as Reserve** | When a game is full, the "Join" button becomes "Join as Reserve". |
| **Auto-Notification** | When a player drops out, the first reserve is auto-notified via push/SMS. |
| **Accept / Decline Window** | Reserve has 30 minutes to accept. If they decline, the next reserve is pinged. |
| **Reserve Queue** | Organizers can see how many reserves are queued. |

**Acceptance Criteria:**
- Reserves never publicly commit — they are invisible to other players until they accept a slot.
- The system auto-fills within 30 minutes of a dropout.

---

### F5. User Authentication & Profiles
**Purpose:** Establish identity and trust.

| Sub-feature | Description |
|---|---|
| **Sign Up / Log In** | Email + password, Google OAuth, Apple ID. |
| **Profile Setup** | Name, photo, preferred sports, skill level (self-reported initially), area. |
| **Reliability Score** | "Shows Up" percentage (e.g., 95%). Calculated from attendance history. |
| **Games Played Counter** | Total games attended. |
| **Favourite Sports** | Auto-surfaced based on booking/joining history. |

---

### F6. City & Area Management
**Purpose:** Density-first geographic strategy.

| Sub-feature | Description |
|---|---|
| **Active City** | Belfast (fully operational). |
| **Coming Soon Cities** | Derry, Lisburn, Antrim — shown in dropdown but disabled with "Coming Soon" label. |
| **Area Filtering** | Within Belfast: East Belfast, Botanic, Ormeau, West Belfast, North Belfast, etc. |
| **Waitlist for New Cities** | Users can register interest for their city — signals demand. |

---

## 🟡 Tier 2: Growth Features (Month 2-4)

### F7. Trusted Host Programme
**Purpose:** Convert the Organizer-Burnout from a user into paid infrastructure.

| Sub-feature | Description |
|---|---|
| **Host Application** | Any user can apply to become a Host after 5+ successful games. |
| **Verified Badge** | "Trusted Host" badge on profile and game cards. |
| **Auto-Payment Splitting** | When a Host creates a game, all players are charged upfront. No chasing. |
| **Revenue Share** | Hosts earn a % of the platform fee on their games. |
| **Host Dashboard** | View attendance, waitlist, payment status, and game history. |
| **Priority Booking** | Hosts get first access to peak-time venue slots. |

---

### F8. Soft Arrival Chat
**Purpose:** Break the "weirdness factor" of showing up alone.

| Sub-feature | Description |
|---|---|
| **Game Chat Room** | Unlocked when a user joins a game. Temporary — expires 1 hour after the game. |
| **Pre-Game Icebreaker** | Auto-posted message: "👋 Welcome! Share what you're wearing so you can find each other." |
| **Post-Game Recap** | Optional: Host can post a quick photo/summary. Builds community memory. |

---

### F9. AI Skill Rating (Invisible Elo)
**Purpose:** Replace unreliable self-reporting with observed skill inference.

| Sub-feature | Description |
|---|---|
| **Post-Game Survey** | After each game, players answer: "Was this match well-balanced?" (Yes/No/Too Easy/Too Hard). |
| **Silent Elo Adjustment** | System uses responses + game outcomes to adjust internal skill ratings. |
| **Smart Matchmaking** | Over time, the system auto-suggests games that match the user's invisible rating. |
| **No Visible Number** | Users never see their Elo. They just notice games "feel right". |

---

### F10. Trainer Marketplace
**Purpose:** Revenue diversification and skill development.

| Sub-feature | Description |
|---|---|
| **Trainer Profiles** | Name, sport, experience, students, rating, rate per session. |
| **Book a Session** | Direct booking with time-slot picker. |
| **Group Coaching** | Trainers can offer group sessions at reduced per-person rates. |
| **Reviews** | Post-session reviews from students. |

---

## 🔴 Tier 3: Scale Features (Month 5+)

### F11. Micro-Community Hubs
Venue-based or sport-based persistent groups (e.g., "The Avoniel 5-a-side Regulars"). Members see each other's games, share updates, and build continuity.

### F12. Recurring Games
A Host can create a recurring game (e.g., "Every Tuesday 7 PM at Avoniel"). The system auto-creates the game each week and auto-invites regulars.

### F13. Tournament / League Mode
Self-organising tournaments with bracket generation, scoring, and leaderboards. Opt-in — never forced.

### F14. Venue Partner Dashboard
A B2B portal for venue operators to manage availability, pricing, and view analytics on bookings driven through GameNI.

### F15. In-App Payments (Stripe / Monzo Integration)
Full payment flow — pay when you join, auto-refund on cancellation, auto-split for group bookings. Replaces external Venmo/Monzo chasing.
