import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosInstance from "../api/axiosInstance";


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const amount = 5000; // = 50.00 BDT (Stripe uses paisa/cent unit)
  const memberInfo = {
    name: "Member Name",
    email: "email@example.com",
    floor: "3rd",
    block: "A",
    room: "305",
    month: "July",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");
    setSuccess("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      // 1. Create payment intent from backend
      const res = await axiosInstance.post("/create-payment-intent", { amount });
      const clientSecret = res.data.clientSecret;

      // 2. Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: memberInfo.name,
            email: memberInfo.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setSuccess("Payment successful!");
        setTransactionId(result.paymentIntent.id);

        // 3. Save to DB
        await axiosInstance.post("/payments", {
          ...memberInfo,
          amount,
          transactionId: result.paymentIntent.id,
          date: new Date(),
        });
      }
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        className="border p-3 rounded"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#333",
              "::placeholder": { color: "#999" },
            },
            invalid: { color: "#e5424d" },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !elements || processing}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {processing ? "Processing..." : "Pay"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <div className="text-green-600">
          <p>{success}</p>
          <p>Transaction ID: {transactionId}</p>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
