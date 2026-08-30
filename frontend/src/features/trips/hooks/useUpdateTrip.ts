import { useMutation, useQueryClient } from "@tanstack/react-query";
import tripService from "@/features/trips/services/trip.service";
import type { TripDetails, TripUpdateRequest } from "@/shared/types";
import type { AppError } from "@/shared/types/AppError";

export default function useUpdateTrip() {

    const queryClient = useQueryClient();

    const mutation = useMutation<TripDetails, AppError, { id: string; data: TripUpdateRequest }>({
        mutationFn: ({ id, data }) => tripService.updateTrip(id, data),
        onSuccess: (_result, { id }) => {
            void queryClient.invalidateQueries({ queryKey: ["trips"] });
            void queryClient.invalidateQueries({ queryKey: ["trip", id] });
        },
    });

    function updateTrip(id: string, data: TripUpdateRequest): Promise<TripDetails | null> {
        return mutation.mutateAsync({ id, data }).catch(() => null);
    }

    return {
        updateTrip,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}
