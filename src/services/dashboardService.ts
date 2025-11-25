// services/userService.ts

import api from "../api/api";
export const getDashboardDetails = async (token: string) => {
    try {
        const { data } = await api.get("/dashboard", {
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
