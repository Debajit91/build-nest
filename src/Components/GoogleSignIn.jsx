import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const GoogleSignIn = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        title: "Welcome Back!",
        text: "You have successfully logged in.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/dashboard");
    } catch (error) {
     toast.error("Google Sign-In Failed: " + error.message);
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
