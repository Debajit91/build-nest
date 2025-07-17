import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";


const useApartments = () => {
  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axiosInstance.get("/apartments");
      return res.data;
    },
  });

  return { apartments: data, loading: isLoading, refetch };
};

export default useApartments;
