import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase-sovelluksesi konfiguraatio
const firebaseConfig = {
  apiKey: "In the Word document",
  authDomain: "shopping-list-12ee4.firebaseapp.com",
  projectId: "shopping-list-12ee4",
  storageBucket: "shopping-list-12ee4.appspot.com",
  messagingSenderId: "1087958468552",
  appId: "1:1087958468552:web:2e50bead4d9ca8780be2fd"
};

// Alustetaan Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };