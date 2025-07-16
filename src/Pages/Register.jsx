import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import GoogleSignIn from "../Components/GoogleSignIn";
import saveUser from "../api/saveUser";

const imgbbAPI = import.meta.env.VITE_IMGBB_API_KEY;

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpper) {
      toast.error("Password must have an uppercase letter");
      return false;
    }
    if (!hasLower) {
      toast.error("Password must have a lowercase letter");
      return false;
    }
    if (!isLongEnough) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const url = `https://api.imgbb.com/1/upload?key=${imgbbAPI}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data?.data?.url;
    } catch (err) {
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name, email, password, image } = formData;

    
    name = name.trim();
    email = email.trim().toLowerCase();

    if (!validatePassword(password)) return;

    try {
      setUploading(true);

      let imageURL = "";
      if (image) {
        imageURL = await handleImageUpload(image);

        
        if (!imageURL) {
          setUploading(false);
          return;
        }
      }

      // Firebase Auth
      await createUser(email, password);
      await updateUserProfile({
        displayName: name,
        photoURL: imageURL,
      });

      // Save to MongoDB
      const newUser = {
        name,
        email,
        photoURL: imageURL,
      };
      await saveUser(newUser);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false); 
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="text-black">
          <h2 className="text-3xl text-center mb-4">Register Your Account</h2>

          
          <div className="form-control mb-4">
            <label htmlFor="name" className="label-text mb-1">
              Name
            </label>
            <input
              placeholder="Your Name"
              type="text"
              name="name"
              id="name"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label htmlFor="email" className="label-text mb-1">
              Email
            </label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label htmlFor="image" className="label-text mb-1">
              Upload Photo (Optional)
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleChange}
            />
          </div>

          <div className="form-control mb-6">
            <label htmlFor="password" className="label-text mb-1">
              Password
            </label>
            <div className="relative">
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="input input-bordered w-full pr-10"
                onChange={handleChange}
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={uploading}
        >
          {uploading ? "Registering..." : "Register"}
        </button>

        <div className="divider text-black">OR</div>

        <GoogleSignIn />

        <p className="text-center mt-4 text-sm text-black">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 font-medium ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default Register;
