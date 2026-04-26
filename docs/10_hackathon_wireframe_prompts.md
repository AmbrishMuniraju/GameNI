# 10 — Hackathon Wireframe Prompts

A copy-paste prompt library for generating the **GameNI** prototype wireframes in **Google Stitch** and **Claude design**.

---

## How To Use This Document

1. **Copy the "Shared Preamble" block once.** Prepend it to every individual screen prompt below — this keeps the design system consistent across all generated screens.
2. **Pick one screen prompt at a time.** Don't paste multiple prompts together — each tool generates one screen per prompt.
3. **For Google Stitch:** keep prompts under ~600 words. If a prompt feels long, trim the "Specific data" section first.
4. **For Claude design:** paste the full prompt — Claude handles longer, more detailed prompts well and produces richer output with more context.
5. **Generate in this order:** Landing → Browse Games → Game Detail → Browse Venues → Venue Detail → Booking Modal → Profile → Auth Modal. This mirrors the hackathon demo flow.

---

## Hackathon Scope (Hard Constraints For All Prompts)

These constraints apply to every screen. They are baked into the Shared Preamble below — but you can also reinforce them per prompt if a tool drifts.

| Constraint | Rule |
|---|---|
| **Active city** | Belfast only |
| **Coming Soon cities** | Derry, Lisburn, Antrim, Newry, Dublin (shown but disabled) |
| **Available sports** | Football, Cricket only |
| **Coming Soon sports** | Badminton, Swimming, Tennis, Basketball, Padel, GAA (shown but disabled) |
| **Areas in Belfast** | Botanic, Ormeau, East Belfast, North Belfast, South Belfast, West Belfast, Castlereagh |
| **Platform** | Web app, desktop-first, responsive down to mobile |
| **Theme** | Dark mode only |

---

## 🎨 SHARED PREAMBLE (Prepend To Every Prompt)

```
You are designing a screen for "GameNI" — a sports booking and community 
matchmaking web app for Belfast. The product helps adults book pitches and 
join games of FOOTBALL and CRICKET only. Other sports (Badminton, Swimming, 
Tennis, Basketball, Padel, GAA) appear as disabled "Coming Soon" chips.

DESIGN PHILOSOPHY: "The Kinetic Gallery"
The aesthetic is high-performance athletic wear — minimal, confident, 
editorial. Not playful. Not corporate. Think dark-mode Nike SNKRS app 
crossed with editorial sports magazine.

DESIGN TOKENS:
- Background: #131313 (page), #1c1b1b (sections), #201f1f (cards), 
  #2a2a2a (elevated cards/modals), #353534 (active inputs/hover)
- Primary: #00eedc → #00d0c0 (gradient for CTAs and active states)
- Secondary accent: #ffb692 (warm) and #fd6c00 (urgency/live pulse)
- Text: #e5e2e1 (primary), #859493 (muted/captions)
- Borders: AVOID 1px solid borders. Communicate depth using tonal 
  layering between background tones. This is "the no-line rule."

TYPOGRAPHY:
- Headlines: Lexend, weight 800–900, tight line-height
- Body: Manrope, weight 400–600
- Hero H1: clamp(2.5rem, 8vw, 4.5rem), uppercase optional
- Body: 1rem
- Captions: 0.85rem, weight 600, often uppercase with letter-spacing 0.05em

SHAPE:
- Buttons, tags, inputs: 4px radius
- Cards, modals: 8px radius
- Avatars, badges, pills: fully rounded (999px)

COMPONENTS:
- Primary CTA button: gradient #00eedc → #00d0c0 background, BLACK text, 
  uppercase, letter-spacing 0.05em, 4px radius
- Outline button: transparent background, #00eedc border + text
- Cards: #201f1f background, 8px radius, NO border, subtle shadow on hover
- Navbar: glassmorphism — rgba(19,19,19,0.6) with 20px backdrop-blur

LAYOUT RULES:
- Embrace intentional asymmetry — editorial layout, not rigid grid
- Generous spacing
- Active city: BELFAST. Coming Soon cities: Derry, Lisburn, Antrim, 
  Newry, Dublin (shown disabled with "Coming Soon" pill)
- Active sports: Football, Cricket. Coming Soon sports: Badminton, 
  Swimming, Tennis, Basketball, Padel, GAA (shown disabled)

NOW DESIGN THE FOLLOWING SCREEN:
```

