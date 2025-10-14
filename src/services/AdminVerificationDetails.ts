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

export const updatEverifyAddress = async (token: string, body: { id: number; status: string; remark?: string }) => {
    try {
        const { data } = await api.post(
            `/verification/verify-address`,
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

export const idVerificationDetails = async (token: string, body: { id: number; status: string; remark?: string }) => {
    try {
        const { data } = await api.post(
            `/verification/verify-id`,
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