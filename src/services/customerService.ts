import api from "../api/axios";

export const getCustomerData = async () => {
  const response = await api.get("/customers");
  console.log(response.data);

  return response.data;
};