---

## Prompt 1 — Landing / Home Page (`/`)

```
SCREEN: Landing / Home Page
PURPOSE: First impression. Convert curious visitors into users by showing 
live games, real venues, and the sense that "Belfast is already playing."

LAYOUT (top to bottom):

1. GLASSMORPHIC NAVBAR (sticky)
   - Left: "GAMENI" wordmark in Lexend Black
   - Center: nav links — Book, Play, Profile
   - Right: city selector dropdown showing "Belfast" with a small green dot, 
     plus "Log In" ghost button and "Sign Up" primary gradient button

2. HERO SECTION (full viewport height)
   - Massive editorial headline, left-aligned, in Lexend Black 900:
     "YOUR COURT
      IS WAITING."
   - Subheadline below in Manrope 500, muted color: 
     "Football and cricket games happening across Belfast. 
      Watch one. Join one. Or just lurk — we don't judge."
   - Below subheadline: a search bar with glassmorphic background 
     containing 3 inline fields: Sport (dropdown — Football/Cricket only, 
     others disabled), Area (Belfast areas), Date. End with a gradient 
     primary "FIND A GAME" button.
   - Bottom-right of hero: a small "live pulse" indicator in #fd6c00 
     showing "🔴 14 games live in Belfast right now"

3. SPORT CHIPS ROW (horizontal scroll)
   - Active chips with gradient background: Football, Cricket
   - Disabled chips with reduced opacity and "SOON" label: Badminton, 
     Swimming, Tennis, Basketball, Padel, GAA

4. FEATURED VENUES SECTION
   - Section heading: "BELFAST'S BUSIEST PITCHES" (Lexend, uppercase)
   - 3-card grid showing:
     • Avoniel 4G Pitches — East Belfast — Football — £45/hr — ⭐ 4.8
     • Stormont Civil Service Cricket Club — East Belfast — Cricket 
       — £80/hr — ⭐ 4.9
     • Queen's Sport PEC — South Belfast — Football — £55/hr — ⭐ 4.7
   - Each card has: large venue image (placeholder), sport badge top-left, 
     price chip top-right, name in Lexend Bold, area + tags below

5. LIVE GAMES STRIP
   - Heading: "PLAYING TONIGHT"
   - 3 horizontal game cards showing: sport icon, title (e.g., "Friendly 
     5-a-side"), venue, time, slots remaining (e.g., "2/10 spots left"), 
     watcher count, host avatar
   - Each card has dual CTAs: a small "WATCH" outline button and a "JOIN" 
     gradient button

6. "HOW GAMENI WORKS" SECTION
   - 3 columns with numbered icons:
     01. WATCH — Browse games. No commitment.
     02. JOIN — One-tap into any game.
     03. PLAY — Show up. Have a game. Build a routine.

7. FOOTER
   - Coming Soon cities row: "Coming to Derry, Lisburn, Antrim, Newry, 
     Dublin." Each city as a disabled pill.
   - Email capture: "Want GameNI in your city? Drop your email."

VISUAL EMPHASIS: 
- The hero must feel cinematic, not corporate
- Use generous whitespace
- Asymmetric layout — don't center everything
- The gradient should appear in exactly ONE place per fold (the primary CTA)
```

---

## Prompt 2 — Browse Games (`/play`)

