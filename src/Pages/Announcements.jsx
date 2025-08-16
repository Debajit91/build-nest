import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const Announcements = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosInstance.get("/announcements");
      return res.data.announcements;
    },
  });

  if (isLoading) return <p className="text-center">Loading announcements...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load announcements.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">📢 Announcements</h2>
      <div className="space-y-4">
        {data.length === 0 && <p>No announcements found.</p>}
        {data.map((announcement) => (
          <div
            key={announcement._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-gray-700 ">{announcement.title}</h3>
            <p className="text-gray-700 mt-2">{announcement.description}</p>
            {announcement.createdAt && (
              <p className="text-sm text-gray-400 mt-1">
                Posted on: {new Date(announcement.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
