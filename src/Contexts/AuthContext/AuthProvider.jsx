import React, { Children, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth/cordova";
import { auth } from "./../../FairBase/fairbase.init";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const googlProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   signup
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

//   signin
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

//   google signin/signup
  const googleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, googlProvider);
  };

//   logout
  const logOut = () =>{
    setLoading(true)
    return signOut(auth)
  }

//   updateprofile
const updateUserProfile = (profile) =>{
    return updateProfile(auth.currentUser,profile)
}

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
            setLoading(false)
    });
    return () =>{
        unSubscribe()
    }
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    googleSignin,
    logOut,
    updateUserProfile
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
