import { Outlet, NavLink, Link, useNavigate } from "react-router";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";
import Logo from "/Logo.png";
import toast from "react-hot-toast";
import useUserRole from "../Hooks/useUserRole";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, isLoading } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logOut();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex bg-base-200 text-base-content">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 bg-white border border-black shadow-lg text-gray-800 h-full overflow-y-auto transition-transform duration-300
        ${isOpen ? "fixed translate-x-0" : "fixed -translate-x-full"}`}
      >
        {isOpen && (
          <div
            className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm z-20"
            onClick={() => setIsOpen(false)}
          />
        )}
        <div className="p-4 border-b z-40 relative">
          <Link to="/">
            <img src={Logo} alt="BuildNest" className="h-10 mx-auto" />
          </Link>
        </div>

        <nav className="p-4 space-y-2 z-40 relative">
          <NavLink
            to="/dashboard/my-profile"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-base-300 ${
                isActive ? "bg-base-300 font-semibold" : ""
              }`
            }
          >
            My Profile
          </NavLink>

          <NavLink
            to="/dashboard/announcements"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-base-300 ${
                isActive ? "bg-base-300 font-semibold" : ""
              }`
            }
          >
            Announcements
          </NavLink>

          {role === "member" && (
            <>
              <NavLink
                to="/dashboard/make-payment"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-base-300 ${
                    isActive ? "bg-base-300 font-semibold" : ""
                  }`
                }
              >
                Make Payment
              </NavLink>

              <NavLink
                to="/dashboard/payment-history"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-base-300 ${
                    isActive ? "bg-base-300 font-semibold" : ""
                  }`
                }
              >
                Payment History
              </NavLink>
            </>
          )}

          {role === "admin" && (
            <>
              <NavLink
                to="/dashboard/manage-members"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-base-300 ${
                    isActive ? "bg-base-300 font-semibold" : ""
                  }`
                }
              >
                Manage Members
              </NavLink>

              <NavLink
                to="/dashboard/make-announcement"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-base-300 ${
                    isActive ? "bg-base-300 font-semibold" : ""
                  }`
                }
              >
                Make Announcement
              </NavLink>

              <NavLink
                to="/dashboard/agreement-requests"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-base-300 ${
                    isActive ? "bg-base-300 font-semibold" : ""
                  }`
                }
              >
                Agreement Requests
              </NavLink>

              <NavLink
                to="/dashboard/manage-coupons"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-base-300 ${
                    isActive ? "bg-base-300 font-semibold" : ""
                  }`
                }
              >
                Manage Coupons
              </NavLink>
            </>
          )}

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
        <div className="bg-white px-4 py-6 border-b shadow flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="text-2xl text-primary cursor-pointer"
          >
            <FiMenu />
          </button>
          <span className="text-sm font-medium">{user?.displayName}</span>
        </div>

        {/* Page Content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
