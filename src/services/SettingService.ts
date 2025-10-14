// services/userService.ts

import api from "../api/api";
export const getSettingData = async (token: string,) => {
    try {
        const { data } = await api.get(`/setting/get-setting-data`, {
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


export const updateSettingData = async (token: string, formData: FormData) => {
  try {
    const { data } = await api.post(
      "/setting/update-setting-data",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};