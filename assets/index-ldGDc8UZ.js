import{initializeApp as e}from"https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";import{addDoc as t,arrayRemove as n,arrayUnion as r,collection as i,deleteDoc as a,doc as o,getDocs as s,getFirestore as c,increment as l,onSnapshot as u,query as d,runTransaction as ee,setDoc as f,updateDoc as p,where as m}from"https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";import{GoogleAuthProvider as h,createUserWithEmailAndPassword as g,getAuth as _,onAuthStateChanged as v,signInWithEmailAndPassword as y,signInWithPopup as b,signOut as x,updateProfile as S}from"https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var C=e({projectId:`gameni-belfast`,appId:`1:936361814428:web:39f72a60658a1da7f44059`,storageBucket:`gameni-belfast.firebasestorage.app`,apiKey:`AIzaSyBw134ZpZI7oCXfgTSBHAomPGGtu9bR_co`,authDomain:`gameni-belfast.firebaseapp.com`,messagingSenderId:`936361814428`}),w=c(C),T=_(C),E=new h,D=[],O=[];u(i(w,`venues`),e=>{D=e.docs.map(e=>({id:e.id,...e.data()})),(j===`home`||j===`book`)&&k()}),u(i(w,`games`),e=>{O=e.docs.map(e=>({id:e.id,...e.data()})),(j===`home`||j===`play`||j===`history`)&&k()});function k(){let e=z(`#app-content`);switch(j){case`home`:e.innerHTML=q();break;case`book`:e.innerHTML=J();break;case`play`:e.innerHTML=te();break;case`history`:e.innerHTML=ne();break;case`payment`:e.innerHTML=re(I?.gameId);break;default:e.innerHTML=q();break}$()}var A=[{name:`All`,icon:`fas fa-th-large`},{name:`Football`,icon:`fas fa-futbol`},{name:`Cricket`,icon:`fas fa-bat-ball`},{name:`Badminton`,icon:`fas fa-shuttlecock`},{name:`Swimming`,icon:`fas fa-swimmer`},{name:`Padel`,icon:`fas fa-table-tennis-paddle-ball`},{name:`Pickleball`,icon:`fas fa-table-tennis-paddle-ball`}],j=`home`,M=`All`,N=`Popular`,P=`Belfast`,F=null,I=null,L=[],R=``,z=e=>document.querySelector(e),B=e=>document.querySelectorAll(e),V=(e,t=`success`)=>{let n=z(`#toast-container`),r=document.createElement(`div`);r.className=`toast ${t}`,r.innerHTML=`<i class="fas fa-${t===`success`?`check-circle`:`exclamation-circle`}"></i>${e}`,n.appendChild(r),setTimeout(()=>r.remove(),4e3)};function H(e){return A.map(t=>`
    <div class="sport-chip ${t.name===e?`active`:``}" data-sport="${t.name}">
      <span class="sport-icon"><i class="${t.icon}"></i></span>
      <span>${t.name}</span>
    </div>
  `).join(``)+`
    <div class="sport-chip disabled-chip" style="opacity: 0.6; cursor: default; border: 1px dashed rgba(255,255,255,0.2); background: transparent;">
      <span class="sport-icon"><i class="fas fa-hourglass-half"></i></span>
      <span>More coming soon</span>
    </div>`}function U(e){let t=(e.sportType||e.sport||``).toUpperCase(),n=e.address&&e.address.street?e.address.street:e.area||``,r=e.address&&e.address.city?e.address.city:e.city||`Belfast`,i=n?`${n}, ${r}`:r,a=e.imageURL||e.img||`https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800`,o=e.amenities||e.tags||[],s=`4.8`;if(e.ratings&&e.ratings!==`N/A`){let t=e.ratings.match(/([\d\.]+)\/5/);t&&(s=t[1])}else e.rating&&(s=e.rating);e.reviews;let c=e.price||``,l;return l=c?/^[\d\.]+$/.test(c.trim())?`£${c}<span>/hr</span>`:`<span style="font-size:0.72rem;font-weight:600;line-height:1.2">${c}</span>`:`<span>Contact for pricing</span>`,`<div class="venue-card" data-id="${e.id}">
    <div class="venue-card-img"><img src="${a}" alt="${e.name}" loading="lazy"><span class="venue-card-badge">${t}</span><button class="venue-card-fav" aria-label="Favorite"><i class="far fa-heart"></i></button></div>
    <div class="venue-card-body"><h3>${e.name}</h3><div class="venue-card-loc"><i class="fas fa-map-marker-alt"></i>${i}</div><div class="venue-card-tags">${o.map(e=>`<span class="venue-tag">${e}</span>`).join(``)}</div></div>
    <div class="venue-card-footer">
      <div class="venue-price">${l}</div>
      <div class="venue-rating"><i class="fas fa-star"></i> ${s}</div>
      <button class="btn btn-primary" style="padding:6px 16px;font-size:0.8rem;border-radius:20px;margin-left:auto">Book</button>
    </div>
  </div>`}function W(e){if(!e||e===`Today`)return`Today`;let t=new Date(e);if(isNaN(t))return e;let n=new Date;return t.toDateString()===n.toDateString()?`Today`:t.toLocaleDateString(`en-GB`,{day:`numeric`,month:`short`})}function G(e){let t=e.date===`Today`&&e.time.includes(`6:00 PM`),n=e.slotsLeft===0,r=F&&e.players&&e.players.includes(F.uid),i=F&&e.hostId===F.uid,a=e.watchers||0;return`<div class="game-card" data-game-id="${e.id}">
    <div class="game-card-header">
      <span class="game-sport-badge">${e.sport}</span>
      <span class="game-slots ${t?`live-pulse`:``}" style="${n?`color:var(--text-muted)`:``}">
        ${n?`Waitlist Open`:e.slotsLeft+` slots left`}
      </span>
    </div>
    <h3>${e.title}</h3>
    <div class="game-meta">
      <div class="game-meta-item"><i class="fas fa-map-marker-alt"></i>${e.venue}, ${e.area}</div>
      <div class="game-meta-item"><i class="fas fa-calendar"></i>${W(e.date)} · ${e.time}</div>
      <div class="game-meta-item"><i class="fas fa-signal"></i>${e.level}</div>
      <div class="game-meta-item"><i class="fas fa-eye"></i>${a} players watching</div>
    </div>
    <div class="game-card-footer">
      <div class="game-host-row">
        <div class="game-host"><div class="game-host-avatar">${(e.host||`Unknown`).split(` `).map(e=>e[0]).join(``)}</div><span class="game-host-name">Hosted by ${e.host||`Unknown`}</span></div>
        <span class="venue-price" style="font-size:1rem;">${e.fee===void 0?`Free`:`£`+e.fee}</span>
      </div>
      <div class="game-actions">
        <button class="btn btn-outline btn-watch" style="flex:1" data-id="${e.id}"><i class="far fa-star"></i> Watch</button>
        ${r?`
          <button class="btn btn-leave-match ${i?`btn-cancel-match`:`btn-leave`}"
                  style="flex:2;"
                  data-id="${e.id}">
            <i class="fas fa-sign-out-alt"></i> ${i?`Cancel Match`:`Leave Match`}
          </button>
        `:`
          <button class="btn ${n?`btn-outline reserve`:`btn-primary`} btn-join" 
                  style="flex:2;" 
                  data-id="${e.id}">
            ${n?`Join as Reserve`:`Join Game`}
          </button>
        `}
      </div>
    </div></div>`}var K={All:{icon:`fas fa-th-large`,bg:`#455A64`,dark:`#263238`},Football:{icon:`fas fa-futbol`,bg:`#1B5E20`,dark:`#0A3D12`},Cricket:{icon:`fas fa-bat-ball`,bg:`#37474F`,dark:`#263238`},Badminton:{icon:`fas fa-shuttlecock`,bg:`#01579B`,dark:`#003F7A`},Swimming:{icon:`fas fa-swimmer`,bg:`#006064`,dark:`#004D40`},Padel:{icon:`fas fa-table-tennis-paddle-ball`,bg:`#4A148C`,dark:`#320D62`},Pickleball:{icon:`fas fa-table-tennis-paddle-ball`,bg:`#880E4F`,dark:`#620839`}};function q(){let e={};return O.forEach(t=>{t.sport&&(e[t.sport]=(e[t.sport]||0)+1)}),O.filter(e=>e.slotsLeft>0).slice(0,6),D.slice(0,6),`
    <div class="playo-home">

      <!-- Hero search banner -->
      <div class="home-search-hero">
        <div class="home-search-inner">
          <h1 class="home-hero-title">Book, Play, Repeat.</h1>
          <p class="home-hero-sub">Sports venues and community games across Belfast.</p>
          <div class="home-search-bar">
            <i class="fas fa-search"></i>
            <input class="playo-search-input" id="home-search" placeholder="Search venues, sports, or games…" autocomplete="off" onkeyup="if(event.key==='Enter') handleHomeSearch()">
            <button class="home-search-find-btn" onclick="handleHomeSearch()">Find</button>
          </div>
        </div>
      </div>

      <div class="homepage-full-width">

        <!-- Sport tiles -->
        <div class="playo-section">
          <div class="playo-section-header">
            <h2>Browse by Sport</h2>
            <button class="playo-see-all" onclick="navigateTo('play')">See all <i class="fas fa-chevron-right" style="font-size:0.65rem"></i></button>
          </div>
          <div class="playo-sport-grid">
            ${Object.entries(K).map(([t,n])=>{let r=e[t]||0;return`<div class="playo-sport-tile"
                   onclick="navigateToSport('${t}')">
                ${r>0?`<span class="playo-sport-badge">${r}</span>`:``}
                <span class="playo-sport-icon-wrapper"><i class="${n.icon}"></i></span>
                <span class="playo-sport-name">${t}</span>
              </div>`}).join(``)}
          </div>
        </div>

      </div>
    </div>
  `}function J(){let e=[...D];if(M!==`All`&&(e=e.filter(e=>e.sportType&&e.sportType.toLowerCase()===M.toLowerCase()||e.sport&&e.sport.toLowerCase()===M.toLowerCase())),R){let t=R.toLowerCase();e=e.filter(e=>{let n=e.name&&e.name.toLowerCase().includes(t),r=e.sport&&e.sport.toLowerCase().includes(t),i=!1;return typeof e.address==`string`?i=e.address.toLowerCase().includes(t):e.address&&typeof e.address==`object`&&(i=Object.values(e.address).some(e=>e&&e.toString().toLowerCase().includes(t))),n||r||i})}N===`Price: Low`?e.sort((e,t)=>{let n=e=>{if(!e.price)return 1/0;if(!isNaN(e.price))return parseFloat(e.price);let t=e.price.match(/£([\d\.]+)/);return t?parseFloat(t[1]):1/0};return n(e)-n(t)}):N===`Top Rated`&&e.sort((e,t)=>{let n=e=>{if(e.ratings&&e.ratings!==`N/A`){let t=e.ratings.match(/([\d\.]+)\/5/);if(t)return parseFloat(t[1])}return e.rating?parseFloat(e.rating):0};return n(t)-n(e)});let t=R?`
    <div class="active-search-header" style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.03); padding:12px 20px; border-radius:12px; margin-bottom:20px;">
      <span style="font-size:0.95rem; color:var(--text-muted)">Showing results for "<strong style="color:var(--text-main)">${R}</strong>"</span>
      <button onclick="window.clearSearch()" style="background:none; border:none; color:var(--primary); font-weight:600; cursor:pointer; font-size:0.85rem;">Clear Search</button>
    </div>`:``;return`
    <div class="page-container">
      <button class="back-btn" onclick="goBack()"><i class="fas fa-arrow-left"></i> Back</button>
      <section class="section">
        <div class="section-header" style="display:flex; justify-content:space-between; align-items:flex-start; gap:20px; margin-bottom:30px;">
          <div class="section-header-text">
            <h2>Book Venues</h2>
            <p>Find and book the best sports facilities around you.</p>
          </div>
          <div class="compact-search-bar" style="position:relative; width:280px;">
            <i class="fas fa-search" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-muted); font-size:0.9rem;"></i>
            <input type="text" id="inner-search" placeholder="Search venues..." value="${R}" 
              onkeyup="if(event.key==='Enter') window.handleInnerSearch(this.value)"
              style="width:100%; padding:10px 15px 10px 40px; border-radius:12px; border:1px solid #ddd; font-family:inherit; outline:none; font-size:0.9rem;">
          </div>
        </div>
        ${t}
        <div class="sports-scroll">${H(M)}</div>
        <div class="filter-bar">
          <span class="filter-chip ${N===`Popular`?`active`:``}" data-venue-filter="Popular">Popular</span>
          <span class="filter-chip ${N===`Price: Low`?`active`:``}" data-venue-filter="Price: Low">Price: Low</span>
          <span class="filter-chip ${N===`Top Rated`?`active`:``}" data-venue-filter="Top Rated">Top Rated</span>
        </div>
        <div class="cards-grid" id="venues-grid">${e.length?e.map(U).join(``):`<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:60px 0;font-size:1.1rem;">No venues found. Try a different search.</p>`}</div>
      </section>
    </div>`}function te(){let e=O;if(M!==`All`&&(e=e.filter(e=>e.sport&&e.sport.toLowerCase()===M.toLowerCase())),R){let t=R.toLowerCase();e=e.filter(e=>{let n=e.title&&e.title.toLowerCase().includes(t),r=e.sport&&e.sport.toLowerCase().includes(t),i=e.venue&&e.venue.toLowerCase().includes(t),a=e.host&&e.host.toLowerCase().includes(t);return n||r||i||a})}let t=R?`
    <div class="active-search-header" style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.03); padding:12px 20px; border-radius:12px; margin-bottom:20px;">
      <span style="font-size:0.95rem; color:var(--text-muted)">Showing results for "<strong style="color:var(--text-main)">${R}</strong>"</span>
      <button onclick="window.clearSearch()" style="background:none; border:none; color:var(--primary); font-weight:600; cursor:pointer; font-size:0.85rem;">Clear Search</button>
    </div>`:``;return`
    <div class="page-container">
      <button class="back-btn" onclick="goBack()"><i class="fas fa-arrow-left"></i> Back</button>
      <section class="section">
        <div class="section-header" style="display:flex; justify-content:space-between; align-items:flex-start; gap:20px; margin-bottom:30px;">
          <div class="section-header-text">
            <h2>Join Games</h2>
            <p>Find community matches and connect with fellow players.</p>
          </div>
          <div class="compact-search-bar" style="position:relative; width:280px;">
            <i class="fas fa-search" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-muted); font-size:0.9rem;"></i>
            <input type="text" id="inner-search" placeholder="Search games..." value="${R}" 
              onkeyup="if(event.key==='Enter') window.handleInnerSearch(this.value)"
              style="width:100%; padding:10px 15px 10px 40px; border-radius:12px; border:1px solid #ddd; font-family:inherit; outline:none; font-size:0.9rem;">
          </div>
        </div>
        ${t}
        <div class="sports-scroll">${H(M)}</div>
        <div class="filter-bar">
          <span class="filter-chip active" data-time-filter="all">All Games</span>
          <span class="filter-chip" data-time-filter="today">Today</span>
          <span class="filter-chip" data-time-filter="week">This Week</span>
        </div>
        <div class="cards-grid" id="games-grid">${e.length?e.map(G).join(``):`
    <div style="grid-column:1/-1; text-align:center; padding: 60px 20px;">
      <div style="width:80px;height:80px;border-radius:50%;background:var(--primary-container);color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:2.5rem;margin:0 auto 24px; opacity:0.8">
        <i class="fas fa-futbol"></i>
      </div>
      <h3 style="font-size:1.4rem;margin-bottom:8px;color:var(--text)">No games found</h3>
      <p style="color:var(--text-muted);margin-bottom:24px;max-width:360px;margin-left:auto;margin-right:auto;">Try a different search or be the first to host a community game.</p>
      <button class="btn btn-primary" id="empty-create-btn"><i class="fas fa-plus"></i> Host a Game</button>
    </div>`}</div>
      </section>
    </div>`}function ne(){if(!F)return`
      <div class="page-container">
        <button class="back-btn" onclick="goBack()"><i class="fas fa-arrow-left"></i> Back</button>
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
        </section>
      </div>`;let e=O.filter(e=>e.hostId===F.uid||e.players&&e.players.includes(F.uid)),t=new Date,n=e=>{if(e.dateTime){let t=new Date(e.dateTime);if(!isNaN(t))return t}if(e.date&&e.date!==`Today`&&e.time){let t=new Date(`${e.date}T${e.time}:00`);if(!isNaN(t))return t}return new Date},r=e.filter(e=>n(e)>=t).sort((e,t)=>n(e)-n(t)),i=e.filter(e=>n(e)<t).sort((e,t)=>n(t)-n(e));return`
    <div class="page-container">
      <button class="back-btn" onclick="goBack()"><i class="fas fa-arrow-left"></i> Back</button>
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
              ${r.length?r.map(G).join(``):`
                <div style="grid-column:1/-1; padding: 30px; background: var(--bg-surface); border-radius:12px; text-align:center; color:var(--text-muted); border:1px dashed var(--border)">
                  No upcoming matches. <a href="#" onclick="navigateTo('play')" style="color:var(--primary)">Find one?</a>
                </div>
              `}
            </div>
          </div>

          <div class="history-group" style="margin-top: 40px;">
            <h3 style="margin: 24px 0 16px; display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-history" style="color:var(--text-muted)"></i> Past Matches
            </h3>
            <div class="cards-grid">
              ${i.length?i.map(G).join(``):`
                <div style="grid-column:1/-1; padding: 30px; background: var(--bg-surface); border-radius:12px; text-align:center; color:var(--text-muted); border:1px dashed var(--border)">
                  No past matches found.
                </div>
              `}
            </div>
          </div>
        </div>
      </section>
    </div>
  `}function re(e){let t=O.find(t=>t.id===e);return t?`
    <section class="section" style="max-width: 500px; margin: 0 auto;">
      <div class="section-header" style="text-align:center; display:block;">
        <h2 style="font-size:2rem; margin-bottom:8px;">Secure Payment</h2>
        <p style="color:var(--text-muted)">Finalize your booking for ${t.title}</p>
      </div>

      <div class="payment-card" style="background:var(--bg-surface); padding:32px; border-radius:24px; border:1px solid var(--border); box-shadow:var(--shadow-lg);">
        <div class="booking-summary" style="margin-bottom:24px;">
          <div class="booking-row" style="display:flex; justify-content:space-between; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid var(--border);">
            <span style="color:var(--text-muted)">Match</span>
            <span style="font-weight:600;">${t.title}</span>
          </div>
          <div class="booking-row" style="display:flex; justify-content:space-between; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid var(--border);">
            <span style="color:var(--text-muted)">Venue</span>
            <span style="font-weight:600;">${t.venue}</span>
          </div>
          <div class="booking-row" style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:1.2rem;">
            <span style="font-weight:700;">Total Amount</span>
            <span style="font-weight:700; color:var(--primary);">£${t.fee}</span>
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
          Pay £${t.fee} & Join Match
        </button>
        
        <p style="text-align:center; margin-top:16px; font-size:0.8rem; color:var(--text-muted);">
          <i class="fas fa-shield-alt"></i> Encrypted & Secure Payment
        </p>
      </div>
      
      <button class="btn btn-outline btn-full" style="margin-top:16px;" onclick="navigateTo('play')">Cancel</button>
    </section>
  `:`<div class="section"><h2>Error</h2><p>Match not found.</p></div>`}async function ie(e){let t=D.find(t=>t.id==e);if(!t)return;let n=(t.sportType||t.sport||``).toUpperCase(),r=t.address&&t.address.street?t.address.street:t.area||``,a=t.address&&t.address.city?t.address.city:t.city||`Belfast`,c=r?`${r}, ${a}`:a,l=t.imageURL||t.img||`https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800`,u=`4.8`;if(t.ratings&&t.ratings!==`N/A`){let e=t.ratings.match(/([\d\.]+)\/5/);e&&(u=e[1])}else t.rating&&(u=t.rating);let f=t.mapLink?` <a href="${t.mapLink}" target="_blank" style="color:var(--primary); font-size:0.9rem;"><i class="fas fa-external-link-alt"></i></a>`:``,p=t.availability&&t.availability!==`N/A`?`<p style="margin-top:4px; color:var(--text-muted); font-size:0.85rem;"><i class="far fa-clock"></i> ${t.availability}</p>`:``;z(`#booking-modal`).classList.add(`open`);let h=z(`#booking-body`);h.innerHTML=`
    <div class="booking-venue-header">
      <div class="booking-venue-img"><img src="${l}" alt="${t.name}"></div>
      <div class="booking-venue-info">
        <h2>${t.name}</h2>
        <p><i class="fas fa-map-marker-alt"></i> ${c}${f}</p>
        <p style="margin-top:8px; color:var(--primary); font-weight:600;"><i class="fas fa-star"></i> ${u}</p>
        ${p}
      </div>
    </div>
    <div class="form-group"><label>Select Date</label><input type="date" id="booking-date" value="${new Date().toISOString().split(`T`)[0]}"></div>
    <label style="font-size:0.9rem;font-weight:500;color:var(--text-muted);margin-bottom:8px;display:block">Available Slots</label>
    <div class="time-slots" id="slots-container"><div style="color:var(--text-muted)">Loading slots...</div></div>
    <div class="booking-summary">
      <h3>Booking Summary</h3>
      <div class="booking-row"><span>Venue</span><span>${t.name}</span></div>
      <div class="booking-row"><span>Sport</span><span>${n}</span></div>
      <div class="booking-row" id="slot-row"><span>Time Slot</span><span>—</span></div>
      <div class="booking-row"><span>Duration</span><span>1 hour</span></div>
      <div class="booking-total"><span>Total</span><span id="booking-total-price">—</span></div>
    </div>
    <button class="btn btn-primary btn-full" style="margin-top:24px" id="confirm-booking" disabled>Confirm Booking</button>`;let g=(await s(d(i(w,`slots`),m(`venueId`,`==`,e)))).docs.map(e=>({id:e.id,...e.data()}));g.sort((e,t)=>e.startTime.toMillis()-t.startTime.toMillis());let _=h.querySelector(`#slots-container`);g.length===0?_.innerHTML=`<div style="color:var(--text-muted)">No slots available for this date.</div>`:_.innerHTML=g.map(e=>{let t=e.startTime.toDate().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`});return`<div class="time-slot ${e.isBooked?`booked`:``}" data-slot-id="${e.id}" data-price="${e.price}" data-time="${t}">${t}</div>`}).join(``);let v=null,y=null,b=null;h.querySelectorAll(`.time-slot:not(.booked)`).forEach(e=>{e.addEventListener(`click`,()=>{h.querySelectorAll(`.time-slot`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`),v=e.dataset.slotId,y=e.dataset.price,b=e.dataset.time,h.querySelector(`#slot-row`).innerHTML=`<span>Time Slot</span><span style="color:#fff">${b}</span>`,h.querySelector(`#booking-total-price`).textContent=`£${y}`,h.querySelector(`#confirm-booking`).disabled=!1})}),h.querySelector(`#confirm-booking`).addEventListener(`click`,async()=>{if(!F){V(`Please log in to book a venue!`,`error`),z(`#booking-modal`).classList.remove(`open`),X(`login`);return}let r=h.querySelector(`#confirm-booking`);r.disabled=!0,r.innerHTML=`<i class="fas fa-spinner fa-spin"></i> Processing...`;let a=o(w,`slots`,v);try{await ee(w,async t=>{let n=await t.get(a);if(!n.exists())throw Error(`Slot does not exist!`);if(n.data().isBooked)throw Error(`Sorry, this slot was just booked by someone else.`);t.update(a,{isBooked:!0,bookedBy:F.uid});let r=o(i(w,`bookings`));t.set(r,{venueId:e,slotId:v,userId:F.uid,createdAt:new Date,status:`confirmed`,price:y})}),V(`Booking confirmed at ${t.name}! 🎉`),h.innerHTML=`
        <div style="text-align:center; padding: 40px 20px;">
          <div style="width:80px;height:80px;border-radius:50%;background:var(--primary-container);color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:2.5rem;margin:0 auto 24px;">
            <i class="fas fa-check"></i>
          </div>
          <h2 style="font-size:1.8rem; margin-bottom:12px;">Booking Confirmed!</h2>
          <p style="color:var(--text-muted); margin-bottom:32px;">You've secured the pitch at ${b}. Want to open this up as a community game to find players?</p>
          <div style="display:flex; gap:16px; flex-direction:column;">
            <button class="btn btn-primary btn-full" id="bridge-create">Yes, Create a Game</button>
            <button class="btn btn-outline btn-full" id="bridge-close">No, just for me</button>
          </div>
        </div>
      `,h.querySelector(`#bridge-create`).addEventListener(`click`,()=>{z(`#booking-modal`).classList.remove(`open`),Y(t,b,n)}),h.querySelector(`#bridge-close`).addEventListener(`click`,()=>{z(`#booking-modal`).classList.remove(`open`),k()})}catch(e){V(`Booking failed: `+e.message,`error`),r.disabled=!1,r.innerHTML=`Confirm Booking`}})}function Y(e=null,n=null,r=null){if(!F){V(`Please log in to create a game!`,`error`),X(`login`);return}z(`#booking-modal`).classList.add(`open`);let a=z(`#booking-body`);a.innerHTML=`
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
          ${A.filter(e=>e.name!==`All`).map(e=>`<option value="${e.name}" ${e.name==r?`selected`:``}>${e.name}</option>`).join(``)}
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
      <input type="text" id="cg-venue" value="${e?e.name:``}" placeholder="e.g., Windsor Park">
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
      <div class="form-group">
        <label>Date</label>
        <input type="date" id="cg-date" value="${new Date().toISOString().split(`T`)[0]}">
      </div>
      <div class="form-group">
        <label>Time</label>
        <input type="time" id="cg-time" value="${n||`18:00`}">
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
  `,a.querySelector(`#cg-submit`).addEventListener(`click`,async()=>{let e=a.querySelector(`#cg-submit`);e.disabled=!0,e.innerHTML=`<i class="fas fa-spinner fa-spin"></i> Publishing...`;try{let e=parseInt(z(`#cg-spots`).value)||10,n=parseFloat(z(`#cg-fee`).value)||0;await t(i(w,`games`),{title:z(`#cg-title`).value||`Community Match`,sport:z(`#cg-sport`).value,level:z(`#cg-level`).value,venue:z(`#cg-venue`).value||`Local Court`,area:P,hostId:F.uid,host:F.displayName||F.email.split(`@`)[0],players:[F.uid],slotsLeft:Math.max(0,e-1),totalSpots:e,fee:n,watchers:0,createdAt:Date.now(),date:z(`#cg-date`).value,time:z(`#cg-time`).value,dateTime:`${z(`#cg-date`).value}T${z(`#cg-time`).value}:00`}),z(`#booking-modal`).classList.remove(`open`),V(`Game published successfully! 🚀`),j===`play`?k():Z(`play`)}catch(t){V(`Failed to publish game: `+t.message,`error`),e.disabled=!1,e.innerHTML=`Publish Game`}})}function X(e=`login`){z(`#auth-modal`).classList.add(`open`),B(`.auth-tab`).forEach(t=>t.classList.toggle(`active`,t.dataset.tab===e)),z(`#login-form`).classList.toggle(`hidden`,e!==`login`),z(`#signup-form`).classList.toggle(`hidden`,e!==`signup`)}function Z(e,t=null){j&&j!==e&&L.push({page:j,params:I}),j=e,I=t,B(`.nav-top-link`).forEach(t=>t.classList.toggle(`active`,t.dataset.page===e)),k();let n=z(`#app-content`);n&&(n.scrollTop=0),$()}function Q(){if(L.length>0){let e=L.pop();j=e.page,I=e.params,M=`All`,B(`.nav-top-link`).forEach(e=>e.classList.toggle(`active`,e.dataset.page===j)),k();let t=z(`#app-content`);t&&(t.scrollTop=0),$()}else Z(`home`)}window.navigateTo=Z,window.navigateBack=Q,window.goBack=Q,window.refreshCurrentPage=k,window.openAuth=X,window.toast=V,window.showCreateGameModal=Y;function $(){j===`home`&&ae(),B(`.sport-chip`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.sport;if(t){if(M=t,j===`home`){j=`play`,B(`.nav-top-link`).forEach(e=>e.classList.toggle(`active`,e.dataset.page===`play`));let e=z(`#app-content`);e&&(e.scrollTop=0)}k()}})}),B(`.venue-card`).forEach(e=>{e.addEventListener(`click`,()=>ie(e.dataset.venueId))}),B(`.venue-card-fav`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.querySelector(`i`);n.classList.toggle(`far`),n.classList.toggle(`fas`),V(n.classList.contains(`fas`)?`Added to favorites ❤️`:`Removed from favorites`)})}),B(`.btn-watch`).forEach(e=>{e.addEventListener(`click`,async t=>{if(t.stopPropagation(),!F){V(`Please log in to watch a game!`,`error`),X(`login`);return}let n=e.dataset.id,r=e.querySelector(`i`),i=r.classList.contains(`fas`),s=o(w,`games/${n}/watchers/${F.uid}`),c=o(w,`games/${n}`);try{i?(r.classList.replace(`fas`,`far`),V(`Removed from Watchlist`),await a(s),await p(c,{watchers:l(-1)})):(r.classList.replace(`far`,`fas`),V(`Added to Watchlist 👀`),await f(s,{uid:F.uid,timestamp:Date.now()}),await p(c,{watchers:l(1)}))}catch(e){V(`Error: `+e.message,`error`),i?r.classList.replace(`far`,`fas`):r.classList.replace(`fas`,`far`)}})}),B(`.btn-join`).forEach(e=>{e.addEventListener(`click`,async t=>{if(t.stopPropagation(),!F){V(`Please log in to join!`,`error`),X(`login`);return}let n=e.dataset.id,i=O.find(e=>e.id===n);if(!i)return;if(e.classList.contains(`reserve`)){V(`Added to reserves for "${i.title}". We'll notify you if a slot opens! 📱`);return}if(i.players&&i.players.includes(F.uid)){V(`You have already joined this match!`,`info`);return}let a=parseFloat(i.fee);if(isNaN(a)||a<=0)try{await p(o(w,`games`,n),{players:r(F.uid),slotsLeft:l(-1)}),V(`Joined "${i.title}" instantly! See you there! ⚽`,`success`)}catch(e){console.error(`Error joining game:`,e),V(`Failed to join match. Please try again.`,`error`)}else Z(`payment`,{gameId:n})})});let e=z(`#confirm-payment-btn`);e&&e.addEventListener(`click`,async()=>{let t=I?.gameId,n=O.find(e=>e.id===t);n&&(e.disabled=!0,e.innerHTML=`<i class="fas fa-spinner fa-spin"></i> Processing...`,setTimeout(async()=>{try{await p(o(w,`games`,t),{players:r(F.uid),slotsLeft:l(-1)}),V(`Payment Successful! You've joined "${n.title}". 🚀`,`success`),Z(`history`)}catch(t){console.error(`Error finalizing payment join:`,t),V(`Payment succeeded but joining failed. Please contact support.`,`error`),e.disabled=!1,e.innerHTML=`Pay £${n.fee} & Join Match`}},1500))}),B(`.btn-leave`).forEach(e=>{e.addEventListener(`click`,async t=>{if(t.stopPropagation(),!F){V(`Please log in first.`,`error`);return}let r=e.dataset.id,i=O.find(e=>e.id===r);if(i){e.disabled=!0,e.innerHTML=`<i class="fas fa-spinner fa-spin"></i> Leaving...`;try{await p(o(w,`games`,r),{players:n(F.uid),slotsLeft:l(1)}),V(`Left "${i.title}" successfully.`)}catch(t){console.error(`Error leaving game:`,t),V(`Could not leave match — `+t.message,`error`),e.disabled=!1,e.innerHTML=`<i class="fas fa-sign-out-alt"></i> Leave Match`}}})}),B(`.btn-cancel-match`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation();let n=e.dataset.id,r=O.find(e=>e.id===n);if(r&&confirm(`CRITICAL: Are you sure you want to CANCEL and DELETE "${r.title}"? This cannot be undone.`))try{await a(o(w,`games`,n)),V(`Match "${r.title}" has been cancelled.`,`info`)}catch(e){console.error(`Error cancelling game:`,e),V(`Failed to cancel match.`,`error`)}})}),B(`.filter-chip`).forEach(e=>{e.addEventListener(`click`,()=>{if(e.dataset.timeFilter&&j===`play`){e.parentElement.querySelectorAll(`.filter-chip`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let t=e.dataset.timeFilter;B(`#games-grid .game-card`).forEach(e=>{if(t===`all`){e.style.display=``;return}let n=(e.querySelector(`.game-meta-item`)?.nextElementSibling?.textContent||e.textContent).toLowerCase().includes(`today`);t===`today`&&(e.style.display=n?``:`none`),t===`week`&&(e.style.display=``)})}e.dataset.venueFilter&&j===`book`&&(N=e.dataset.venueFilter,k())})});let t=z(`#create-game-btn`);t&&t.addEventListener(`click`,()=>Y());let i=z(`#empty-create-btn`);i&&i.addEventListener(`click`,()=>Y())}window.navigateToSport=function(e){M=e||`All`,j=`play`,B(`.nav-top-link`).forEach(e=>e.classList.toggle(`active`,e.dataset.page===`play`)),k();let t=z(`#app-content`);t&&(t.scrollTop=0),$()},window.handleHomeSearch=function(){let e=z(`#home-search`)?.value.trim();if(!e){R=``,Z(`book`);return}R=e;let t=e.toLowerCase();if(Object.keys(K).map(e=>e.toLowerCase()).includes(t)){M=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase(),R=``,Z(`book`);return}M=`All`,O.some(e=>e.title&&e.title.toLowerCase().includes(t)||e.hostName&&e.hostName.toLowerCase().includes(t))?Z(`play`):Z(`book`)},window.handleInnerSearch=function(e){R=e.trim(),k()},window.clearSearch=function(){R=``,k()};function ae(){z(`#bento-cta-host`)?.addEventListener(`click`,()=>Y());let e=z(`#home-search`);e&&(e.addEventListener(`input`,e=>{e.target.value.toLowerCase().trim()&&j!==`book`&&j!==`play`&&Z(`book`)}),e.addEventListener(`keydown`,t=>{t.key===`Enter`&&e.value.toLowerCase().trim()&&Z(`book`)}))}document.addEventListener(`DOMContentLoaded`,()=>{Z(`home`),B(`.nav-top-link`).forEach(e=>{e.addEventListener(`click`,()=>{M=`All`,R=``,Z(e.dataset.page)})}),z(`#header-create-btn`)?.addEventListener(`click`,()=>Y()),z(`#btn-login`).addEventListener(`click`,()=>X(`login`)),z(`#btn-signup`).addEventListener(`click`,()=>X(`signup`)),B(`.auth-tab`).forEach(e=>{e.addEventListener(`click`,()=>X(e.dataset.tab))}),z(`#modal-close`).addEventListener(`click`,()=>z(`#auth-modal`).classList.remove(`open`)),z(`#booking-close`).addEventListener(`click`,()=>z(`#booking-modal`).classList.remove(`open`)),B(`.modal-overlay`).forEach(e=>{e.addEventListener(`click`,t=>{t.target===e&&e.classList.remove(`open`)})}),z(`#login-form`).addEventListener(`submit`,async e=>{e.preventDefault();try{await y(T,z(`#login-email`).value,z(`#login-password`).value),z(`#auth-modal`).classList.remove(`open`),V(`Welcome back! 👋`)}catch(e){V(`Login failed: `+e.message,`error`)}}),z(`#signup-form`).addEventListener(`submit`,async e=>{e.preventDefault();try{await S((await g(T,z(`#signup-email`).value,z(`#signup-password`).value)).user,{displayName:z(`#signup-name`).value}),z(`#auth-modal`).classList.remove(`open`),V(`Welcome to GameNI! 🎉`)}catch(e){V(`Signup failed: `+e.message,`error`)}}),z(`#google-login`).addEventListener(`click`,async()=>{try{await b(T,E),z(`#auth-modal`).classList.remove(`open`),V(`Logged in with Google!`)}catch(e){V(`Google login failed: `+e.message,`error`)}}),z(`#btn-logout`).addEventListener(`click`,async()=>{try{await x(T),V(`Logged out.`)}catch(e){V(`Logout error: `+e.message,`error`)}}),v(T,e=>{if(F=e,e){z(`#unauth-controls`).classList.add(`hidden`),z(`#auth-controls`).classList.remove(`hidden`),z(`#user-display-name`).textContent=e.displayName||e.email;let t=(e.displayName||e.email||`U`).charAt(0).toUpperCase();z(`#user-avatar-initials`)&&(z(`#user-avatar-initials`).textContent=t)}else z(`#unauth-controls`).classList.remove(`hidden`),z(`#auth-controls`).classList.add(`hidden`),z(`#user-display-name`).textContent=``,z(`#user-avatar-initials`)&&(z(`#user-avatar-initials`).textContent=`U`)}),z(`#city-select`).addEventListener(`change`,e=>{P=e.target.value,k()}),z(`#nav-logo`)?.addEventListener(`click`,()=>Z(`home`))});