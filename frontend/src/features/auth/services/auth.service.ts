import api from "@/app/config/axios.config";
import type { AuthRequest, UserDetails } from "@/shared/types";

const authService = {

    async login(credentials: AuthRequest): Promise<UserDetails> {
        const res = await api.post<UserDetails>("/auth/login", credentials);
        return res.data;
    },

    async refresh(): Promise<void> {
        await api.post<UserDetails>("/auth/refresh");
    },

    async logout(): Promise<void> {
        await api.post("/auth/logout");
    },

    async getMe(): Promise<UserDetails> {
        const res = await api.get<UserDetails>("/auth/me");
        return res.data;
    }

};

export default authService;