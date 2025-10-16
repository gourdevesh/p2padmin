// services/userService.ts

import api from "../api/api";
import { showToast } from "../utils/toast";
export const getAdmin = async (token: string, query: string = "",) => {
  try {
    const { data } = await api.get(`/all-admin-details?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch user details";
    throw new Error(msg);
  }
};

export const logOutUser = async () => {
  const token = localStorage.getItem("authToken");

  return api.delete("/auth/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.data)
    .catch(err => {
      console.error("Logout API error:", err);
      throw err;
    });
};
