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
export const getUserDetailsbyId = async (token:string, id:number) => {
  try {
    const response = await api.get(`/user/user-details/${id}`, {
      headers: {
        accept: 'application/json',
        Authorization: token, // Example: `Bearer ${token}` if required
      },
    });

    console.log('User details:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const updateUserStatusDetail = async (token: string, body: { user_id: string; status: string;  }) => {
    try {
        const { data } = await api.post(
            `/user/update-user-status`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (error: any) {
        const msg =
            error.response?.data?.message ||
            error.message ||
            "Failed to update payment status";
        throw new Error(msg);
    }
};

export const updateUserNotification = async (
  token: string,
  body: { title: string; message: string; type: string; user_id: string }
) => {
  try {
    const formData = new FormData();
    formData.append("title", body.title);
    formData.append("message", body.message);
    formData.append("type", body.type);
    formData.append("user_id", body.user_id);

    const { data } = await api.post("/notifications", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Failed to send notification";
    throw new Error(msg);
  }
};




export const getUserAddressVerificationDetails = async (token: string, query: string = "",) => {
    try {
        const { data } = await api.get(`https://api.onnbit.com/api/address/get-address-verification`, {
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