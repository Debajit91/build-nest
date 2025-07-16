import React from "react";
import { Link, useNavigate } from "react-router";
import { FaSignInAlt } from "react-icons/fa";
// import useAuth from "../hooks/useAuth"; // Your custom hook for auth
import Logo from '/Logo.png';
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + Website Name */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <img className="w-[200px]" src={Logo} alt="BuildNest" />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link to="/" className="btn btn-ghost btn-sm">Home</Link>
          <Link to="/apartments" className="btn btn-ghost btn-sm">Apartments</Link>
        </div>

        {/* Right Side: Login or User Profile Dropdown */}
        <div className="flex items-center gap-4">
          {!user ? (
            <Link to="/login" className="text-xl btn btn-ghost btn-circle tooltip tooltip-bottom" data-tip="Login">
              <FaSignInAlt />
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL || "/default-avatar.png"} alt="profile" />
                </div>
              </label>
              <ul tabIndex={0} className="dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52 space-y-2">
                {/* ✅ UPDATED: User display name, not clickable */}
                <li className="text-center font-semibold text-sm text-neutral-content bg-neutral rounded p-2 cursor-default">
                  {user.displayName || "User"}
                </li>
                <li>
                  <Link to="/dashboard" className="btn btn-sm w-full text-left">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-sm w-full text-left">Logout</button>
                </li>
              </ul>
            </div>
          )} 
         </div>
      </div>
    </div>
  );
};

export default Navbar;
