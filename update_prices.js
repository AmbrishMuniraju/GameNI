import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  projectId: "gameni-belfast",
  appId: "1:936361814428:web:39f72a60658a1da7f44059",
  storageBucket: "gameni-belfast.firebasestorage.app",
  apiKey: "AIzaSyBw134ZpZI7oCXfgTSBHAomPGGtu9bR_co",
  authDomain: "gameni-belfast.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const updates = {
  // Football
  brook_football: { price: "Prices vary (Juniors: £1.00 drop-in)", imageURL: "./images/football_pitch.png" },
  avoniel_football: { price: "Prices vary", imageURL: "./images/football_pitch.png" },
  lisnasharragh_football: { price: "Prices vary", imageURL: "./images/football_pitch.png" },
  whiterock_football: { price: "Prices vary", imageURL: "./images/football_pitch.png" },

  // Cricket
  stormont_cricket: { price: "Membership required", imageURL: "./images/cricket_ground.png" },
  shaws_cricket: { price: "Contact for pricing", imageURL: "./images/cricket_ground.png" },
  ormeau_cricket: { price: "Adult full-day: £134.00, Part-day: £89.00", imageURL: "./images/cricket_ground.png" },

  // Swimming
  andersonstown_swimming: { price: "Adults: £5.60 - £5.80, Juniors: £2.75", imageURL: "./images/swimming_pool.png" },
  falls_swimming: { price: "Adults: £5.60 - £5.80, Juniors: £2.75", imageURL: "./images/swimming_pool.png" },
  lisnasharragh_swimming: { price: "Adults: £5.60 - £5.80, Juniors: £2.75", imageURL: "./images/swimming_pool.png" },

  // Badminton
  girdwood_badminton: { price: "Prices vary", imageURL: "./images/badminton_court.png" },
  queens_badminton: { price: "1 court: £8.00 - £11.00", imageURL: "./images/badminton_court.png" },

  // Padel
  belfast_boat_club_padel: { price: "Members: £16-£24/hr, Non-members: £24-£32/hr", imageURL: "./images/padel_court.png" },
  lets_go_padel: { price: "Singles: £16.00/hr, Doubles: £24.00/hr", imageURL: "./images/padel_court.png" },
  david_lloyd_padel: { price: "Day Passes: £25.00 - £35.00", imageURL: "./images/padel_court.png" },
  windsor_padel: { price: "Contact for pricing", imageURL: "./images/padel_court.png" },
  padel_54_moira: { price: "Court hire: £15.00 - £22.00/hr", imageURL: "./images/padel_court.png" },

  // Pickleball
  lisnasharragh_pickleball: { price: "Bookable courts: £7.60 - £7.85 (non-members)", imageURL: "./images/pickleball_court.png" },
  olympia_pickleball: { price: "Bookable courts: £7.60 - £7.85 (non-members)", imageURL: "./images/pickleball_court.png" },
  brook_pickleball: { price: "Bookable courts: £7.60 - £7.85 (non-members)", imageURL: "./images/pickleball_court.png" },
  ballysillan_pickleball: { price: "Bookable courts: £7.60 - £7.85 (non-members)", imageURL: "./images/pickleball_court.png" },
  falls_pickleball: { price: "Bookable courts: £7.60 - £7.85 (non-members)", imageURL: "./images/pickleball_court.png" },
  shankill_pickleball: { price: "Bookable courts: £7.60 - £7.85 (non-members)", imageURL: "./images/pickleball_court.png" },
  belvoir_pickleball: { price: "Bookable courts: £7.60 - £7.85 (non-members)", imageURL: "./images/pickleball_court.png" },
  whiterock_pickleball: { price: "Bookable courts: £7.60 - £7.85 (non-members)", imageURL: "./images/pickleball_court.png" },
  eddie_irvine_pickleball: { price: "Adults: £16.00/hr, Under-16s: £10.00/hr", imageURL: "./images/pickleball_court.png" },
};

async function updateAll() {
  console.log("Updating venues...");
  
  const snap = await getDocs(collection(db, "venues"));
  for (const docSnap of snap.docs) {
    const id = docSnap.id;
    if (updates[id]) {
      await updateDoc(docSnap.ref, updates[id]);
      console.log("Updated", id);
    } else {
      console.log("No updates mapped for", id);
    }
  }

  console.log("Update complete.");
  process.exit(0);
}

updateAll().catch(console.error);
