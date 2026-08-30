import { useMutation, useQueryClient } from "@tanstack/react-query";
import profileService from "@/features/profile/services/profile.service.ts";
import authStore from "@/features/auth/store/auth.store.ts";
import type { ProfileDto, ProfileUpdateRequest } from "@/shared/types";
import type { AppError } from "@/shared/types/AppError";

export default function useUpdateProfile() {

    const queryClient = useQueryClient();
    const userId = authStore((s) => s.user?.userId);

    const mutation = useMutation<ProfileDto, AppError, ProfileUpdateRequest>({
        mutationFn: (data) => profileService.updateProfile(data),
        onSuccess: (profile) => {
            queryClient.setQueryData(["profile", userId], profile);
        },
    });

    function updateProfile(data: ProfileUpdateRequest): Promise<ProfileDto | null> {
        return mutation.mutateAsync(data).catch(() => null);
    }

    return {
        updateProfile,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}
