import { useState } from "react";
import { useNavigate, Link } from "react-router"; // fixed import
import useAuth from "../Hooks/useAuth";
import GoogleSignIn from "../Components/GoogleSignIn";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);

      // success alert
      Swal.fire({
        title: "Welcome Back!",
        text: "You have successfully logged in.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleLogin}>
        <div className="text-black">
          <h2 className="text-3xl text-center mb-4">Login Your Account</h2>

          <div className="form-control mb-4">
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>

          <div className="form-control mb-6">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-xl text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>

        <div className="divider text-black">OR</div>

        <GoogleSignIn />

        <p className="text-center mt-4 text-sm text-black">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