```
SCREEN: Browse Games Feed
PURPOSE: The core loop. Where users find a football or cricket game to 
join, watch, or reserve.

LAYOUT (top to bottom):

1. GLASSMORPHIC NAVBAR (same as landing, but "Play" link is active with 
   gradient underline)

2. PAGE HEADER STRIP
   - Large heading: "GAMES IN BELFAST" (Lexend Black, left-aligned)
   - Subheading: "12 games this week. 4 starting tonight."
   - Right side: a primary gradient "+ CREATE A GAME" button

3. STICKY FILTER BAR (glassmorphic, sticks below navbar on scroll)
   - Sport filter chips: Football (active gradient), Cricket (active 
     outline), then disabled chips for Badminton, Swimming, Tennis, 
     Basketball, Padel, GAA with "SOON" labels
   - Date filter: Today, Tomorrow, This Week, This Weekend
   - Area dropdown: All Belfast / Botanic / Ormeau / East Belfast / 
     North Belfast / South Belfast / West Belfast / Castlereagh
   - Skill level dropdown: All Levels, Beginner, Intermediate, Advanced
   - Sort dropdown: Soonest, Most Spots Open, Most Watched

4. GAME CARDS GRID (3 columns desktop, 1 column mobile)
   Show 6 game cards. Each card has this structure:
   
   - Top-left: sport badge (small pill — "FOOTBALL" or "CRICKET" with 
     icon, gradient background)
   - Top-right: status pill — "3/10 SPOTS" (green tint) or "FULL — JOIN 
     RESERVE" (orange tint #fd6c00)
   - Card body:
     • Title in Lexend Bold (e.g., "Friendly 5-a-side")
     • Venue + area in muted text (e.g., "Avoniel 4G Pitches · East Belfast")
     • Date + time row with calendar icon (e.g., "Tue 28 Apr · 7:00 PM")
     • Skill level chip (e.g., "INTERMEDIATE")
   - Bottom row:
     • Left: host avatar (circle) + host name + "Trusted Host" badge if 
       applicable
     • Middle: "👁 14 watching" muted text
     • Right: fee chip "£5pp"
   - Bottom CTAs: "👁 WATCH" outline button + "JOIN" gradient button 
     (or "JOIN RESERVE" if full)

   Show this realistic mix:
   1. Football, Friendly 5-a-side, Avoniel, Tue 7PM, Intermediate, 
      3/10 open, host Priya, 14 watchers, £5pp
   2. Cricket, Sunday League Net Practice, Stormont CSCC, Sun 10AM, 
      All Levels, 5/16 open, host Rohit, 8 watchers, £8pp
   3. Football, Ladies 5-a-side, Olympic Park 3G, Wed 6:30PM, 
      Beginner-friendly, FULL (Join Reserve), host Maya, 22 watchers, £5pp
   4. Cricket, T20 Pickup Game, Cliftonville CC, Sat 2PM, Intermediate, 
      11/22 open, host David, 4 watchers, £10pp
   5. Football, Lunchtime 7-a-side, Queen's Sport PEC, Thu 1PM, 
      All Levels, 1/14 open, host James, 9 watchers, £6pp
   6. Football, After-Work 5-a-side, Girdwood Hub, Fri 6PM, Intermediate, 
      6/10 open, host Aisha, 17 watchers, £5pp

5. EMPTY STATE FOOTER (small)
   "Don't see what you want? Create a game and the watchers will come."
   With a "+ CREATE A GAME" outline button.

VISUAL EMPHASIS:
- Card hover state: scale 1.02, soft shadow
- The "FULL" cards should feel slightly more energetic — use the orange 
  accent (#fd6c00) for the reserve pill
- Trusted Host badges use the gradient color
```

---

## Prompt 3 — Game Detail (`/game/:id`)

