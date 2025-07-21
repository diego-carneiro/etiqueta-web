import api from "../api/axios";
import { PaginatedEmployeeResponse } from "@/api/hooks/useEmployee";

export const getEmployees = async (): Promise<PaginatedEmployeeResponse> => {
  const response = await api.get("/employees");
  return response.data;
};
