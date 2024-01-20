import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const userResponse = await axiosInstance.get("/users");
      return userResponse;
    },
  });

  return {
    data,
    isLoading,
    refetch
  }
};
