import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  projectId: "gameni-belfast",
  appId: "1:936361814428:web:39f72a60658a1da7f44059",
  storageBucket: "gameni-belfast.firebasestorage.app",
  apiKey: "AIzaSyBw134ZpZI7oCXfgTSBHAomPGGtu9bR_co",
  authDomain: "gameni-belfast.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const venues = [
  { id: "windsor", name: "Windsor Park", sportType: "football", address: { street: "Donegall Ave", city: "Belfast", postcode: "BT12 6LU" }, amenities: ["floodlights", "changing_rooms", "parking"], imageURL: "https://images.unsplash.com/photo-1518605368461-1e1e3eceb532?q=80&w=600" },
  { id: "solitude", name: "Solitude", sportType: "football", address: { street: "Cliftonville", city: "Belfast", postcode: "BT14 6LP" }, amenities: ["3G Synthetic Pitch", "floodlights"], imageURL: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600" },
  { id: "seaview", name: "Seaview", sportType: "football", address: { street: "Shore Road", city: "Belfast", postcode: "BT15 3PR" }, amenities: ["4G Surface", "floodlights"], imageURL: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=600" },
  { id: "stormont", name: "Stormont Cricket Green", sportType: "cricket", address: { street: "Upper Newtownards", city: "Belfast", postcode: "BT4 3TA" }, amenities: ["International Standard"], imageURL: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=600" },
  { id: "shaws", name: "Shaw's Bridge", sportType: "cricket", address: { street: "Milltown Rd", city: "Belfast", postcode: "BT8 4XP" }, amenities: ["Multiple Cricket Creases"], imageURL: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600" },
  { id: "ormeau", name: "Ormeau Cricket Ground", sportType: "cricket", address: { street: "Ormeau Park", city: "Belfast", postcode: "BT7 3AF" }, amenities: ["Public Access", "historic"], imageURL: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=600" }
];

async function seed() {
  console.log("Seeding venues and slots...");
  const baseTime = new Date();
  baseTime.setHours(18, 0, 0, 0); // start at 18:00 today

  for (const v of venues) {
    await setDoc(doc(db, "venues", v.id), {
      name: v.name,
      sportType: v.sportType,
      address: v.address,
      amenities: v.amenities,
      imageURL: v.imageURL
    });

    for (let i = 0; i < 3; i++) {
      const slotStart = new Date(baseTime.getTime() + i * 3600000); // +1 hour each
      const slotEnd = new Date(slotStart.getTime() + 3600000);
      const slotId = `${v.id}_${slotStart.getTime()}`;

      await setDoc(doc(db, "slots", slotId), {
        venueId: v.id,
        startTime: slotStart,
        endTime: slotEnd,
        isBooked: false,
        price: 45
      });
    }
  }
  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch(console.error);
