import { useMutation } from "@tanstack/react-query";
import type { AppError } from "@/shared/types/AppError";
import type { MatchResultDto } from "@/shared/types";
import matchingService from "@/features/matching/services/matching.service.ts";

export default function useMatching() {

    const mutation = useMutation<MatchResultDto[], AppError, { parcelId: string; date: string; sort?: string }>({
        mutationFn: ({ parcelId, date, sort }) => matchingService.match(parcelId, date, sort),
    });

    function search(parcelId: string, date: string, sort?: string): Promise<MatchResultDto[] | null> {
        return mutation.mutateAsync({ parcelId, date, sort }).catch(() => null);
    }

    return {
        search,
        matches: Array.isArray(mutation.data) ? mutation.data : [],
        isLoading: mutation.isPending,
        error: mutation.error,
        hasSearched: mutation.status !== "idle",
    };
}
