// services/userService.ts

import api from "../api/api";
export const getAddressVerificationDetails = async (token: string, query: string = "",) => {
    try {
        const { data } = await api.get(`/verification/get-address-verification-details?${query}`, {
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

export const getVerificationDetails = async (token: string, query: string = "",) => {
    try {
        const { data } = await api.get(`/verification/get-id-verification-details?${query}`, {
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
