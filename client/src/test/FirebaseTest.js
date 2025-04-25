// src/test/FirebaseTest.js
import { auth } from '../firebase';
import { useEffect } from 'react';

export default function FirebaseTest() {
  useEffect(() => {
    console.log('Firebase Auth:', auth);
    console.log('Current User:', auth.currentUser);
  }, []);

  return <div>Check console for Firebase initialization</div>;
}