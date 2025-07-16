import { useState } from "react";
import { useNavigate, Link } from "react-router";
import useAuth from "../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col px-8">
        <div className="form-control mb-4 text-black">
        
        <input type="email" className="input input-bordered" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
      </div>

      <div className="form-control mb-6 text-black">
        
        <input type="password" className="input input-bordered" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
      </div>
      </div>

      <button type="submit" className="btn btn-primary w-full">Login</button>

      <div className="divider text-black">OR</div>

      <button type="button" className="btn text-black btn-outline w-full" onClick={signInWithGoogle}>
        <FcGoogle />
        Continue with Google
      </button>

      <p className="text-center mt-4 text-sm text-black">
        Don’t have an account? <Link to="/register" className="text-blue-600 font-medium">Register</Link>
      </p>
    </form>
  );
}

export default Login;
