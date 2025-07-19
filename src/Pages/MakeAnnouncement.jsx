import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const MakeAnnouncement = () => {
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !description.trim()) {
      setError("Both fields are required.");
      return;
    }

    try {
      const res = await axiosInstance.post("/admin/announcements", {
        title,
        description,
      });
      if (res.data.insertedId) {
        setSuccess("Announcement posted successfully.");
        setTitle("");
        setDescription("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to post announcement.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Make Announcement</h2>

      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Post Announcement
        </button>
      </form>
    </div>
    );
};

export default MakeAnnouncement;