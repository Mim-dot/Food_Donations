import React, { createContext, useEffect, useState } from "react";
//import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  reload,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUser = async (updatedData) => {
    const currentUser = auth.currentUser;
    await updateProfile(currentUser, updatedData);
    await reload(currentUser);
    setUser(auth.currentUser);
  };
  const handleForgetPassword = (email) => {
    console.log(email);
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        toast.success("Google login successful!");
      })
      .catch((error) => {
        toast.error("Google login failed: " + error.message);
      });
  };

  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth , (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    loading,
    setLoading,
    updateUser,
    handleForgetPassword,
    handleGoogle,
  };
  return (
    // <AuthContext.Provider value={authData}> {children}</AuthContext.Provider>
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
