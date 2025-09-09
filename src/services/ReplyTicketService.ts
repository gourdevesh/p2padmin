// services/supportTicketService.ts

import api from "../api/api";

interface ReplySupportTicketPayload {
  ticket_id: number;
  message: string;
  attachments?: File[]; // multiple files
  token: string;
}

interface CloseSupportTicketPayload {
  ticket_id: number;
  token: string;
}

export const replySupportTicket = async (payload: ReplySupportTicketPayload) => {
  const formData = new FormData();
  formData.append("ticket_id", payload.ticket_id.toString());
  formData.append("message", payload.message);

  if (payload.attachments && payload.attachments.length > 0) {
    payload.attachments.forEach((file) => {
      formData.append("attachment[]", file);
    });
  }

  try {
    const response = await api.post("/support-tickets/reply-support-ticket",
      formData,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error replying to support ticket:", error.response || error);
    throw error;
  }
};

export const closeSupportTicket = async (payload: CloseSupportTicketPayload) => {
  const formData = new FormData();
  formData.append("ticket_id", payload.ticket_id.toString());

  try {
    const response = await api.post(
      "/support-tickets/close-ticket",
      formData,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error closing support ticket:", error.response || error);
    throw error;
  }
};