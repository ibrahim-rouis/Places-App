import { firebaseConfig } from '@/config/firebase.config';
import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

// initialize firebase
const app = initializeApp(firebaseConfig);

// Initialize and export services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Connect to emulators in development mode
if (import.meta.env.DEV) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
}
