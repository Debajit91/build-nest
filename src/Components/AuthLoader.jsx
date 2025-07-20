// src/Components/AuthLoader.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import useAuth from "../Hooks/useAuth";
import { auth } from "../Firebase/Firebase.init";


const AuthLoader = ({ children }) => {
    const {user} = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
        console.log("Firebase user:", user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return children;
};

export default AuthLoader;
