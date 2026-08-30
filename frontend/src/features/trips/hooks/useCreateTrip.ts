import { useMutation, useQueryClient } from "@tanstack/react-query";
import tripService from "@/features/trips/services/trip.service";
import type { TripCreateRequest, TripDetails } from "@/shared/types";
import type { AppError } from "@/shared/types/AppError";

export default function useCreateTrip() {

    const queryClient = useQueryClient();

    const mutation = useMutation<TripDetails, AppError, TripCreateRequest>({
        mutationFn: (data) => tripService.createTrip(data),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["trips"] });
        },
    });

    function createTrip(data: TripCreateRequest): Promise<TripDetails | null> {
        return mutation.mutateAsync(data).catch(() => null);
    }

    return {
        createTrip,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}
