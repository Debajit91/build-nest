import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const MakePayment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [month, setMonth] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplying, setIsApplying] = useState(false);

  const { data: agreement, isLoading } = useQuery({
    queryKey: ["agreementInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/agreements/${user.email}`);
      return res.data.agreement;
    },
  });

  const handleApplyCoupon = async () => {
    if (!coupon) return toast.error("Enter a coupon code");
    try {
      setIsApplying(true);
      const res = await axiosInstance.post("/coupons/validate-coupon", {
        code: coupon,
      });
      setDiscount(res.data.discount);
      toast.success(`🎉 Coupon applied! ${res.data.discount}% off`);
    } catch {
      toast.error("❌ Invalid coupon");
      setDiscount(0);
    } finally {
      setIsApplying(false);
    }
  };

  const handlePay = async () => {
    if (!month) return toast.error("Please select a month");

    const discountedAmount = agreement.rent - (agreement.rent * discount) / 100;

    try {
      const res = await axiosInstance.post("/payments/create-payment-intent", {
        amount: discountedAmount * 100,
      });

      navigate("/dashboard/checkout", {
        state: {
          clientSecret: res.data.clientSecret,
          agreement,
          month,
          coupon,
          discount,
          discountedAmount,
          originalRent: agreement.rent,
        },
      });
    } catch (err) {
      console.error("Failed to create payment intent:", err);
      toast.error("Failed to initiate payment");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!agreement) return <p>No agreement found for this user.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border shadow rounded space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Make a Payment</h2>

      <div>
        <strong>Email:</strong> {agreement.email}
      </div>
      <div>
        <strong>Floor:</strong> {agreement.floor}
      </div>
      <div>
        <strong>Block Name:</strong> {agreement.block}
      </div>
      <div>
        <strong>Room/Apartment:</strong> {agreement.apartmentNo}
      </div>
      <div>
        <strong>Rent:</strong> ${agreement.rent}
      </div>

      <label className="block">
        Month:
        <select
          className="w-full border p-2 mt-1"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Select month</option>
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
      </label>

      <div className="flex items-center gap-2">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button
          onClick={handleApplyCoupon}
          disabled={isApplying}
          className="btn btn-sm"
        >
          {isApplying ? "Applying..." : "Apply"}
        </button>
      </div>

      {discount > 0 && (
        <div className="text-green-600">
          Coupon applied! {discount}% discount 🎉
          <br />
          You’ll pay: ${agreement.rent - (agreement.rent * discount) / 100}
        </div>
      )}

      <button onClick={handlePay} className="btn btn-primary w-full mt-4">
        Pay
      </button>
    </div>
  );
};

export default MakePayment;
