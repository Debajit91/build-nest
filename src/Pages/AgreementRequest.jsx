import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";

const AgreementRequests = () => {
  const [requests, setRequests] = useState([]);
  console.log(requests);

  useEffect(() => {
    axiosInstance
      .get("/agreements/requests")
      .then((res) => setRequests(res.data.data))
      .catch((err) => console.error("Error fetching agreement requests:", err));
  }, []);

  const handleDecision = async (id, email, action) => {
    const isAccept = action === "accept";

    const result = await Swal.fire({
      title: `Are you sure you want to ${isAccept ? "accept" : "reject"}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: isAccept ? "Accept" : "Reject",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosInstance.patch(
        `/agreements/requests/${id}/decision`,
        {
          userEmail: email,
          action,
        }
      );

      if (res.data.success) {
        setRequests((prev) => prev.filter((req) => req._id !== id));

        Swal.fire({
          title: `${isAccept ? "Accepted" : "Rejected"}!`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error updating request:", error);
      Swal.fire("Failed", "Something went wrong", "error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Agreement Requests</h2>

      {requests.length === 0 ? (
        <p>No pending agreement requests.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="border p-4 rounded shadow">
              <p>
                <strong>Name:</strong> {req.name}
              </p>
              <p>
                <strong>Email:</strong> {req.email}
              </p>
              <p>
                <strong>Floor:</strong> {req.floor}
              </p>
              <p>
                <strong>Block:</strong> {req.block}
              </p>
              <p>
                <strong>Room No:</strong> {req.apartmentNo}
              </p>
              <p>
                <strong>Rent:</strong> {req.rent}
              </p>
              <p>
                <strong>Requested On:</strong>{" "}
                {new Date(req.createdAt).toLocaleDateString()}
              </p>

              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleDecision(req._id, req.email, "accept")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecision(req._id, req.email, "reject")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgreementRequests;
