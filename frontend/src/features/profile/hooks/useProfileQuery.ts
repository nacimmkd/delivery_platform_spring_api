import { useQuery } from "@tanstack/react-query";
import profileService from "@/features/profile/services/profile.service.ts";

export default function useProfileQuery(id?: string) {

    const query = useQuery({
        queryKey: ["profile", id],
        queryFn: () => profileService.getProfileById(id!),
        enabled: !!id,
    });

    return {
        profile: query.data ?? null,
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
