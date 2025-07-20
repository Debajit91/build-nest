import { useEffect, useState } from "react";
import useAuth from "./useAuth"; // make sure this gives you current user

const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRole(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    fetch(`https://buildnestserver.vercel.app/users/role/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRole(data?.role);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user role:", error);
        setIsLoading(false);
      });
  }, [user?.email]);

  return { role, isLoading };
};

export default useUserRole;