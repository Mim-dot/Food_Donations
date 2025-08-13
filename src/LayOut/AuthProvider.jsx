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
// import axios from "axios";


const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // const auth = getAuth(app);
 
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      async (result) => {
        const token = await result.user.getIdToken();
        localStorage.setItem("access-token", token);
        return result;
      }
    );
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
  // const handleGoogle = () => {
  // return  signInWithPopup(auth, googleProvider)
  //     .then((result) => {
  //       toast.success("Google login successful!");
  //        return result;
  //     })
  //     .catch((error) => {
  //       toast.error("Google login failed: " + error.message);
  //     });
  // };
  const handleGoogle = () => {
    return signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const token = await result.user.getIdToken();
        localStorage.setItem("access-token", token);
        toast.success("Google login successful!");
        return result;
      })
      .catch((error) => {
        toast.error("Google login failed: " + error.message);
        throw error; // Important: re-throw the error to propagate it
      });
  };
  const logOut = () => {
    localStorage.removeItem("access-token");
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      setUser(currentUser);
      setLoading(false);
       if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem("access-token", token);
      } else {
        localStorage.removeItem("access-token");
      }
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
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
// import React, { createContext, useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   reload,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { AuthContext } from "./AuthContext";
// import { auth } from "../firebase/firebase.config";
// import { toast } from "react-toastify";
// import axios from "axios";  // Using axios to fetch role

// const AuthProvider = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   const googleProvider = new GoogleAuthProvider();

//   const createUser = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signIn = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password).then(
//       async (result) => {
//         const token = await result.user.getIdToken();
//         localStorage.setItem("access-token", token);
//         return result;
//       }
//     );
//   };

//   const updateUser = async (updatedData) => {
//     const currentUser = auth.currentUser;
//     await updateProfile(currentUser, updatedData);
//     await reload(currentUser);
//     setUser(auth.currentUser);
//   };

//   const handleForgetPassword = (email) => {
//     return sendPasswordResetEmail(auth, email).catch((error) => {
//       // handle error if needed
//     });
//   };

//   const handleGoogle = () => {
//     return signInWithPopup(auth, googleProvider)
//       .then(async (result) => {
//         const token = await result.user.getIdToken();
//         localStorage.setItem("access-token", token);
//         toast.success("Google login successful!");
//         return result;
//       })
//       .catch((error) => {
//         toast.error("Google login failed: " + error.message);
//         throw error;
//       });
//   };

//   const logOut = () => {
//     localStorage.removeItem("access-token");
//     return signOut(auth);
//   };

//   // NEW: fetch user role from backend
//   const fetchUserRole = async (email) => {
//     try {
//       const res = await axios.get(`https://my-final-project-server.vercel.app/users/${email}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access-token")}`,
//         },
//       });
//       return res.data.role || null;
//     } catch (error) {
//       console.error("Failed to fetch user role:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         try {
//           const token = await currentUser.getIdToken();
//           localStorage.setItem("access-token", token);

//           const role = await fetchUserRole(currentUser.email);

//           // Merge Firebase user with role from backend
//           setUser({ ...currentUser, role });
//         } catch (error) {
//           console.error("Error fetching user role on auth state change:", error);
//           setUser(currentUser); // fallback, without role
//         }
//       } else {
//         localStorage.removeItem("access-token");
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const authData = {
//     user,
//     setUser,
//     createUser,
//     logOut,
//     signIn,
//     loading,
//     setLoading,
//     updateUser,
//     handleForgetPassword,
//     handleGoogle,
//   };

//   return (
//     <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;
