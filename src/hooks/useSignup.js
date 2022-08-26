import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// firebase imports
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const useSignup = () => {
	const [error, setError] = useState(null);
	const { dispatch } = useAuthContext();

	const signup = (email, password, displayName) => {
		setError(null);
		createUserWithEmailAndPassword(auth, email, password)
			.then((res) => {
				const uid = res.user.uid;
				// collection
				const collectionId = 'users';
				// document
				const documentId = uid;
				// fields
				const value = {
					id: uid,
					displayName: displayName,
					email: email,
					verified: false,
					favorite_Chords: [],
				};
				setDoc(doc(db, collectionId, documentId), value);

				dispatch({ type: 'LOGIN', payload: res.user });
			})
			.catch((err) => {
				setError(err.message);
				console.log(error);
			});
	};

	return { error, signup };
};
