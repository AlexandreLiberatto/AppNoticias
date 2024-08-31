import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAVpn54cDmmjdTNXM-yhaqfrZrPL9zEj8g",
  authDomain: "appnoticias-e9551.firebaseapp.com",
  projectId: "appnoticias-e9551",
  storageBucket: "appnoticias-e9551.appspot.com",
  messagingSenderId: "674741187275",
  appId: "1:674741187275:web:7c64a579f12d5ec81ce14e"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db, collection, query, orderBy, onSnapshot };
