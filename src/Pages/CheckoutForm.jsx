import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import {  useState } from "react";
import useAuth from "../Hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { clientSecret, agreement, month, coupon, discount } =
    location.state || {};

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const originalRent = agreement?.rent;
  const rent = originalRent - (originalRent * discount) / 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");
    setSuccess("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { paymentIntent, error: stripeError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user?.name,
              email: user?.email,
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const txId = paymentIntent.id;
        setTransactionId(txId);

        // Save to DB
        try {
          await axiosInstance.post("/payments", {
            userId: agreement.userId || agreement._id,
            transactionId: txId,
            date: new Date().toISOString(),
            originalRent,
            discountedRent: rent,
            coupon,
            discount,
            month,
            apartment: agreement,
          });

          toast.success("Payment completed and saved successfully! 🎉");
          setSuccess("Payment successful!");
          navigate("/dashboard/payment-success", {
            state: { transactionId: txId },
          });
        } catch (saveErr) {
          console.error("DB Save Error:", saveErr);
          setError("Payment succeeded but failed to save info.");
        }
      }
    } catch (err) {
      console.error("Stripe Error:", err);
      setError("Something went wrong with payment.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-4 border shadow rounded"
    >
      <CardElement className="border p-3 rounded" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary mt-4 w-full"
      >
        {processing ? "Processing..." : "Confirm Payment"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && (
        <p className="text-green-600 mt-2">
          ✅ {success} <br />
          Transaction ID: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
