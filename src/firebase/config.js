import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAQU6X1ZQFXnTEIqT1qaZzqHF1wiJPiNBw',
	authDomain: 'bweem-84696.firebaseapp.com',
	projectId: 'bweem-84696',
	storageBucket: 'bweem-84696.appspot.com',
	messagingSenderId: '894056632549',
	appId: '1:894056632549:web:edec66ff13d28b0f03040c',
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init firebase auth
const auth = getAuth();

export { db, auth };
