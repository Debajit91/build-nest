import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../Hooks/useAuth";


const MakePayment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [month, setMonth] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  // ✅ fetch member agreement info from DB
  const { data: agreement, isLoading } = useQuery({
    queryKey: ["agreementInfo", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/agreements/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!agreement) return <p>You are not an active member.</p>;

  const handleCouponApply = async () => {
    try {
      const res = await axiosInstance.post("/validate-coupon", {
        code: couponCode,
      });

      if (res.data.valid) {
        setDiscount(res.data.discount); // e.g., 10 means 10%
        setCouponError("");
      } else {
        setDiscount(0);
        setCouponError("Invalid or expired coupon.");
      }
    } catch (err) {
      setCouponError("Error validating coupon.");
    }
  };

  const handlePay = () => {
    const rent = agreement.rent;
    const discountedRent = rent - rent * (discount / 100);

    navigate("/checkout", {
      state: {
        member: {
          email: user.email,
          floor: agreement.floor,
          block: agreement.block,
          room: agreement.room,
        },
        month,
        rent: discountedRent,
        originalRent: rent,
        coupon: couponCode || null,
        discount,
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Make Payment</h2>

      <div className="space-y-3">
        <div>
          <label>Email:</label>
          <input readOnly value={user.email} className="input input-bordered w-full" />
        </div>
        <div>
          <label>Floor:</label>
          <input readOnly value={agreement.floor} className="input input-bordered w-full" />
        </div>
        <div>
          <label>Block:</label>
          <input readOnly value={agreement.block} className="input input-bordered w-full" />
        </div>
        <div>
          <label>Room:</label>
          <input readOnly value={agreement.room} className="input input-bordered w-full" />
        </div>
        <div>
          <label>Rent:</label>
          <input readOnly value={`৳ ${agreement.rent}`} className="input input-bordered w-full" />
        </div>

        <div>
          <label>Month:</label>
          <select
            className="select select-bordered w-full"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 items-end">
          <input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="input input-bordered w-full"
          />
          <button onClick={handleCouponApply} className="btn btn-outline btn-sm">
            Apply
          </button>
        </div>
        {discount > 0 && <p className="text-green-600">Coupon applied: {discount}% off</p>}
        {couponError && <p className="text-red-500">{couponError}</p>}

        <button
          onClick={handlePay}
          disabled={!month}
          className="btn btn-primary w-full mt-4"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default MakePayment;
