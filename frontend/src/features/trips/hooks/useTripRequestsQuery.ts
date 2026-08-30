import { useQuery } from "@tanstack/react-query";
import tripService from "@/features/trips/services/trip.service";

export default function useTripRequestsQuery(tripId?: string) {

    const query = useQuery({
        queryKey: ["trip", tripId, "requests"],
        queryFn: () => tripService.getTripRequests(tripId!),
        enabled: !!tripId,
    });

    return {
        requests: query.data?.content ?? [],
        isLoading: query.isLoading,
    };
}
