import React from "react";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import axiosInstance from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  // ✅ Agreement info only for members
  const {
    data: agreement,
    isLoading: isAgreementLoading,
    isError: isAgreementError,
  } = useQuery({
    queryKey: ["agreement", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/agreements/${user.email}`);
      return res.data.agreement;
    },
    enabled: !!user?.email && role === "member", // only fetch if email exists and role is member
  });

  // ✅ Format date nicely or fallback
  const agreementDate = agreement?.acceptedAt
    ? new Date(agreement.acceptedAt).toLocaleDateString()
    : "None";

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      {/* User Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user?.photoURL || "/default-user.png"}
          alt="User"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h3 className="text-xl font-medium">{user?.displayName || "N/A"}</h3>
          <p>{user?.email || "N/A"}</p>
          <p className="text-sm text-gray-500">Role: {role || "N/A"}</p>
        </div>
      </div>

      {/* Agreement Info shown to all, only fetched for members */}
      {role !== "admin" && (
        <>
          {role === "member" && isAgreementError && (
            <p className="text-red-500 mb-4">Failed to load agreement info.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Agreement Accepted On:</p>
              <p className="text-gray-600">
                {role === "member"
                  ? isAgreementLoading
                    ? "Loading..."
                    : agreementDate
                  : "None"}
              </p>
            </div>
            <div>
              <p className="font-semibold">Floor:</p>
              <p className="text-gray-600">
                {role === "member"
                  ? isAgreementLoading
                    ? "Loading..."
                    : agreement?.floor || "None"
                  : "None"}
              </p>
            </div>
            <div>
              <p className="font-semibold">Block:</p>
              <p className="text-gray-600">
                {role === "member"
                  ? isAgreementLoading
                    ? "Loading..."
                    : agreement?.block || "None"
                  : "None"}
              </p>
            </div>
            <div>
              <p className="font-semibold">Room Number:</p>
              <p className="text-gray-600">
                {role === "member"
                  ? isAgreementLoading
                    ? "Loading..."
                    : agreement?.apartmentNo || "None"
                  : "None"}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Admin-specific Stats */}
      {role === "admin" && <AdminStats />}
    </div>
  );
};

// 🟢 Admin stats component (split for clarity)
const AdminStats = () => {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading admin stats...</p>;
  if (isError) return <p className="text-red-500">Failed to load stats.</p>;

  return (
    <div className="mt-6 bg-gray-100 p-4 rounded">
      <h3 className="text-lg font-semibold mb-4">Admin Dashboard Stats</h3>
      <p>Total Rooms: {stats.totalRooms}</p>
      <p>Available Rooms: {stats.availableRoomsPercentage}%</p>
      <p>Unavailable Rooms: {stats.unavailableRoomsPercentage}%</p>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Members: {stats.totalMembers}</p>
    </div>
  );
};

export default MyProfile;
