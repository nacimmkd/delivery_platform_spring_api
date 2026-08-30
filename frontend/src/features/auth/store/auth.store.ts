// store/auth.store.ts
import { create } from "zustand";
import type { UserDetails } from "@/shared/types";
import authService from "@/features/auth/services/auth.service";

type AuthState = {
    user: UserDetails | null;
    isAuthenticated: boolean;
    isVerified: boolean;
    isInitializing: boolean;
    setUser: (user: UserDetails | null) => void;
    hydrate: () => Promise<void>;
};

const authStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isVerified: false,
    isInitializing: true,

    setUser: (user) =>
        set({
            user,
            isAuthenticated: user !== null,
            isVerified: user?.emailVerified === true,
        }),

    hydrate: () => authService.getMe()
        .then((user) => set({ user, isAuthenticated: true, isVerified: user.emailVerified === true }))
        .catch(() => set({ user: null, isAuthenticated: false, isVerified: false }))
        .finally(() => set({ isInitializing: false })),
}));

export default authStore;