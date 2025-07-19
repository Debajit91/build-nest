import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";

const ManageMembers = () => {
  const queryClient = useQueryClient();
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/members");
      return res.data.data;
    },
  });

  const handleRemove = async (id, email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will lose member privileges.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosInstance.patch(`/users/remove-member/${id}`, {
          email,
        });
        if (res.data.modifiedCount > 0) {
          await queryClient.invalidateQueries(["members"]); // safer and cleaner
          Swal.fire("Removed!", "The user is now a regular user.", "success");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Members</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <td>{index + 1}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleRemove(member._id, member.email)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
