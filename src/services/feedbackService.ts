// src/services/feedbackService.ts
import api from "../api/api";

// Get Feedback
export const getFeedBack = async (token: string, query: string = "") => {
  try {
    const { data } = await api.get(`/feedback/get-feedback?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
 throw error
  }
};

// Create Feedback
export const createFeedBack = async (
  token: string,
  feedback: { user_id: number; likeDislike: "like" | "dislike"; review: string }
) => {
  try {
    const formData = new FormData();
    formData.append("user_id", feedback.user_id.toString());
    formData.append("likeDislike", feedback.likeDislike);
    formData.append("review", feedback.review);

    const { data } = await api.post("/feedback/create-feedback", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error: any) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Failed to create feedback";
    throw new Error(msg);
  }
};
