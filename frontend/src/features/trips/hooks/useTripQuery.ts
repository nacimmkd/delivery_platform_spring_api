import { useQuery } from "@tanstack/react-query";
import tripService from "@/features/trips/services/trip.service";

export default function useTripQuery(id?: string) {

    const query = useQuery({
        queryKey: ["trip", id],
        queryFn: () => tripService.getTrip(id!),
        enabled: !!id,
    });

    return {
        trip: query.data ?? null,
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
