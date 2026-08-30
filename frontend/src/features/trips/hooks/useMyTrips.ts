import { useQuery } from "@tanstack/react-query";
import tripService from "@/features/trips/services/trip.service";
import type { AppError } from "@/shared/types/AppError";
import type { PageTripSummary } from "@/shared/types";

export default function useMyTrips() {

    const query = useQuery<PageTripSummary, AppError>({
        queryKey: ["trips", "mine"],
        queryFn: () => tripService.getMyTrips(),
    });

    return {
        trips: query.data?.content ?? [],
        isLoading: query.isLoading,
        error: query.error,
    };
}