```
SCREEN: Game Detail Page
PURPOSE: This is the conversion moment. Show enough trust signals that 
a hesitant user (Maya the Transplant) feels safe joining a game with 
strangers.

LAYOUT (top to bottom):

1. GLASSMORPHIC NAVBAR (Play link active)

2. HERO BAND (60% viewport height)
   - Background: large dark image of a 4G football pitch at dusk
   - Overlay gradient from transparent at top to #131313 at bottom
   - Content (left-aligned, bottom-anchored):
     • Sport badge top: "FOOTBALL · 5-A-SIDE"
     • Massive title: "FRIENDLY 5-A-SIDE" (Lexend Black, 4rem)
     • Venue + area row with map pin icon: "Avoniel 4G Pitches · East Belfast"
     • Time + date row: "Tuesday, 28 April · 7:00 PM – 8:00 PM"
     • Skill chip: "INTERMEDIATE"

3. STICKY ACTION BAR (sticks under navbar on scroll)
   - Left side: "3 of 10 spots left · 14 watching"
   - Right side: "👁 WATCH" outline button + "JOIN GAME — £5" big 
     gradient primary CTA

4. TWO-COLUMN BODY (70/30 split on desktop)

   LEFT COLUMN (main content):
   
   a) ABOUT THIS GAME card (#201f1f bg, 8px radius)
      Heading: "ABOUT"
      Body: "Friendly weekly 5-a-side at Avoniel. Mixed ability but 
      mostly intermediate. We rotate teams every 15 mins. Good vibes 
      only — no slide tackles, no shouting at refs. Post-game pint at 
      The Hatfield is optional but encouraged."
   
   b) HOST card (#201f1f bg)
      Heading: "YOUR HOST"
      Layout: large host avatar (Priya) + name + "Trusted Host" gradient 
      badge + tiny stats row: "47 games hosted · 96% Shows Up · ⭐ 4.9"
      Subtle "MESSAGE HOST" outline button on the right
   
   c) PLAYERS GOING card
      Heading: "PLAYERS GOING (7)"
      Avatar grid showing 7 player avatars + 3 empty slot circles (dashed 
      outline, "+" icon)
      Below: "3 reserves queued" muted text
   
   d) GAME CHAT PREVIEW card (locked)
      Heading: "GAME CHAT"
      Greyed out preview showing one icebreaker message:
      "👋 Welcome! Share what you're wearing so you can find each other."
      Locked overlay: "🔒 Join the game to unlock chat"

   RIGHT COLUMN (sticky sidebar):
   
   e) VENUE MINI-CARD (#201f1f bg)
      - Small venue thumbnail
      - "AVONIEL 4G PITCHES"
      - Address: "Avoniel Rd, Belfast BT5 4SF"
      - Embedded mini-map (placeholder dark map tiles with a pin)
      - "GET DIRECTIONS" outline button
   
   f) WHAT TO BRING card
      Heading: "WHAT TO BRING"
      Bulleted list:
      • Astro/turf trainers (no metal studs)
      • A water bottle
      • Both colour bibs provided
   
   g) RELIABILITY card
      A small graphic showing the host's reliability score as a circular 
      progress ring at 96%, with "SHOWS UP RATE" caption

5. SIMILAR GAMES STRIP (bottom)
   Heading: "OTHER FOOTBALL GAMES THIS WEEK"
   Horizontal scroll of 3 small game cards

VISUAL EMPHASIS:
- The sticky action bar is the conversion mechanic — it must always be 
  visible while scrolling
- The "Watch" button is visually equal to "Join" — that's the strategic 
  point of the Lurk Layer. Watching is not a second-class action.
- The locked chat preview teases value without forcing commitment
```

---

## Prompt 4 — Browse Venues (`/book`)

