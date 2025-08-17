import React, { useState } from "react";
import Swal from "sweetalert2";
import useCoupons from "../Hooks/useCoupons";
import axiosInstance from "../api/axiosInstance";

const ManageCoupons = () => {
  const [editId, setEditId] = useState(null);
  const { coupons, loading, refetch } = useCoupons();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ code: "", discount: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axiosInstance.put(`/coupons/${editId}`, form);
        Swal.fire("Updated!", "Coupon updated successfully.", "success");
      } else {
        await axiosInstance.post("/coupons", form);
        Swal.fire("Success!", "Coupon added successfully.", "success");
      }

      setShowModal(false);
      setForm({ code: "", discount: "", description: "" });
      setEditId(null);
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to save coupon.", "error");
    }
  };

  // to track edit mode

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the coupon.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/coupons/${id}`);
        Swal.fire("Deleted!", "Coupon has been deleted.", "success");
        refetch();
      } catch (err) {
        Swal.fire("Error", "Failed to delete coupon.", "error");
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Coupons</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Coupon
        </button>
      </div>

      {loading ? (
        <p>Loading coupons...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Discount (%)</th>
                <th>Description</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c, idx) => (
                <tr key={c._id}>
                  <td>{idx + 1}</td>
                  <td>{c.code}</td>
                  <td>{c.discount}%</td>
                  <td>{c.description}</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => {
                        setForm(c); // prefill form
                        setEditId(c._id); // store id to update
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold">Add New Coupon</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Coupon Code"
                className="input input-bordered w-full"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Discount %"
                className="input input-bordered w-full"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                required
              />
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Coupon Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              ></textarea>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
