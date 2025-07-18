import { Navigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";

const MemberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole(); // Adjust hook if needed

  if (loading || isLoading) return <div>Loading...</div>;

  if (user && role === "member") return children;

  return <Navigate to="/unauthorized" />;
};

export default MemberRoute;
