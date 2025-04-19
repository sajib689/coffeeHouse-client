'use client';

import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import auth from './../Firebase/Firebase.config.js';

// Create the context
export const AuthContext = createContext(null);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user with email and password
  const createUserWithForm = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in with email and password
  const signWithForm = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Sign in with Github
  const signWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  // Sign out
  const logout = () => {
    return signOut(auth);
  };

  // Track the authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    createUserWithForm,
    signWithForm,
    signWithGoogle,
    signWithGithub,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
