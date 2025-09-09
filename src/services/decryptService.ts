import api from "../api/api";

// 🔹 NEW function to decrypt payment details
export const decryptData = async (encryptedData: string, token: string) => {
    try {
        const formData = new FormData();
        formData.append("encryptedData", encryptedData);

        const { data } = await api.post(
            "/decrypt-data",
            formData,
            {
                headers: {
                    "accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`, // 🔹 token added here
                },
            }
        );
        return data;
    } catch (error: any) {
        const msg =
            error.response?.data?.message ||
            error.message ||
            "Failed to decrypt payment details";
        throw new Error(msg);
    }
};