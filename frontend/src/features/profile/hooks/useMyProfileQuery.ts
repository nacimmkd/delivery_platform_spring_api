import { useQuery } from "@tanstack/react-query";
import profileService from "@/features/profile/services/profile.service.ts";
import authStore from "@/features/auth/store/auth.store.ts";

export default function useMyProfileQuery() {
    const userId = authStore((s) => s.user?.userId);

    const query = useQuery({
        queryKey: ["profile", userId],
        queryFn: () => profileService.getProfileById(userId!),
        enabled: !!userId,
    });

    return {
        profile: query.data ?? null,
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
