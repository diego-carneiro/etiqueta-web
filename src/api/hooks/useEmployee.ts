import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "@/services/employeeService";

export type Employee = {
  id: string;
  name: string;
  email: string;
  role: number;
  serviceCenterId: string;
  isActive: boolean;
};

export type PaginatedEmployeeResponse = {
  data: Employee[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const useEmployees = () =>
  useQuery<PaginatedEmployeeResponse>({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
