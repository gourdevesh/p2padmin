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


// =============================
// UPDATE ADMIN SERVICE
// =============================
export const updateAdmin = async (id: string | number, values: any) => {
  try {
    const response = await api.put("/auth/updateAdmin", values);

    return {
      status: response.data?.status ?? false,
      message: response.data?.message ?? "Admin updated successfully",
      data: response.data?.data ?? null,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Failed to update admin",
      data: null,
    };
  }
};

