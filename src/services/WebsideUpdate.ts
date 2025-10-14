// services/userService.ts

import api from "../api/api";
export const getUserDetails = async (token: string, query: string = "",) => {
    try {
        const { data } = await api.get(`/user/user-details?${query}`, {
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

export const updateNameTitle = async (token: string, formData: FormData) => {
  try {
    const { data } = await api.post("/website/update-nameTitleUrl", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    throw error;

  }
};


export const updateWebsideLogo = async (token: string, formData: FormData) => {
  try {
    const { data } = await api.post("/website/update-logoAndFavicon", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    throw error;

  }
};