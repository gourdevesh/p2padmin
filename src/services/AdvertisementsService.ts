// services/userService.ts

import api from "../api/api";
export const getAdvertisements = async (token: string, query: string = "",) => {
    try {
        const { data } = await api.get(`/crypto-advertisement/crypto-ad?${query}`, {
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

export const DisableAdvertisement = async (payload: {
  ad_id: number;
  is_active: string; // ✅ boolean string
  token: string;
}) => {
  const formData = new FormData();
  formData.append("ad_id", payload.ad_id.toString()); // ✅ no space
  formData.append("is_active", payload.is_active);

  try {
    const response = await api.post(
      "/crypto-advertisement/toggle-cryptoAd-active",
      formData,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error toggling advertisement:", error.response || error);
    throw error;
  }
};