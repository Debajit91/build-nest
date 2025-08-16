import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaMoon, FaSignInAlt, FaSun } from "react-icons/fa";
// import useAuth from "../hooks/useAuth"; // Your custom hook for auth
import Logo from "/Logo.png";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  // Initialize theme state from localStorage (default to 'retro' if not set)
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "retro"
  );

  // Whenever `theme` changes, apply it to <html> and store in localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // Switch DaisyUI theme:contentReference[oaicite:5]{index=5}
    localStorage.setItem("theme", theme); // Persist theme choice:contentReference[oaicite:6]{index=6}
  }, [theme]);

  // Toggle between 'retro' (light) and 'night' (dark) themes
  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === "retro" ? "night" : "retro"));
  };
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Top-level Links
  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/apartments", label: "Apartments" },
    { to: "/about", label: "About" },
  ];

  const extraWhenLoggedIn = [
    { to: "/contact", label: "Contact" },
    { to: "/community", label: "Community" },
  ];

  const navLinks = user ? [...publicLinks, ...extraWhenLoggedIn] : publicLinks;

  return (
    <div className="w-full dark:bg-primary bg-base-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo + Website Name */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <img className="w-[200px]" src={Logo} alt="BuildNest" />
        </Link>

        {/* Top Level Links */}
        <div className="flex items-center gap-4">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="btn btn-ghost btn-sm">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side: Login or User Profile Dropdown */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggle}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
          >
            {/* Show moon icon when in light mode, sun icon when in dark mode */}
            {theme === "retro" ? (
              <FaMoon className="w-5 h-5" /> /* Retro (light) active: offer moon (dark) */
            ) : (
              <FaSun className="w-5 h-5" /> /* Night (dark) active: offer sun (light) */
            )}
          </button>
          {!user ? (
            <Link
              to="/login"
              className="text-xl btn btn-ghost btn-circle tooltip tooltip-bottom"
              data-tip="Login"
            >
              <FaSignInAlt />
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52 space-y-2"
              >
                {/* ✅ UPDATED: User display name, not clickable */}
                <li className="text-center font-semibold text-sm text-neutral-content bg-neutral rounded p-2 cursor-default">
                  {user.displayName || "User"}
                </li>
                <li>
                  <Link to="/dashboard" className="btn btn-sm w-full text-left">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm w-full text-left"
                  >
                    Logout
                  </button>
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
