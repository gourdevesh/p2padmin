// services/managepayment.ts

import api from "../api/api";
export const getPaymentDetail = async (token: string, query: string = "",) => {
    try {
        const { data } = await api.get(`/account-details/get-payment-details?${query}`, {
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

export const updatePaymentStatus = async (token: string, body: { id: number; status: string; remark?: string }) => {
    try {
        const { data } = await api.post(
            `/account-details/update-payment-details-status`,
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


export const getUpiDetail = async (token: string, query: string = "",) => {
    try {
        const { data } = await api.get(`/account-details/get-upi-details?${query}`, {
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

export const updateUpitStatus = async (token: string, body: { id: number; status: string; remark?: string }) => {
    try {
        const { data } = await api.post(
            `/account-details/update-upi-details-status`,
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