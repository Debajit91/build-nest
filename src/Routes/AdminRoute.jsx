import { Navigate } from "react-router";
import useUserRole from "../Hooks/useUserRole";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole(); 

  if (loading || isLoading)
    return <p className="text-center mt-8">Loading...</p>;

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/unauthorized" />;
};

export default AdminRoute;
