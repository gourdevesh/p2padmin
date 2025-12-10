// services/userService.ts

import api from "../api/api";
export const getSupportTicket = async (token: string, query: string = "",) => {
  try {
    const { data } = await api.get(`/support-tickets/get-tickets?${query}`, {
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
export const disputeOpened = async (payload: any, token: string) => {
  try {
    const { data } = await api.post(`/support/dispute-open`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Failed to send dispute opened email";

    throw new Error(msg);
  }
};

export const sendEvidenceRequired = async (payload: {
  trade_id: string;
  user_id: string;
  evidence_deadline_hours?: number;
}) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Auth token not found");

    const response = await api.post("/support/evidence-required", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // response.data will contain whatever your backend sends, e.g.:
    // { status: true, message: "Evidence required email sent successfully." }
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
export const adminResolveDispute = async (payload: any) => {
  console.log("payload", payload)
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Auth token not found");
  // check if it should be /support/resolve-dispute
  const response = await api.post("/support/resove-dispute", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });



  return response.data;
};

export const closeDisputeByAdmin = async (ticket_id: number, token: string) => {
  try {
    const payload = { ticket_id };

    const { data } = await api.post(
      "/support/close-dispute",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.error("Error in closeDisputeByAdmin:", error);

    // Backend ka message return / throw karo
    throw new Error(
      error?.response?.data?.message || "Failed to close dispute."
    );
  }
};

export const cancelTradeByAdmin = async (trade_id: number, token: string) => {
  try {
    const payload = { trade_id };

    const { data } = await api.post(
      "/trade/cancel-trade",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.error("Error in closeDisputeByAdmin:", error);

    // Backend ka message return / throw karo
    throw new Error(
      error?.response?.data?.message || "Failed to close dispute."
    );
  }
};
export const resertNewTrade = async (
  trade_id: number,
  tradeData: any,
  token: string
) => {
  try {
    const payload = {
      trade_id,
      ...tradeData,
    };

    const { data } = await api.post(
      "support/resart-new-trade",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    console.error("Error in resetNewTrade:", error);

    throw new Error(
      error?.response?.data?.message || "Failed to reset trade."
    );
  }
};

export const sendSystemMessageAPI = async (
  trade_id: number,
  user_id: number,
  token: string,
  message: string
) => {
  try {
    // Create the payload object
    const payload = {
      tradeId: trade_id,
      userId: user_id,
      message: message,
    };

    const { data } = await api.post("/trade/system-message", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    console.error("Error sending system message:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to send system message."
    );
  }
};