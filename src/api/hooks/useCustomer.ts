import { useQuery } from "@tanstack/react-query";
import { getCustomerData } from "@/services/customerService";

export const useCustomer = () =>
  useQuery({
    queryKey: ["customer"],
    queryFn: getCustomerData,
  });