```
SCREEN: Venue Discovery / Book Page
PURPOSE: Direct court booking — for users who want to organize their own 
game or training session, not join a public one.

LAYOUT (top to bottom):

1. GLASSMORPHIC NAVBAR (Book link active)

2. PAGE HEADER STRIP
   - Heading: "BOOK A PITCH" (Lexend Black)
   - Subheading: "Football pitches and cricket grounds across Belfast. 
     Book in 60 seconds."

3. STICKY FILTER BAR (glassmorphic)
   - Sport chips: Football (active), Cricket (active), then disabled 
     Coming Soon chips
   - Area dropdown: same Belfast areas as before
   - Date picker
   - Time-of-day chips: Morning / Afternoon / Evening
   - Sort: Price / Rating / Distance

4. SPLIT VIEW LAYOUT (60/40 desktop)
   
   LEFT (60%): VENUE GRID
   2-column grid of venue cards. Show 6 venues:
   
   1. AVONIEL 4G PITCHES — East Belfast — Football — £45/hr — ⭐ 4.8 (212 reviews)
      Tags: 5-a-side, 7-a-side, Floodlit, Free Parking
   2. STORMONT CIVIL SERVICE CRICKET CLUB — East Belfast — Cricket — £80/hr 
      — ⭐ 4.9 (88 reviews) — Tags: Match Pitch, Nets, Pavilion
   3. QUEEN'S SPORT PEC — South Belfast — Football — £55/hr — ⭐ 4.7 (340)
      Tags: 5-a-side, Indoor, Showers
   4. CLIFTONVILLE CRICKET CLUB — North Belfast — Cricket — £60/hr — ⭐ 4.6 (54)
      Tags: Outdoor Nets, Match Pitch
   5. GIRDWOOD HUB — North Belfast — Football — £50/hr — ⭐ 4.8 (180)
      Tags: 3G, 5-a-side, 7-a-side, Floodlit
   6. SHAW'S BRIDGE SPORTS COMPLEX — South Belfast — Cricket — £70/hr — ⭐ 4.7 (62)
      Tags: Match Pitch, Practice Nets

   Each card:
   - Large venue image (240px tall) with sport badge top-left and 
     price chip top-right
   - Below image: name in Lexend Bold, then area in muted text
   - Tags row (small pills, low contrast)
   - Bottom row: rating + review count, plus a small gradient 
     "VIEW SLOTS" button

   RIGHT (40%): MAP (sticky)
   - Dark-themed map of Belfast (Mapbox/Google dark style)
   - Pins for each venue using the gradient color
   - Selected pin slightly larger
   - Hover/click on a card highlights its pin

5. BOTTOM CTA STRIP
   "Run a venue in Belfast? List your slots on GameNI and we'll fill them."
   With a "PARTNER WITH US" outline button.

VISUAL EMPHASIS:
- The map should feel premium — dark style, gradient pins, subtle glow 
  on the active pin
- Cards should not have visible borders — only background tone shifts
```

---

## Prompt 5 — Venue Detail With Slot Picker (`/venue/:id`)

