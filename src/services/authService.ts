import api from "../api/api";

export interface LoginResponse {
    status: boolean;
    message: string;
    token?: string;
    user?: {
        id: string;
        name: string;
        email: string;
    };
}


export const login = async (
    username: string,
    password: string
): Promise<LoginResponse> => {
    try {
        const { data } = await api.post<LoginResponse>("/auth/login", {
            username,
            password,
        });
        return data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return error.response.data as LoginResponse;
        }
        return { status: false, message: error.message || "Something went wrong" };
    }
};

export const logout = async () => {
    localStorage.removeItem("authToken");
};
