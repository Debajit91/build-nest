import React from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = () => {
    const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      alert("Google Sign-In Failed: " + error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="btn bg-base-200 text-black btn-outline w-full flex items-center justify-center gap-2"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
    );
};

export default GoogleSignIn;