```
SCREEN: Venue Detail + Booking Slot Picker
PURPOSE: Where the actual booking happens. Must feel as fast and 
confident as a hotel-booking flow, not as clunky as a council leisure 
centre site.

LAYOUT:

1. GLASSMORPHIC NAVBAR

2. HERO IMAGE GALLERY (60vh)
   - Main image: Avoniel 4G Pitches under floodlights at night
   - Right side: 2x2 thumbnail grid (4 smaller venue photos)
   - Bottom-left overlay:
     • Sport badge: "FOOTBALL · 5-A-SIDE & 7-A-SIDE"
     • Title: "AVONIEL 4G PITCHES" (Lexend Black, large)
     • Address row with map pin icon: "Avoniel Rd, Belfast BT5 4SF"
     • Rating: "⭐ 4.8 · 212 reviews"

3. STICKY ACTION BAR
   - Left: "From £45/hour"
   - Right: gradient "BOOK A SLOT" CTA that scrolls to slot picker

4. TWO-COLUMN BODY (70/30)

   LEFT COLUMN:
   
   a) ABOUT card
      "Avoniel is East Belfast's go-to 4G facility. Floodlit until 10PM, 
      free on-site parking, and 5-a-side and 7-a-side cages with full 
      changing rooms. The astroturf was relaid in 2024."
   
   b) AMENITIES card
      Grid of icons + labels:
      • Floodlit • Free Parking • Changing Rooms • Showers 
      • Equipment Hire • Café Onsite
   
   c) SLOT PICKER card (the main event)
      Heading: "AVAILABLE SLOTS"
      Date selector: horizontal pill row showing the next 7 days, 
      today selected (gradient bg).
      Time grid: a 4-column grid of time slots from 8AM to 10PM in 
      1-hour blocks. Show this state mix:
      • Available slots: dark surface bg, hoverable
      • Selected slot: gradient bg with black text
      • Booked slots: greyed out, struck-through, "BOOKED" label
      • Unavailable slots: very low opacity
      Below the grid: a price summary that updates live —
      "Selected: Tue 28 Apr · 7:00 PM – 8:00 PM · £45"
      Bottom: a big gradient "BOOK THIS SLOT — £45" CTA
   
   d) REVIEWS strip (3 review cards)
      Each: avatar + name + ⭐ stars + 1-line quote + date

   RIGHT COLUMN (sticky sidebar):
   
   e) VENUE INFO card (#201f1f bg)
      - Address with copy icon
      - Phone number
      - Opening hours table (Mon–Sun)
      - "GET DIRECTIONS" outline button
   
   f) MAP card
      - Embedded dark map with pin
      - Caption: "5 min walk from Cregagh bus stop"
   
   g) "TURN THIS BOOKING INTO A GAME" card
      Background: subtle gradient tint
      Copy: "Book the pitch, then open it up to other players. Your 
      booking pays for itself when 4 friends chip in."
      "LEARN ABOUT HOSTING" outline button

5. SIMILAR VENUES STRIP (3 cards horizontally)

VISUAL EMPHASIS:
- The slot picker is THE component — it must be visually crisp and 
  obviously interactive
- Booked slots should look definitively unavailable (low opacity, 
  diagonal stripe pattern is acceptable)
- The "turn booking into a game" card is a critical conversion point — 
  use the gradient to make it pop without making it loud
```

---

## Prompt 6 — Booking Confirmation Modal

```
SCREEN: Booking Confirmation Modal (overlay)
PURPOSE: The moment of commitment. Must feel decisive and reassuring.

LAYOUT:

A modal centered on screen, with the rest of the page dimmed by 
rgba(0,0,0,0.7) overlay with a 4px backdrop-blur.

MODAL CONTAINER:
- Background: #2a2a2a
- Width: 480px on desktop, 90% on mobile
- Border radius: 8px
- Subtle shadow
- Padding: 32px

CONTENT (top to bottom):

1. CLOSE ICON (top-right, ghost style)

2. SUCCESS GLYPH
   A circular gradient badge (60px) with a checkmark icon inside, 
   centered or top-left. Use the primary gradient.

3. HEADLINE
   "BOOKING CONFIRMED" (Lexend Black, uppercase, large)
   Subheadline (Manrope, muted): "Your reference: PIT-A8X92K"

4. BOOKING SUMMARY card (#201f1f bg, inner card)
   A two-column key-value layout:
   - Venue: Avoniel 4G Pitches
   - Sport: Football (5-a-side)
   - Date: Tuesday, 28 April 2026
   - Time: 7:00 PM – 8:00 PM
   - Total: £45.00
   The "Total" row has the value in larger text and gradient color.

5. CALENDAR ACTIONS row
   Two outline buttons side by side:
   "+ ADD TO GOOGLE CAL"   "+ ADD TO APPLE CAL"

6. CONVERSION CTA card (the key thing)
   Background: subtle linear gradient using primary colors at low opacity
   Heading: "OPEN THIS UP TO OTHER PLAYERS?"
   Body: "Create a GameNI game from this booking. Set a per-player fee 
   and let other players join. The pitch could pay for itself."
   Two buttons:
   - Primary gradient: "CREATE A GAME →"
   - Ghost: "Maybe later"

7. CONFIRMATION DETAILS footer (small, muted text)
   "We've sent confirmation to maya@example.com and a WhatsApp 
   message to your phone. Cancel anytime up to 24 hours before."

VISUAL EMPHASIS:
- Animation: modal scales in from 0.95 → 1.0 with fade
- The "Create a Game" CTA must visually outweigh "Maybe later"
- This is the conversion moment from solo booker to community organizer
```

