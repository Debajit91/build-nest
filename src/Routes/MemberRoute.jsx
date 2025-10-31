import { Navigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import LoadingScreen from "../Components/Loader/LoadingScreen";

const MemberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole(); 

  if (loading || isLoading) return <div><LoadingScreen/></div>;

  if (user && role === "member") return children;

  return <Navigate to="/unauthorized" />;
};

export default MemberRoute;
