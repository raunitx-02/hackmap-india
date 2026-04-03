import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAGiTXxWSk80f4uE_3qUZ-EO1sKVwYMWzI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "hackmap-india.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hackmap-india",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hackmap-india.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1074015208406",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1074015208406:web:072d329ca488e5b382da77",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-9FBQ6EMH57"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