---

## Prompt 7 — User Profile / Dashboard (`/profile`)

```
SCREEN: User Profile / Dashboard
PURPOSE: Show the user their identity in the system — their rituals, 
their reliability, the games they're watching. This is where the 
"Lurk Layer" pays off visibly.

LAYOUT:

1. GLASSMORPHIC NAVBAR (Profile link active)

2. PROFILE HEADER BAND (large)
   - Background: subtle gradient overlay on dark
   - Left: large circular avatar (120px) with gradient ring
   - Center:
     • Name: "MAYA OKONKWO" (Lexend Black, large)
     • Tagline: "South Belfast · Football, Cricket curious"
     • Joined date: "Member since March 2026" (muted)
   - Right: stat tiles row (4 tiles, glassmorphic style):
     • 14 GAMES PLAYED
     • 96% SHOWS UP
     • 7 ON WATCHLIST
     • 1 GAME HOSTED
   - Below: "EDIT PROFILE" outline button + "BECOME A HOST" gradient button

3. TAB STRIP (sticky)
   Tabs: Upcoming Games | Watchlist | Past Games | Hosting
   Active tab: "Upcoming Games" with gradient underline

4. UPCOMING GAMES section (default tab)
   A vertical list of 3 game cards (compact horizontal layout):
   
   1. Tonight 7PM — Friendly 5-a-side @ Avoniel 4G — host: Priya — 
      "JOINED" green pill — "VIEW DETAILS" outline button
   2. Sat 2PM — T20 Cricket Pickup @ Cliftonville CC — host: David — 
      "RESERVE #2" orange pill — "VIEW QUEUE" outline button
   3. Wed 6:30PM — Ladies 5-a-side @ Olympic Park — host: Maya — 
      "HOSTING" gradient pill — "MANAGE GAME" gradient button

5. WATCHLIST section (collapsed by default but visible)
   Heading: "👁 ON YOUR WATCHLIST"
   Subtext: "We'll ping you if a spot opens"
   Horizontal scroll of 4 small game cards. Each card has a small 
   "STOP WATCHING" ghost button.

6. RELIABILITY VISUAL card (right column on desktop, full width on mobile)
   Heading: "YOUR SHOWS UP SCORE"
   Large circular progress ring at 96%, gradient fill
   Caption: "You've shown up to 14 of your last 15 games. Top 8% of 
   Belfast players."

7. NOTIFICATIONS PREFERENCES strip (bottom)
   Toggle row:
   ☑ WhatsApp (recommended)  ☐ SMS  ☑ Email  ☑ Push

VISUAL EMPHASIS:
- The reliability score is a HERO element — make it feel earned and visible
- The "RESERVE #2" pill should feel hopeful, not punitive
- The Hosting tab should be subtly highlighted (small gradient dot) 
  to encourage hosting behavior
```

---

## Prompt 8 — Auth Modal (Sign Up / Log In)

