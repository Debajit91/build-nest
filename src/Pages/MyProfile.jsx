import React from "react";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import axiosInstance from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  // Fetch member agreement info, only if user is member and user email exists
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
    enabled: !!user?.email && role === "member",
  });

  // Determine if we can show agreement info
  const showAgreementData =
    role === "member" && !isAgreementLoading && !isAgreementError;

  // Format agreement accepted date if valid
  const agreementDate =
    showAgreementData && agreement?.date
      ? new Date(agreement.date).toLocaleDateString()
      : "None";

  // Fetch admin dashboard stats only if role is admin
  const {
    data: adminStats,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/admin/stats");
      return res.data;
    },
    enabled: role === "admin",
  });

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

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

      {/* Agreement Info for members */}
      {role === "member" && (
        <>
          {isAgreementError && (
            <p className="text-red-500 mb-4">Failed to load agreement info.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Agreement Accepted On:</p>
              <p className="text-gray-600">
                {isAgreementLoading ? "Loading..." : agreementDate}
              </p>
            </div>
            <div>
              <p className="font-semibold">Floor:</p>
              <p className="text-gray-600">
                {showAgreementData ? agreement?.floor || "None" : "None"}
              </p>
            </div>
            <div>
              <p className="font-semibold">Block:</p>
              <p className="text-gray-600">
                {showAgreementData ? agreement?.block || "None" : "None"}
              </p>
            </div>
            <div>
              <p className="font-semibold">Room Number:</p>
              <p className="text-gray-600">
                {showAgreementData ? agreement?.roomNo || "None" : "None"}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Admin Stats */}
      {role === "admin" && (
        <>
          {isStatsError && (
            <p className="text-red-500 mb-4">Failed to load admin stats.</p>
          )}
          {!isStatsLoading && adminStats && (
            <div className="mt-6 bg-gray-100 p-4 rounded">
              <h3 className="text-lg font-semibold mb-4">
                Admin Dashboard Stats
              </h3>
              <p>Total Rooms: {adminStats.totalRooms}</p>
              <p>Available Rooms: {adminStats.availableRoomsPercentage}%</p>
              <p>Unavailable Rooms: {adminStats.unavailableRoomsPercentage}%</p>
              <p>Total Users: {adminStats.totalUsers}</p>
              <p>Total Members: {adminStats.totalMembers}</p>
            </div>
          )}
          {isStatsLoading && <p>Loading admin stats...</p>}
        </>
      )}
    </div>
  );
};

export default MyProfile;
