import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, onSnapshot, updateDoc, deleteDoc, increment, runTransaction, query, where, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  projectId: "gameni-belfast",
  appId: "1:936361814428:web:39f72a60658a1da7f44059",
  storageBucket: "gameni-belfast.firebasestorage.app",
  apiKey: "AIzaSyBw134ZpZI7oCXfgTSBHAomPGGtu9bR_co",
  authDomain: "gameni-belfast.firebaseapp.com",
  messagingSenderId: "936361814428",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ── Data ──
let VENUES = [];
let GAMES = [];

// Real-time listeners
onSnapshot(collection(db, "venues"), (snapshot) => {
  VENUES = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  if (currentPage === 'home' || currentPage === 'book') refreshCurrentPage();
});

onSnapshot(collection(db, "games"), (snapshot) => {
  GAMES = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  if (currentPage === 'home' || currentPage === 'play' || currentPage === 'history') refreshCurrentPage();
});

function refreshCurrentPage() {
  const app = $('#app-content');
  switch(currentPage) {
    case 'home': app.innerHTML = renderHome(); break;
    case 'book': app.innerHTML = renderBook(); break;
    case 'play': app.innerHTML = renderPlay(); break;
    case 'history': app.innerHTML = renderHistory(); break;
    case 'payment': app.innerHTML = renderPayment(currentParams?.gameId); break;
    default: app.innerHTML = renderHome(); break;
  }
  bindPageEvents();
}

const SPORTS = [
  {name:"All",icon:"🏟️"},{name:"Football",icon:"⚽"},{name:"Cricket",icon:"🏏"},{name:"Badminton",icon:"🏸"},{name:"Swimming",icon:"🏊"},{name:"Padel",icon:"🎾"},{name:"Pickleball",icon:"🏓"}
];

// ── State ──
let currentPage = 'home';
let selectedSport = 'All';
let selectedVenueFilter = 'Popular';
let selectedCity = 'Belfast';
let currentUser = null;
let currentParams = null;

// ── Helpers ──
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const toast = (msg, type='success') => {
  const c = $('#toast-container');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fas fa-${type==='success'?'check-circle':'exclamation-circle'}"></i>${msg}`;
  c.appendChild(t);
  setTimeout(() => t.remove(), 4000);
};

// ── Render Functions ──
function renderSportsChips(active) {
  const chips = SPORTS.map(s => `<div class="sport-chip ${s.name===active?'active':''}" data-sport="${s.name}"><span class="sport-icon">${s.icon}</span><span>${s.name}</span></div>`).join('');
  return chips + `<div class="sport-chip disabled-chip" style="opacity: 0.6; cursor: default; border: 1px dashed var(--border-color); background: transparent;"><span class="sport-icon">⏳</span><span>More games coming soon</span></div>`;
}

function renderVenueCard(v) {
  const sport = (v.sportType || v.sport || '').toUpperCase();
  const area = (v.address && v.address.street) ? v.address.street : (v.area || '');
  const city = (v.address && v.address.city) ? v.address.city : (v.city || 'Belfast');
  const locDisplay = area ? `${area}, ${city}` : city;
  const img = v.imageURL || v.img || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800';
  const tags = v.amenities || v.tags || [];
  let rating = "4.8";
  if (v.ratings && v.ratings !== "N/A") {
    const match = v.ratings.match(/([\d\.]+)\/5/);
    if (match) rating = match[1];
  } else if (v.rating) {
    rating = v.rating;
  }
  const reviews = v.reviews || "120";
  // Smart price display: if it's a plain number, wrap in £/hr; otherwise show as-is
  const rawPrice = v.price || "";
  let priceDisplay;
  if (!rawPrice) {
    priceDisplay = `<span>Contact for pricing</span>`;
  } else if (/^[\d\.]+$/.test(rawPrice.trim())) {
    priceDisplay = `£${rawPrice}<span>/hr</span>`;
  } else {
    priceDisplay = `<span style="font-size:0.72rem;font-weight:600;line-height:1.2">${rawPrice}</span>`;
  }
  return `<div class="venue-card" data-venue-id="${v.id}">
    <div class="venue-card-img"><img src="${img}" alt="${v.name}" loading="lazy"><span class="venue-card-badge">${sport}</span><button class="venue-card-fav" aria-label="Favorite"><i class="far fa-heart"></i></button></div>
    <div class="venue-card-body"><h3>${v.name}</h3><div class="venue-card-loc"><i class="fas fa-map-marker-alt"></i>${locDisplay}</div><div class="venue-card-tags">${tags.map(t=>`<span class="venue-tag">${t}</span>`).join('')}</div></div>
    <div class="venue-card-footer"><div class="venue-price">${priceDisplay}</div><div class="venue-rating"><i class="fas fa-star"></i> ${rating}</div></div></div>`;
}


