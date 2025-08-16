import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import axiosInstance from "../api/axiosInstance";

const PaymentHistory = () => {
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["myPayments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/payments/my-payments/${user.email}`);
      return res.data.payments;
    },
  });

  if (isLoading) return <p>Loading payment history...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-6">My Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-base-200 text-base-content border-2">
            <tr>
              <th>#</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Discount</th>
              <th>Rent</th>
              <th>Transaction ID</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={p.transactionId}>
                <td>{idx + 1}</td>
                <td>{p.month}</td>
                <td>${p.amount}</td>
                <td>{p.discount}%</td>
                <td>${p.originalRent}</td>
                <td className="text-xs">{p.transactionId}</td>
                <td>{new Date(p.paidAt).toLocaleString()}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
