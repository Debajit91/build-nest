import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.transactionId) {
      navigate("/dashboard"); // fallback if no data
    }
  }, [state, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold text-green-600">✅ Payment Successful!</h2>
      <p className="mt-4">Thank you! Your payment was completed successfully.</p>
      <p className="mt-2"><strong>Transaction ID:</strong> {state?.transactionId}</p>
    </div>
  );
};

export default PaymentSuccess;
