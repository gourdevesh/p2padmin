import api from "../api/api";

interface UpdateProfilePayload {
    name: string;
    email: string;
    profileImage?: File | null;
}

export const updateProfile = async (
    token: string,
    payload: UpdateProfilePayload
) => {
    try {
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("email", payload.email);

        if (payload.profileImage) {
            formData.append("profile_image", payload.profileImage, payload.profileImage.name);
        }

        const { data } = await api.post("/profile/update-profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    } catch (error: any) {
        // Backend ka pura response throw karein taaki Formik handle kar sake
        if (error.response?.data) {
            throw error.response.data;
        } else {
            throw new Error(error.message || "Failed to update profile");
        }
    }
};

export const updatePassword = async (token: string, body: { current_password: number; new_password?: number }) => {
    try {
        const { data } = await api.post(
            `/profile/change-password`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (error: any) {
        if (error.response?.data) {
            throw error.response.data;
        } else {
            throw new Error(error.message || "Failed to update profile");
        }

    }
};