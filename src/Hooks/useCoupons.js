import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const useCoupons = () => {
  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/coupons");
      return res.data;
    },
  });

  return { coupons: data, loading: isLoading, refetch };
};

export default useCoupons;
