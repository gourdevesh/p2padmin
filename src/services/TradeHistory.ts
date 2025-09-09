import api from "../api/api";
export const getTradeHistory = async (token: string, query: string = "",) => {
    try {
        const { data } = await api.get(`/trade/get-trade-history?${query}`, {
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