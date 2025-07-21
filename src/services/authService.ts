import api from "../api/axios";

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  customerTaxId: string;
};

export const login = async (params: LoginParams) => {
  const response = await api.post("/login", params);
  return response.data;
};

export const register = async (params: RegisterParams) => {
  const response = await api.post("/customers", params);
  return response.data;
};
