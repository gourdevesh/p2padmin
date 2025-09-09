// src/services/auth.ts
import api from "../api/api"; // make sure this is your axios instance

interface RegisterPayload {
  name: string;
  email: string;
  phone_number: string;
  role: string;
  password: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data?: any;
}

export const register = async (payload: RegisterPayload): Promise<ApiResponse> => {
  try {
    const { data } = await api.post("/auth/register", payload);
    return {
      status: data.status,
      message: data.message,
      data: data.data,
    };
  } catch (err: any) {
    return {
      status: false,
      message: err.response?.data?.message || err.message || "Something went wrong",
    };
  }
};
