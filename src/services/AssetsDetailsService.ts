// services/userService.ts

import api from "../api/api";
export const getAssetsDetails = async (token: string, query: string = "",) => {
    try {
        const { data } = await api.get(`/admin-wallet/get-assets-details?${query}`, {
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
