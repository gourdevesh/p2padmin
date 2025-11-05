import axios from "axios";
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

export const completeTrade = async (
    token: any,
    tradeId: string,
    amount: string
) => {
    try {
        const formData = new FormData();
        formData.append("trade_id", tradeId);
        formData.append("amount", amount);

        const { data } = await api.post("/trade/complete-requested-trade",
            formData,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return data;
    } catch (error: any) {
        const msg =
            error.response?.data?.message || error.message || "Failed to complete trade";
        throw new Error(msg);
    }
};

export const cancelTrade = async (tradeDto: any, token: string) => {
  try {
    const { data } = await axios.post("https://api.onnbit.com/api/trade/cancel-trade", tradeDto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Failed to cancel trade";
    throw new Error(msg);
  }
};