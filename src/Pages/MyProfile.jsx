import React from "react";
import useAuth from "../Hooks/useAuth";

const MyProfile = () => {
    const {user} = useAuth();
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
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Agreement Accepted On:</p>
          <p className="text-gray-600">None</p>
        </div>
        <div>
          <p className="font-semibold">Floor:</p>
          <p className="text-gray-600">None</p>
        </div>
        <div>
          <p className="font-semibold">Block:</p>
          <p className="text-gray-600">None</p>
        </div>
        <div>
          <p className="font-semibold">Room Number:</p>
          <p className="text-gray-600">None</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
