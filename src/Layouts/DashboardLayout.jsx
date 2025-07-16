import { Outlet, NavLink, Link } from "react-router";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import Logo from '/Logo.png';

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await logOut();
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex bg-base-200 text-base-content">
      {/* Sidebar */}
      <div
        className={`fixed z-30 lg:static lg:w-64 w-64 bg-white shadow-lg h-full transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b">
          <Link to='/'><img src={Logo} alt="BuildNest" /></Link>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-base-300 ${
                isActive ? "bg-base-300 font-semibold" : ""
              }`
            }
          >
            Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/my-apartment"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-base-300 ${
                isActive ? "bg-base-300 font-semibold" : ""
              }`
            }
          >
            My Apartment
          </NavLink>

          <NavLink
            to="/dashboard/manage-users"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-base-300 ${
                isActive ? "bg-base-300 font-semibold" : ""
              }`
            }
          >
            Manage Users
          </NavLink>

          {/* ✅ New: Manage Coupons link */}
          <NavLink
            to="/dashboard/manage-coupons"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-base-300 ${
                isActive ? "bg-base-300 font-semibold" : ""
              }`
            }
          >
            Manage Coupons
          </NavLink>

          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 rounded hover:bg-red-100 text-red-600 font-medium"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white px-4 py-3 border-b shadow flex items-center justify-between lg:hidden">
          <button onClick={toggleSidebar} className="text-2xl text-primary">
            <FiMenu />
          </button>
          <span className="text-sm font-medium">{user?.email}</span>
        </div>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
