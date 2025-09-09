import api from "../api/api";
export const getTransactionDetails = async (token: string, query: string = "",) => {
    try {
        const { data } = await api.get(`/transaction/get-transaction-details?${query}`, {
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