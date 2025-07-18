import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import saveUser from "../api/saveUser";

const GoogleSignIn = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      await saveUser(userData);

      Swal.fire({
        title: "Welcome Back!",
        text: "You have successfully logged in.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from, {replace: true});
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
