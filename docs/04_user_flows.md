# 04 — User Flows & Journeys

## Flow 1: New User Onboarding (The Transplant Journey)

```mermaid
flowchart TD
    A[Land on Homepage] --> B{Has Account?}
    B -->|No| C[Browse Games & Venues as Guest]
    C --> D[Sees 'Watch' button on a game]
    D --> E[Clicks Watch → Prompted to Sign Up]
    E --> F[Sign Up: Email / Google OAuth]
    F --> G[Profile Setup: Name, Photo, Sports, Skill Level, Area]
    G --> H[Game added to Watchlist]
    H --> I[Receives notification: 'Slot opened!']
    I --> J[Joins game as Sub-in]
    J --> K[Attends first game]
    K --> L[Post-game: 'Was match balanced?' survey]
    L --> M[Becomes a Regular after 3 sessions]
    B -->|Yes| N[Log In → Dashboard]
```

### Key Design Decisions:
- **Guest Browsing:** Users can see ALL content without signing up. The paywall is on *action* (join/watch), not on *viewing*.
- **Watch-First:** The first CTA is "Watch", not "Join". This lowers the commitment threshold.
- **Profile is Minimal:** Name + one sport + area. No lengthy onboarding questionnaire.

---

## Flow 2: Joining a Game (The Core Loop)

```mermaid
flowchart TD
    A[Browse Game Feed] --> B[Filter by Sport / Date / Area]
    B --> C[Select a Game Card]
    C --> D{Slots Available?}
    D -->|Yes| E[Click 'Join Game']
    E --> F[Confirmation Toast: 'Joined! See you at 6PM']
    F --> G[Game Chat Room Unlocked]
    G --> H[Pre-Game Icebreaker Auto-Posted]
    H --> I[Show Up & Play]
    I --> J[Post-Game Survey]
    D -->|No| K[Click 'Join as Reserve']
    K --> L[Added to Reserve Queue]
    L --> M{Slot Opens?}
    M -->|Yes| N[Push Notification: 'Spot opened!']
    N --> O{Accept within 30min?}
    O -->|Yes| E
    O -->|No| P[Next Reserve Notified]
    M -->|No| Q[Game Happens Without You - No Penalty]
```

### Key Design Decisions:
- **No Payment at Join (MVP):** In MVP, payment is handled at the venue. In-app payments come in Tier 3.
- **30-Minute Accept Window:** Prevents reserves from ghosting after being notified.
- **No Penalty for Reserves:** Reserves who decline are not penalised — they never committed.

---

## Flow 3: Watching a Game (The Lurk Layer)

```mermaid
flowchart TD
    A[See Game Card] --> B[Click Star Icon: 'Watch']
    B --> C[Game added to My Watchlist]
    C --> D[Watcher count on card increments]
    D --> E{Any Activity?}
    E -->|Slot Opens| F[Push: 'A spot opened in Friendly 5-a-side!']
    E -->|Game Cancelled| G[Push: 'Game cancelled — removed from watchlist']
    E -->|Game Starts Soon| H[Push: '2 hours until Friendly 5-a-side — still watching?']
    F --> I{User Joins?}
    I -->|Yes| J[Converted to Player]
    I -->|No| K[Stays on Watchlist]
```

### Key Design Decisions:
- **Anonymous:** Watchers are NOT visible to other players. Only the organizer sees the count (not names).
- **Soft Nudges:** The "still watching?" notification is a gentle conversion prompt, not pressure.

---

## Flow 4: Hosting a Game (Organizer Flow)

```mermaid
flowchart TD
    A[Tap 'Create Game'] --> B[Select Sport]
    B --> C[Select Venue + Time Slot from availability]
    C --> D[Set: Title, Skill Level, Max Players, Fee per Player]
    D --> E[Publish Game]
    E --> F[Game appears in Feed]
    F --> G[Players Join / Watch / Reserve]
    G --> H{Game Time Approaching}
    H --> I[Host sees: X confirmed, Y reserves, Z watching]
    I --> J{Player Drops Out}
    J --> K[System Auto-Notifies First Reserve]
    K --> L[Reserve accepts → Slot Filled]
    J --> M[If no reserves → Watcher gets nudge]
    H --> N[Game Happens]
    N --> O[Post-Game: Host can post recap/photo]
    O --> P[Host earns reliability points + revenue share]
```

---

## Flow 5: Venue Booking (Direct Court Booking)

```mermaid
flowchart TD
    A[Browse Venues] --> B[Filter by Sport / Area]
    B --> C[Select Venue Card]
    C --> D[Venue Detail: Info, Photos, Map, Reviews]
    D --> E[Select Date]
    E --> F[See Available Time Slots]
    F --> G[Select Slot]
    G --> H[Booking Summary Modal]
    H --> I[Confirm Booking]
    I --> J[Confirmation: Reference Number]
    J --> K[Optional: Create a Game at This Booking]
```

### Key Design Decision:
- **Booking → Game Creation Bridge:** After booking a court, the user is prompted: *"You've booked a pitch — want to open it up as a game?"* This converts solo bookings into community games.

---

## Flow 6: Post-Game Feedback Loop

```mermaid
flowchart TD
    A[Game Ends] --> B[Push Notification: 'How was the game?']
    B --> C[Quick Survey: 3 questions]
    C --> D["Q1: Was the match well-balanced? (Yes / Too Easy / Too Hard)"]
    D --> E["Q2: Would you play with this group again? (Yes / Maybe / No)"]
    E --> F["Q3: How was the host? (👍 / 👎)"]
    F --> G[Data feeds into Invisible Elo]
    G --> H[Data feeds into Host Reliability Score]
    H --> I[Data feeds into Matchmaking Algorithm]
```

### Key Design Decisions:
- **3 questions max.** Anything more kills completion rates.
- **No individual player ratings.** You rate the *game quality* and the *host*, never a specific player. This prevents social toxicity.
- **Invisible Elo adjusts silently.** Users notice that games "feel right" over time.

---

## Journey Map: The Transplant (Maya, 29)

| Week | Action | Emotion | Platform State |
|---|---|---|---|
| 1 | Finds Pitch via Instagram ad. Browses games. | Curious but cautious. | Guest |
| 1 | Watches 3 football games. | Low commitment, feels safe. | Watcher |
| 2 | Gets notification: "Slot opened in Friendly 5-a-side!" | Excited but nervous. | Watcher |
| 2 | Joins as Sub-in. Uses game chat to say hi. | Relieved to have context. | Player |
| 2 | Attends first game. Plays OK. Host is friendly. | "That was actually fun." | Player |
| 3 | Joins the same host's game the next week without prompting. | Building routine. | Returning Player |
| 5 | Watches a Tuesday game at Avoniel she wasn't prompted about. | Habitual behaviour. | Regular |
| 8 | Creates her first game: "Ladies 5-a-side, All Levels" | Identity shift: organizer. | Host |