function formatDate(dateStr) {
  if (!dateStr || dateStr === 'Today') return 'Today';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return 'Today';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function renderGameCard(g) {
  const isLive = g.date === 'Today' && g.time.includes('6:00 PM');
  const isFull = g.slotsLeft === 0;
  const hasJoined = currentUser && g.players && g.players.includes(currentUser.uid);
  const isHost = currentUser && g.hostId === currentUser.uid;
  const watchCount = g.watchers || 0;
  
  return `<div class="game-card" data-game-id="${g.id}">
    <div class="game-card-header">
      <span class="game-sport-badge">${g.sport}</span>
      <span class="game-slots ${isLive ? 'live-pulse' : ''}" style="${isFull ? 'color:var(--text-muted)' : ''}">
        ${isFull ? 'Waitlist Open' : g.slotsLeft + ' slots left'}
      </span>
    </div>
    <h3>${g.title}</h3>
    <div class="game-meta">
      <div class="game-meta-item"><i class="fas fa-map-marker-alt"></i>${g.venue}, ${g.area}</div>
      <div class="game-meta-item"><i class="fas fa-calendar"></i>${formatDate(g.date)} · ${g.time}</div>
      <div class="game-meta-item"><i class="fas fa-signal"></i>${g.level}</div>
      <div class="game-meta-item"><i class="fas fa-eye"></i>${watchCount} players watching</div>
    </div>
    <div class="game-card-footer">
      <div class="game-host-row">
        <div class="game-host"><div class="game-host-avatar">${(g.host || 'Unknown').split(' ').map(n=>n[0]).join('')}</div><span class="game-host-name">Hosted by ${g.host || 'Unknown'}</span></div>
        <span class="venue-price" style="font-size:1rem;">${g.fee !== undefined ? '£' + g.fee : 'Free'}</span>
      </div>
      <div class="game-actions">
        <button class="btn btn-outline btn-watch" style="flex:1" data-id="${g.id}"><i class="far fa-star"></i> Watch</button>
        ${hasJoined ? `
          <button class="btn btn-leave-match ${isHost ? 'btn-cancel-match' : 'btn-leave'}"
                  style="flex:2;"
                  data-id="${g.id}">
            <i class="fas fa-sign-out-alt"></i> ${isHost ? 'Cancel Match' : 'Leave Match'}
          </button>
        ` : `
          <button class="btn ${isFull ? 'btn-outline reserve' : 'btn-primary'} btn-join" 
                  style="flex:2;" 
                  data-id="${g.id}">
            ${isFull ? 'Join as Reserve' : 'Join Game'}
          </button>
        `}
      </div>
    </div></div>`;
}

// ── Pages ──
function renderHome() {
  const hour = new Date().getHours();
  const headline = hour < 6  ? 'Belfast\nNever Sleeps.'  :
                   hour < 12 ? 'Lace Up,\nBelfast.'      :
                   hour < 17 ? 'Game On,\nBelfast.'      :
                   hour < 21 ? 'Tonight,\nBelfast Plays.':
                               'One More Game,\nBelfast.';
  const dateStr = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  const sportCounts = {};
  GAMES.forEach(g => { if (g.sport) sportCounts[g.sport] = (sportCounts[g.sport] || 0) + 1; });

  const sportDefs = [
    { name: 'Football',   icon: '⚽', c1: '#14532d', c2: '#16a34a' },
    { name: 'Cricket',    icon: '🏏', c1: '#7c2d12', c2: '#ea580c' },
    { name: 'Badminton',  icon: '🏸', c1: '#0c4a6e', c2: '#0284c7' },
    { name: 'Swimming',   icon: '🏊', c1: '#1e3a5f', c2: '#2563eb' },
    { name: 'Padel',      icon: '🎾', c1: '#4c1d95', c2: '#7c3aed' },
    { name: 'Pickleball', icon: '🏓', c1: '#881337', c2: '#e11d48' },
  ];

  const liveGames = GAMES.filter(g => g.slotsLeft > 0).slice(0, 4);
  const featuredVenue = VENUES.length > 0 ? [...VENUES].sort((a,b) => (parseInt(b.reviews)||0)-(parseInt(a.reviews)||0))[0] : null;

  return `
    <div class="home-v2">

      <div class="home-hero-v2">
        <div class="home-hero-left">
          <div class="home-hero-eyebrow"><span class="live-dot"></span>${dateStr}</div>
          <h1 class="home-hero-title">${headline.replace('\n','<br>')}</h1>
          <p class="home-hero-sub">Find your sport. Join a game. Book a pitch.</p>
          <div class="home-hero-stats">
            <div class="home-hero-stat"><strong>${GAMES.length}</strong><span>Games listed</span></div>
            <div class="home-hero-stat-div"></div>
            <div class="home-hero-stat"><strong>${VENUES.length}</strong><span>Venues</span></div>
            <div class="home-hero-stat-div"></div>
            <div class="home-hero-stat"><strong>${GAMES.filter(g=>g.slotsLeft>0).length}</strong><span>Spots open</span></div>
          </div>
        </div>
        <div class="home-hero-actions">
          <button class="btn home-btn-primary" onclick="navigateTo('play')"><i class="fas fa-users"></i> Find a Game</button>
          <button class="btn home-btn-outline" onclick="navigateTo('book')"><i class="fas fa-map-marked-alt"></i> Book a Venue</button>
        </div>
      </div>

      <div class="home-section-row">
        <h2 class="home-section-title">Explore by Sport</h2>
        <button class="home-link-btn" onclick="navigateTo('play')">All games <i class="fas fa-arrow-right"></i></button>
      </div>

      <div class="sport-tiles-grid">
        ${sportDefs.map(s => {
          const count = sportCounts[s.name] || 0;
          return `<div class="sport-tile-v2" style="background:linear-gradient(145deg,${s.c1},${s.c2})" onclick="navigateToSport('${s.name}')">
            <span class="sport-tile-icon">${s.icon}</span>
            <span class="sport-tile-name">${s.name}</span>
            <span class="sport-tile-count">${count > 0 ? count + ' game' + (count !== 1 ? 's' : '') : 'Coming soon'}</span>
          </div>`;
        }).join('')}
      </div>

      <div class="home-bottom-grid">
        <div class="home-games-col">
          <div class="home-section-row" style="margin-bottom:16px">
            <h2 class="home-section-title">Playing Soon</h2>
            <button class="home-link-btn" onclick="navigateTo('play')">View all <i class="fas fa-arrow-right"></i></button>
          </div>
          ${liveGames.length > 0 ? `
            <div class="home-games-stack">
              ${liveGames.map(g => renderCompactGameCard(g)).join('')}
            </div>
          ` : `
            <div class="home-empty-state">
              <div style="font-size:3rem;margin-bottom:12px">🏟️</div>
              <p style="color:var(--text-muted);margin-bottom:16px">No games yet — be the first to host one.</p>
              <button class="btn btn-primary" onclick="showCreateGameModal()"><i class="fas fa-plus"></i> Host a Game</button>
            </div>
          `}
        </div>

        <div class="home-sidebar-col">
          <div class="home-host-cta" id="bento-cta-host">
            <div class="home-host-icon">🎯</div>
            <h3>Can't find what<br>you're looking for?</h3>
            <p>Host your own game and fill it with players from the community.</p>
            <button class="home-cta-btn">Host a Game</button>
          </div>
          ${featuredVenue ? `
            <div class="home-venue-card" onclick="openBooking('${featuredVenue.id}')" style="cursor:pointer">
              <div class="home-venue-img">
                <img src="${featuredVenue.imageURL || featuredVenue.img || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=600'}" alt="${featuredVenue.name}" loading="lazy">
                <span class="venue-card-badge">${(featuredVenue.sportType || featuredVenue.sport || '').toUpperCase()}</span>
              </div>
              <div class="home-venue-body">
                <div>
                  <h4>${featuredVenue.name}</h4>
                  <p>${featuredVenue.area || 'Belfast'}</p>
                </div>
                <span class="home-venue-price">${featuredVenue.price ? '£' + featuredVenue.price + '/hr' : 'View'}</span>
              </div>
            </div>
          ` : ''}
        </div>
      </div>

    </div>
  `;
}

function renderCompactGameCard(g) {
  const isFull = g.slotsLeft === 0;
  const hasJoined = currentUser && g.players && g.players.includes(currentUser.uid);
  const total = (g.totalSpots || 10);
  const filled = total - (g.slotsLeft || 0);
  const fillPct = Math.round((filled / total) * 100);

  return `
    <div class="compact-game-card">
      <div class="compact-game-main">
        <div class="compact-game-top">
          <span class="game-sport-badge">${g.sport}</span>
          <span class="compact-game-fee">${g.fee ? '£' + g.fee : 'Free'}</span>
        </div>
        <h4 class="compact-game-title">${g.title}</h4>
        <div class="compact-game-meta">
          <span><i class="fas fa-map-marker-alt"></i>${g.venue}</span>
          <span><i class="fas fa-clock"></i>${formatDate(g.date)} · ${g.time}</span>
        </div>
        <div class="compact-game-bar">
          <div class="compact-game-fill" style="width:${fillPct}%"></div>
        </div>
        <div class="compact-game-slots">${filled}/${total} players · ${isFull ? 'Waitlist open' : g.slotsLeft + ' spots left'}</div>
      </div>
      <div class="compact-game-action">
        ${hasJoined
          ? `<button class="btn btn-outline compact-action-btn btn-leave" data-id="${g.id}"><i class="fas fa-sign-out-alt"></i> Leave</button>`
          : `<button class="btn ${isFull ? 'btn-outline reserve' : 'btn-primary'} compact-action-btn btn-join" data-id="${g.id}">${isFull ? 'Reserve' : 'Join'}</button>`
        }
      </div>
    </div>
  `;
}

function renderBook() {
  let venues = [...VENUES];
  if (selectedSport !== 'All') {
    venues = venues.filter(v => 
      (v.sportType && v.sportType.toLowerCase() === selectedSport.toLowerCase()) || 
      (v.sport && v.sport.toLowerCase() === selectedSport.toLowerCase())
    );
  }

  // Sorting logic based on selectedVenueFilter
  if (selectedVenueFilter === 'Price: Low') {
    venues.sort((a, b) => {
      const getPrice = (v) => {
        if (!v.price) return Infinity;
        if (!isNaN(v.price)) return parseFloat(v.price);
        const match = v.price.match(/£([\d\.]+)/);
        return match ? parseFloat(match[1]) : Infinity;
      };
      return getPrice(a) - getPrice(b);
    });
  } else if (selectedVenueFilter === 'Top Rated') {
    venues.sort((a, b) => {
      const getRating = (v) => {
        if (v.ratings && v.ratings !== "N/A") {
          const match = v.ratings.match(/([\d\.]+)\/5/);
          if (match) return parseFloat(match[1]);
        }
        return v.rating ? parseFloat(v.rating) : 0;
      };
      return getRating(b) - getRating(a);
    });
  } else if (selectedVenueFilter === 'Popular') {
    // For popular, we can use a mock sort or keep default order
    // Let's sort by ID to ensure consistency, or simply leave as is.
    // For a real app, this would be based on booking frequency.
  }

  return `
    <section class="section">
      <div class="section-header">
        <div class="section-header-text">
          <h2>Book Venues</h2>
          <p>Find and book the best sports facilities around you.</p>
        </div>
      </div>
      <div class="sports-scroll">${renderSportsChips(selectedSport)}</div>
      <div class="filter-bar">
        <span class="filter-chip ${selectedVenueFilter === 'Popular' ? 'active' : ''}" data-venue-filter="Popular">Popular</span>
        <span class="filter-chip ${selectedVenueFilter === 'Price: Low' ? 'active' : ''}" data-venue-filter="Price: Low">Price: Low</span>
        <span class="filter-chip ${selectedVenueFilter === 'Top Rated' ? 'active' : ''}" data-venue-filter="Top Rated">Top Rated</span>
      </div>
      <div class="cards-grid" id="venues-grid">${venues.length ? venues.map(renderVenueCard).join('') : '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:60px 0;font-size:1.1rem;">No venues found for this sport. Try a different filter.</p>'}</div>
    </section>`;
}

function renderPlay() {
  let games = GAMES;
  if (selectedSport !== 'All') {
    games = games.filter(g => g.sport && g.sport.toLowerCase() === selectedSport.toLowerCase());
  }

  const emptyState = `
    <div style="grid-column:1/-1; text-align:center; padding: 60px 20px;">
      <div style="width:80px;height:80px;border-radius:50%;background:var(--primary-container);color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:2.5rem;margin:0 auto 24px; opacity:0.8">
        <i class="fas fa-futbol"></i>
      </div>
      <h3 style="font-size:1.4rem;margin-bottom:8px;color:var(--text)">No games yet${selectedSport !== 'All' ? ' for ' + selectedSport : ''}</h3>
      <p style="color:var(--text-muted);margin-bottom:24px;max-width:360px;margin-left:auto;margin-right:auto;">Be the first to host a community game and invite players to join you.</p>
      <button class="btn btn-primary" id="empty-create-btn"><i class="fas fa-plus"></i> Host a Game</button>
    </div>`;

  return `
    <section class="section">
      <div class="section-header">
        <div class="section-header-text">
          <h2>Matches</h2>
          <p>Join a community game or hit the <strong>+</strong> to host one.</p>
        </div>
      </div>
      <div class="sports-scroll">${renderSportsChips(selectedSport)}</div>
      <div class="filter-bar">
        <span class="filter-chip active" data-time-filter="all">All Games</span>
        <span class="filter-chip" data-time-filter="today">Today</span>
        <span class="filter-chip" data-time-filter="week">This Week</span>
      </div>
      <div class="cards-grid" id="games-grid">${games.length ? games.map(renderGameCard).join('') : emptyState}</div>
    </section>`;
}

function renderHistory() {
  if (!currentUser) {
    return `
      <section class="section">
        <div class="section-header">
          <div class="section-header-text">
            <h2>Match History</h2>
            <p>Please log in to see your match history.</p>
          </div>
        </div>
        <div style="text-align:center; padding: 60px 20px;">
          <button class="btn btn-primary" onclick="openAuth('login')">Log In</button>
        </div>
      </section>`;
  }

  const myGames = GAMES.filter(g => 
    g.hostId === currentUser.uid || 
    (g.players && g.players.includes(currentUser.uid))
  );

  const now = new Date();
  const getGameDateTime = (g) => {
    if (g.dateTime) { const d = new Date(g.dateTime); if (!isNaN(d)) return d; }
    if (g.date && g.date !== 'Today' && g.time) { const d = new Date(`${g.date}T${g.time}:00`); if (!isNaN(d)) return d; }
    return new Date();
  };
  const upcoming = myGames.filter(g => getGameDateTime(g) >= now).sort((a, b) => getGameDateTime(a) - getGameDateTime(b));
  const past = myGames.filter(g => getGameDateTime(g) < now).sort((a, b) => getGameDateTime(b) - getGameDateTime(a));

  return `
    <section class="section">
      <div class="section-header">
        <div class="section-header-text">
          <h2>Your Match Activity</h2>
          <p>Upcoming and previous games you're part of.</p>
        </div>
      </div>

      <div class="history-sections">
        <div class="history-group">
          <h3 style="margin: 24px 0 16px; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-calendar-check" style="color:var(--primary)"></i> Upcoming Matches
          </h3>
          <div class="cards-grid">
            ${upcoming.length ? upcoming.map(renderGameCard).join('') : `
              <div style="grid-column:1/-1; padding: 30px; background: rgba(255,255,255,0.03); border-radius:12px; text-align:center; color:var(--text-muted)">
                No upcoming matches. <a href="#" onclick="navigateTo('play')" style="color:var(--primary)">Find one?</a>
              </div>
            `}
          </div>
        </div>

        <div class="history-group" style="margin-top: 48px;">
          <h3 style="margin: 24px 0 16px; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-history" style="color:var(--text-muted)"></i> Past Matches
          </h3>
          <div class="cards-grid">
            ${past.length ? past.map(renderGameCard).join('') : `
              <div style="grid-column:1/-1; padding: 30px; background: rgba(255,255,255,0.03); border-radius:12px; text-align:center; color:var(--text-muted)">
                No past matches found.
              </div>
            `}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderPayment(gameId) {
  const g = GAMES.find(x => x.id === gameId);
  if (!g) return `<div class="section"><h2>Error</h2><p>Match not found.</p></div>`;

  return `
    <section class="section" style="max-width: 500px; margin: 0 auto;">
      <div class="section-header" style="text-align:center; display:block;">
        <h2 style="font-size:2rem; margin-bottom:8px;">Secure Payment</h2>
        <p style="color:var(--text-muted)">Finalize your booking for ${g.title}</p>
      </div>

      <div class="payment-card" style="background:var(--bg-surface); padding:32px; border-radius:24px; border:1px solid var(--border); box-shadow:var(--shadow-lg);">
        <div class="booking-summary" style="margin-bottom:24px;">
          <div class="booking-row" style="display:flex; justify-content:space-between; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid var(--border);">
            <span style="color:var(--text-muted)">Match</span>
            <span style="font-weight:600;">${g.title}</span>
          </div>
          <div class="booking-row" style="display:flex; justify-content:space-between; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid var(--border);">
            <span style="color:var(--text-muted)">Venue</span>
            <span style="font-weight:600;">${g.venue}</span>
          </div>
          <div class="booking-row" style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:1.2rem;">
            <span style="font-weight:700;">Total Amount</span>
            <span style="font-weight:700; color:var(--primary);">£${g.fee}</span>
          </div>
        </div>

        <div class="payment-methods" style="margin-bottom:24px;">
          <p style="font-weight:600; margin-bottom:12px; font-size:0.9rem;">Payment Method</p>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div style="padding:16px; border:2px solid var(--primary); border-radius:12px; display:flex; align-items:center; gap:8px; cursor:pointer;">
              <i class="fas fa-credit-card" style="color:var(--primary)"></i>
              <span style="font-size:0.85rem; font-weight:600;">Card</span>
            </div>
            <div style="padding:16px; border:1px solid var(--border); border-radius:12px; display:flex; align-items:center; gap:8px; opacity:0.5; cursor:not-allowed;">
              <i class="fab fa-apple-pay"></i>
              <span style="font-size:0.85rem;">Pay</span>
            </div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:20px;">
          <label style="font-size:0.8rem;">Card Number</label>
          <input type="text" value="**** **** **** 4421" disabled style="background:var(--bg-app); cursor:not-allowed;">
        </div>

        <button class="btn btn-primary btn-full" id="confirm-payment-btn" style="height:56px; font-size:1.1rem;">
          Pay £${g.fee} & Join Match
        </button>
        
        <p style="text-align:center; margin-top:16px; font-size:0.8rem; color:var(--text-muted);">
          <i class="fas fa-shield-alt"></i> Encrypted & Secure Payment
        </p>
      </div>
      
      <button class="btn btn-outline btn-full" style="margin-top:16px;" onclick="navigateTo('play')">Cancel</button>
    </section>
  `;
}

// ── Booking Modal & Flow Bridge ──
async function openBooking(venueId) {
  const v = VENUES.find(x => x.id == venueId);
  if (!v) return;

  const sport = (v.sportType || v.sport || '').toUpperCase();
  const area = (v.address && v.address.street) ? v.address.street : (v.area || '');
  const city = (v.address && v.address.city) ? v.address.city : (v.city || 'Belfast');
  const locDisplay = area ? `${area}, ${city}` : city;
  const img = v.imageURL || v.img || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800';
  let rating = "4.8";
  if (v.ratings && v.ratings !== "N/A") {
    const match = v.ratings.match(/([\d\.]+)\/5/);
    if (match) rating = match[1];
  } else if (v.rating) {
    rating = v.rating;
  }

  const mapLinkHtml = v.mapLink ? ` <a href="${v.mapLink}" target="_blank" style="color:var(--primary); font-size:0.9rem;"><i class="fas fa-external-link-alt"></i></a>` : '';
  const availabilityHtml = v.availability && v.availability !== "N/A" ? `<p style="margin-top:4px; color:var(--text-muted); font-size:0.85rem;"><i class="far fa-clock"></i> ${v.availability}</p>` : '';

  $('#booking-modal').classList.add('open');
  const body = $('#booking-body');
  
  body.innerHTML = `
    <div class="booking-venue-header">
      <div class="booking-venue-img"><img src="${img}" alt="${v.name}"></div>
      <div class="booking-venue-info">
        <h2>${v.name}</h2>
        <p><i class="fas fa-map-marker-alt"></i> ${locDisplay}${mapLinkHtml}</p>
        <p style="margin-top:8px; color:var(--primary); font-weight:600;"><i class="fas fa-star"></i> ${rating}</p>
        ${availabilityHtml}
      </div>
    </div>
    <div class="form-group"><label>Select Date</label><input type="date" id="booking-date" value="${new Date().toISOString().split('T')[0]}"></div>
    <label style="font-size:0.9rem;font-weight:500;color:var(--text-muted);margin-bottom:8px;display:block">Available Slots</label>
    <div class="time-slots" id="slots-container"><div style="color:var(--text-muted)">Loading slots...</div></div>
    <div class="booking-summary">
      <h3>Booking Summary</h3>
      <div class="booking-row"><span>Venue</span><span>${v.name}</span></div>
      <div class="booking-row"><span>Sport</span><span>${sport}</span></div>
      <div class="booking-row" id="slot-row"><span>Time Slot</span><span>—</span></div>
      <div class="booking-row"><span>Duration</span><span>1 hour</span></div>
      <div class="booking-total"><span>Total</span><span id="booking-total-price">—</span></div>
    </div>
    <button class="btn btn-primary btn-full" style="margin-top:24px" id="confirm-booking" disabled>Confirm Booking</button>`;

  const q = query(collection(db, "slots"), where("venueId", "==", venueId));
  const snap = await getDocs(q);
  const slotsData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  slotsData.sort((a,b) => a.startTime.toMillis() - b.startTime.toMillis());

  const slotsContainer = body.querySelector('#slots-container');
  if (slotsData.length === 0) {
    slotsContainer.innerHTML = `<div style="color:var(--text-muted)">No slots available for this date.</div>`;
  } else {
    slotsContainer.innerHTML = slotsData.map(s => {
      const timeStr = s.startTime.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      return `<div class="time-slot ${s.isBooked ? 'booked' : ''}" data-slot-id="${s.id}" data-price="${s.price}" data-time="${timeStr}">${timeStr}</div>`;
    }).join('');
  }

  let selectedSlotId = null;
  let selectedSlotPrice = null;
  let selectedTimeStr = null;
  body.querySelectorAll('.time-slot:not(.booked)').forEach(el => {
    el.addEventListener('click', () => {
      body.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
      el.classList.add('selected');
      selectedSlotId = el.dataset.slotId;
      selectedSlotPrice = el.dataset.price;
      selectedTimeStr = el.dataset.time;
      body.querySelector('#slot-row').innerHTML = `<span>Time Slot</span><span style="color:#fff">${selectedTimeStr}</span>`;
      body.querySelector('#booking-total-price').textContent = `£${selectedSlotPrice}`;
      body.querySelector('#confirm-booking').disabled = false;
    });
  });

  body.querySelector('#confirm-booking').addEventListener('click', async () => {
    if (!currentUser) {
      toast('Please log in to book a venue!', 'error');
      $('#booking-modal').classList.remove('open');
      openAuth('login');
      return;
    }

    const btn = body.querySelector('#confirm-booking');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    const slotRef = doc(db, "slots", selectedSlotId);
    try {
      await runTransaction(db, async (transaction) => {
        const slotDoc = await transaction.get(slotRef);
        if (!slotDoc.exists()) throw new Error("Slot does not exist!");
        if (slotDoc.data().isBooked) throw new Error("Sorry, this slot was just booked by someone else.");
        transaction.update(slotRef, { isBooked: true, bookedBy: currentUser.uid });
        const bookingRef = doc(collection(db, "bookings"));
        transaction.set(bookingRef, {
          venueId: venueId,
          slotId: selectedSlotId,
          userId: currentUser.uid,
          createdAt: new Date(),
          status: 'confirmed',
          price: selectedSlotPrice
        });
      });
      toast(`Booking confirmed at ${v.name}! 🎉`);
      
      // Bridge: Booking -> Create Game Flow
      body.innerHTML = `
        <div style="text-align:center; padding: 40px 20px;">
          <div style="width:80px;height:80px;border-radius:50%;background:var(--primary-container);color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:2.5rem;margin:0 auto 24px;">
            <i class="fas fa-check"></i>
          </div>
          <h2 style="font-size:1.8rem; margin-bottom:12px;">Booking Confirmed!</h2>
          <p style="color:var(--text-muted); margin-bottom:32px;">You've secured the pitch at ${selectedTimeStr}. Want to open this up as a community game to find players?</p>
          <div style="display:flex; gap:16px; flex-direction:column;">
            <button class="btn btn-primary btn-full" id="bridge-create">Yes, Create a Game</button>
            <button class="btn btn-outline btn-full" id="bridge-close">No, just for me</button>
          </div>
        </div>
      `;
      body.querySelector('#bridge-create').addEventListener('click', () => {
        $('#booking-modal').classList.remove('open');
        showCreateGameModal(v, selectedTimeStr, sport);
      });
      body.querySelector('#bridge-close').addEventListener('click', () => {
        $('#booking-modal').classList.remove('open');
        refreshCurrentPage();
      });

    } catch (e) {
      toast('Booking failed: ' + e.message, 'error');
      btn.disabled = false;
      btn.innerHTML = 'Confirm Booking';
    }
  });
}

function showCreateGameModal(venueData = null, defaultTime = null, defaultSport = null) {
  if (!currentUser) {
    toast('Please log in to create a game!', 'error');
    openAuth('login');
    return;
  }
  
  $('#booking-modal').classList.add('open');
  const body = $('#booking-body');
  
  body.innerHTML = `
    <h2 style="margin-bottom:8px; font-size:1.8rem;">Create a Game</h2>
    <p style="color:var(--text-muted); margin-bottom:24px;">Host a public game and invite players to join.</p>
    
    <div class="form-group">
      <label>Game Title</label>
      <input type="text" id="cg-title" placeholder="e.g., Casual 5-a-side Football">
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
      <div class="form-group">
        <label>Sport</label>
        <select id="cg-sport">
          ${SPORTS.filter(s=>s.name!=='All').map(s=>`<option value="${s.name}" ${s.name==defaultSport?'selected':''}>${s.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Skill Level</label>
        <select id="cg-level">
          <option value="Beginner">Beginner</option>
          <option value="Intermediate" selected>Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="All Levels">All Levels</option>
        </select>
      </div>
    </div>
    
    <div class="form-group">
      <label>Venue Name</label>
      <input type="text" id="cg-venue" value="${venueData ? venueData.name : ''}" placeholder="e.g., Windsor Park">
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
      <div class="form-group">
        <label>Date</label>
        <input type="date" id="cg-date" value="${new Date().toISOString().split('T')[0]}">
      </div>
      <div class="form-group">
        <label>Time</label>
        <input type="time" id="cg-time" value="${defaultTime || '18:00'}">
      </div>
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
      <div class="form-group">
        <label>Total Spots</label>
        <input type="number" id="cg-spots" value="10" min="2" max="20">
      </div>
      <div class="form-group">
        <label>Fee per Player (£)</label>
        <input type="number" id="cg-fee" value="5" min="0" max="50">
      </div>
    </div>
    
    <button class="btn btn-primary btn-full" id="cg-submit" style="margin-top:16px;">Publish Game</button>
  `;
  
  body.querySelector('#cg-submit').addEventListener('click', async () => {
    const btn = body.querySelector('#cg-submit');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
    
    try {
      const totalSpots = parseInt($('#cg-spots').value) || 10;
      const fee = parseFloat($('#cg-fee').value) || 0;
      await addDoc(collection(db, "games"), {
        title: $('#cg-title').value || 'Community Match',
        sport: $('#cg-sport').value,
        level: $('#cg-level').value,
        venue: $('#cg-venue').value || 'Local Court',
        area: selectedCity,
        hostId: currentUser.uid,
        host: currentUser.displayName || currentUser.email.split('@')[0],
        players: [currentUser.uid],
        slotsLeft: Math.max(0, totalSpots - 1),
        totalSpots,
        fee,
        watchers: 0,
        createdAt: Date.now(),
        date: $('#cg-date').value,
        time: $('#cg-time').value,
        dateTime: `${$('#cg-date').value}T${$('#cg-time').value}:00`
      });
      $('#booking-modal').classList.remove('open');
      toast('Game published successfully! 🚀');
      if (currentPage !== 'play') {
        navigateTo('play');
      } else {
        refreshCurrentPage();
      }
    } catch(e) {
      toast('Failed to publish game: ' + e.message, 'error');
      btn.disabled = false;
      btn.innerHTML = 'Publish Game';
    }
  });
}

// ── Auth Modal ──
function openAuth(tab = 'login') {
  $('#auth-modal').classList.add('open');
  $$('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  $('#login-form').classList.toggle('hidden', tab !== 'login');
  $('#signup-form').classList.toggle('hidden', tab !== 'signup');
}

// ── Navigation ──
function navigateTo(page, params = null) {
  currentPage = page;
  currentParams = params;
  selectedSport = 'All';
  $$('.bnav-item').forEach(l => l.classList.toggle('active', l.dataset.page === page));
  refreshCurrentPage();
  const content = $('#app-content');
  if (content) content.scrollTop = 0;
  bindPageEvents();
}
window.navigateTo = navigateTo;
window.openAuth = openAuth;
window.toast = toast;

function bindPageEvents() {
  if (currentPage === 'home') {
    initDashboardComponents();
  }
  $$('.sport-chip').forEach(el => {
    el.addEventListener('click', () => {
      const clickedSport = el.dataset.sport;
      if (!clickedSport) return;
      selectedSport = clickedSport;
      if (currentPage === 'home') {
        currentPage = 'play';
        $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === 'play'));
        window.scrollTo({top:0,behavior:'smooth'});
      }
      refreshCurrentPage();
    });
  });
  $$('.venue-card').forEach(el => {
    el.addEventListener('click', () => openBooking(el.dataset.venueId));
  });
  $$('.venue-card-fav').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const i = el.querySelector('i');
      i.classList.toggle('far'); i.classList.toggle('fas');
      toast(i.classList.contains('fas') ? 'Added to favorites ❤️' : 'Removed from favorites');
    });
  });
  $$('.btn-watch').forEach(el => {
    el.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!currentUser) {
        toast('Please log in to watch a game!', 'error');
        openAuth('login');
        return;
      }
      const gameId = el.dataset.id;
      const i = el.querySelector('i');
      const isWatching = i.classList.contains('fas');
      const watchDocRef = doc(db, `games/${gameId}/watchers/${currentUser.uid}`);
      const gameDocRef = doc(db, `games/${gameId}`);

      try {
        if (!isWatching) {
          i.classList.replace('far', 'fas');
          toast('Added to Watchlist 👀');
          await setDoc(watchDocRef, { uid: currentUser.uid, timestamp: Date.now() });
          await updateDoc(gameDocRef, { watchers: increment(1) });
        } else {
          i.classList.replace('fas', 'far');
          toast('Removed from Watchlist');
          await deleteDoc(watchDocRef);
          await updateDoc(gameDocRef, { watchers: increment(-1) });
        }
      } catch (err) {
        toast('Error: ' + err.message, 'error');
        if (isWatching) i.classList.replace('far', 'fas');
        else i.classList.replace('fas', 'far');
      }
    });
  });
  $$('.btn-join').forEach(el => {
    el.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!currentUser) {
        toast('Please log in to join!', 'error');
        openAuth('login');
        return;
      }
      
      const gameId = el.dataset.id;
      const g = GAMES.find(x => x.id === gameId);
      if (!g) return;

      if(el.classList.contains('reserve')) {
        toast(`Added to reserves for "${g.title}". We'll notify you if a slot opens! 📱`);
        return;
      }

      if (g.players && g.players.includes(currentUser.uid)) {
        toast('You have already joined this match!', 'info');
        return;
      }

      // Check if match is free or paid
      const fee = parseFloat(g.fee);
      if (isNaN(fee) || fee <= 0) {
        // Free match: Join instantly
        try {
          const gameRef = doc(db, "games", gameId);
          await updateDoc(gameRef, {
            players: arrayUnion(currentUser.uid),
            slotsLeft: increment(-1)
          });
          toast(`Joined "${g.title}" instantly! See you there! ⚽`, 'success');
        } catch (err) {
          console.error("Error joining game:", err);
          toast('Failed to join match. Please try again.', 'error');
        }
      } else {
        // Paid match: Redirect to payment page
        navigateTo('payment', { gameId: gameId });
      }
    });
  });

  const payBtn = $('#confirm-payment-btn');
  if (payBtn) {
    payBtn.addEventListener('click', async () => {
      const gameId = currentParams?.gameId;
      const g = GAMES.find(x => x.id === gameId);
      if (!g) return;

      payBtn.disabled = true;
      payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

      // Simulate payment delay
      setTimeout(async () => {
        try {
          const gameRef = doc(db, "games", gameId);
          await updateDoc(gameRef, {
            players: arrayUnion(currentUser.uid),
            slotsLeft: increment(-1)
          });
          toast(`Payment Successful! You've joined "${g.title}". 🚀`, 'success');
          navigateTo('history');
        } catch (err) {
          console.error("Error finalizing payment join:", err);
          toast('Payment succeeded but joining failed. Please contact support.', 'error');
          payBtn.disabled = false;
          payBtn.innerHTML = `Pay £${g.fee} & Join Match`;
        }
      }, 1500);
    });
  }

  $$('.btn-leave').forEach(el => {
    el.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!currentUser) { toast('Please log in first.', 'error'); return; }
      const gameId = el.dataset.id;
      const g = GAMES.find(x => x.id === gameId);
      if (!g) return;

      el.disabled = true;
      el.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Leaving...';
      try {
        const gameRef = doc(db, 'games', gameId);
        await updateDoc(gameRef, {
          players: arrayRemove(currentUser.uid),
          slotsLeft: increment(1)
        });
        toast(`Left "${g.title}" successfully.`);
      } catch (err) {
        console.error('Error leaving game:', err);
        toast('Could not leave match — ' + err.message, 'error');
        el.disabled = false;
        el.innerHTML = '<i class="fas fa-sign-out-alt"></i> Leave Match';
      }
    });
  });

  $$('.btn-cancel-match').forEach(el => {
    el.addEventListener('click', async (e) => {
      e.stopPropagation();
      const gameId = el.dataset.id;
      const g = GAMES.find(x => x.id === gameId);
      if (!g) return;

      if (confirm(`CRITICAL: Are you sure you want to CANCEL and DELETE "${g.title}"? This cannot be undone.`)) {
        try {
          await deleteDoc(doc(db, "games", gameId));
          toast(`Match "${g.title}" has been cancelled.`, 'info');
        } catch (err) {
          console.error("Error cancelling game:", err);
          toast('Failed to cancel match.', 'error');
        }
      }
    });
  });
  $$('.filter-chip').forEach(el => {
    el.addEventListener('click', () => {
      // Time filter logic for matches page
      if (el.dataset.timeFilter && currentPage === 'play') {
        el.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        el.classList.add('active');
        const filter = el.dataset.timeFilter;
        $$('#games-grid .game-card').forEach(card => {
          if (filter === 'all') { card.style.display = ''; return; }
          const dateText = card.querySelector('.game-meta-item')?.nextElementSibling?.textContent || card.textContent;
          const isToday = dateText.toLowerCase().includes('today');
          if (filter === 'today') card.style.display = isToday ? '' : 'none';
          if (filter === 'week') card.style.display = '';
        });
      }
      
      // Venue filter logic for book venues page
      if (el.dataset.venueFilter && currentPage === 'book') {
        selectedVenueFilter = el.dataset.venueFilter;
        refreshCurrentPage();
      }
    });
  });
  const createBtn = $('#create-game-btn');
  if (createBtn) createBtn.addEventListener('click', () => showCreateGameModal());
  const emptyCreateBtn = $('#empty-create-btn');
  if (emptyCreateBtn) emptyCreateBtn.addEventListener('click', () => showCreateGameModal());
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('home');

  // Bottom nav
  $$('.bnav-item').forEach(l => {
    l.addEventListener('click', () => navigateTo(l.dataset.page));
  });

  // FAB
  $('#header-create-btn')?.addEventListener('click', () => showCreateGameModal());

  // Auth buttons
  $('#btn-login').addEventListener('click', () => openAuth('login'));
  $('#btn-signup').addEventListener('click', () => openAuth('signup'));

  // Auth tabs
  $$('.auth-tab').forEach(t => {
    t.addEventListener('click', () => openAuth(t.dataset.tab));
  });

  // Modal close
  $('#modal-close').addEventListener('click', () => $('#auth-modal').classList.remove('open'));
  $('#booking-close').addEventListener('click', () => $('#booking-modal').classList.remove('open'));
  $$('.modal-overlay').forEach(m => {
    m.addEventListener('click', (e) => { if(e.target===m) m.classList.remove('open'); });
  });

  // Forms
  $('#login-form').addEventListener('submit', async (e) => { 
    e.preventDefault(); 
    const email = $('#login-email').value;
    const password = $('#login-password').value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      $('#auth-modal').classList.remove('open'); 
      toast('Welcome back! 👋'); 
    } catch (error) {
      toast('Login failed: ' + error.message, 'error');
    }
  });

  $('#signup-form').addEventListener('submit', async (e) => { 
    e.preventDefault(); 
    const name = $('#signup-name').value;
    const email = $('#signup-email').value;
    const password = $('#signup-password').value;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      $('#auth-modal').classList.remove('open'); 
      toast('Account created! Welcome to GameNI 🎉'); 
    } catch (error) {
      toast('Signup failed: ' + error.message, 'error');
    }
  });

  $('#google-login').addEventListener('click', async () => {
    try {
      await signInWithPopup(auth, provider);
      $('#auth-modal').classList.remove('open');
      toast('Logged in with Google!');
    } catch (error) {
      toast('Google login failed: ' + error.message, 'error');
    }
  });

  $('#btn-logout').addEventListener('click', async () => {
    try {
      await signOut(auth);
      toast('Logged out successfully.');
    } catch (error) {
      toast('Logout error: ' + error.message, 'error');
    }
  });

  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (user) {
      $('#unauth-controls').classList.add('hidden');
      $('#auth-controls').classList.remove('hidden');
      $('#user-display-name').textContent = user.displayName || user.email;
      const initials = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
      if ($('#user-avatar-initials')) $('#user-avatar-initials').textContent = initials;
    } else {
      $('#unauth-controls').classList.remove('hidden');
      $('#auth-controls').classList.add('hidden');
      $('#user-display-name').textContent = '';
      if ($('#user-avatar-initials')) $('#user-avatar-initials').textContent = 'U';
    }
  });

  // City selector
  $('#city-select').addEventListener('change', (e) => {
    selectedCity = e.target.value;
    refreshCurrentPage();
  });

  // Logo
  $('#nav-logo')?.addEventListener('click', () => navigateTo('home'));
});

window.navigateToSport = function(sport) {
  selectedSport = sport || 'All';
  navigateTo('play');
};

function initDashboardComponents() {
  $('#bento-cta-host')?.addEventListener('click', () => showCreateGameModal());
}