```
SCREEN: Authentication Modal (overlay)
PURPOSE: Low-friction sign-up. The product philosophy is that watching 
is free; the paywall is on action. So this modal appears when a user 
clicks "Watch" or "Join" without an account.

LAYOUT:

A centered modal, background dimmed by rgba(0,0,0,0.7) with backdrop-blur.

MODAL CONTAINER:
- Background: #2a2a2a
- Width: 440px on desktop, 92% on mobile
- Border radius: 8px
- Padding: 40px 32px

CONTENT (top to bottom):

1. CLOSE ICON (top-right, ghost)

2. CONTEXT BANNER (top of modal, small)
   Background: subtle gradient at low opacity
   Body: "👁 You're about to watch 'Friendly 5-a-side'. 
   No commitment. We just need 30 seconds."

3. TAB SWITCHER
   Two tabs side by side: "SIGN UP" (active, gradient underline) | 
   "LOG IN" (inactive)

4. OAUTH BUTTONS row
   Two buttons stacked, full-width:
   - "Continue with Google" — white background, dark text, Google logo
   - "Continue with Apple" — black background, white text, Apple logo

5. DIVIDER row
   Horizontal line on each side, "OR" in the middle (muted text)

6. FORM FIELDS (for Sign Up)
   - Full Name input (placeholder: "Maya Okonkwo")
   - Email input (placeholder: "you@email.com")
   - Password input with show/hide toggle
   - Area dropdown (placeholder: "Where in Belfast?" — options: 
     Botanic, Ormeau, East Belfast, North Belfast, South Belfast, 
     West Belfast, Castlereagh)
   - Sport interest checkboxes: ☑ Football  ☑ Cricket  
     (with disabled "Coming Soon" badges next to: Badminton, 
     Swimming, Tennis, Basketball, Padel, GAA)
   
   Inputs use #353534 background, no visible border, 4px radius, 
   12px padding.

7. LEGAL TEXT (small, muted)
   "By signing up you agree to our Terms and Privacy Policy. 
   We'll send game alerts via WhatsApp — opt out anytime."

8. PRIMARY CTA
   Full-width gradient button: "CREATE ACCOUNT & WATCH GAME"
   (Note the copy — it ties the action to the original intent)

9. SWITCH MODE LINK (bottom, small)
   "Already on GameNI? Log in →" (muted, with gradient arrow)

VISUAL EMPHASIS:
- The context banner at the top is critical — it tells the user WHY 
  they're seeing this modal, which makes sign-up feel like a step 
  toward their goal, not a barrier
- The CTA copy should change based on context: "Watch game", "Join 
  game", "Book pitch"
- Sport selection in sign-up sets the user's feed preferences from 
  the first session
```

---

## Hackathon-Specific Tips

### Demo Flow For Judges (5-Minute Script)

1. **Open Landing** — show the live game count, search by Football + East Belfast
2. **Browse Games** — filter to Football, point out the "Coming Soon" sports as the productisation roadmap
3. **Click a Game** — show the Watch button with equal weight to Join (this is the differentiator)
4. **Click Watch** — Auth modal pops up with contextual banner
5. **Skip auth** (mock it), come back to show Profile with watchlist
6. **Click Book** → Venue list → Avoniel detail → Slot picker → Confirmation modal
7. **Land on the "Open this up to other players?" CTA** — close on the conversion from solo booker to community host

### Things To Generate Assets For Separately

These are not screens but you'll need them as image assets:
- **GAMENI wordmark** (use Lexend Black, all caps, with a tiny gradient dot for the "I" tittle)
- **Sport icons** (use Phosphor or Lucide for football, cricket — make them line-style, weight 2)
- **Trusted Host badge** (small gradient checkmark in a circle)

### Cutting For Hackathon Time

If you only have time to build 4 screens, prioritise in this order:

| Priority | Screen | Why |
|---|---|---|
| 1 | Browse Games | This is the core loop — judges need to feel the product |
| 2 | Game Detail | The conversion moment + showcases Watch/Join/Reserve |
| 3 | Landing | First impression for the demo |
| 4 | Booking Confirmation Modal | Closes the conversion loop |

Skip Profile, Auth, and Browse Venues for the demo if time is tight — they don't carry the strategic argument.

### After Wireframes

Once the wireframes are approved, paste them into Claude with this prompt to convert to working code:

```
Convert this wireframe into a single-file React component using 
Tailwind utility classes. Use the design tokens from the GameNI 
design system. Make all interactive elements functional with mock 
state (useState). The output should be a self-contained .jsx file 
I can paste into a Vite React app.
```

---

## Summary

You now have:
- 1 reusable design system preamble
- 8 complete screen prompts
- A demo flow for hackathon judges
- A cutting strategy if time runs short

Each prompt is self-contained but designed to produce visually consistent output across screens when the same preamble is used. Run them in order, and you'll have a coherent prototype.
