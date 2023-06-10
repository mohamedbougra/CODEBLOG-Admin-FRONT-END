import api from "@/service/apiClient";

export const login = async (credentials: any): Promise<any> => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const response = await api.post("/login", credentials, {
    headers,
    withCredentials: true,
  });
  return response;
};
export const logout = async (): Promise<any> => {
  const response = await api.post("/logout");
  return response;
};
