import { useQuery } from "@tanstack/react-query";
import tripService from "@/features/trips/services/trip.service";

export default function useTripBookingsQuery(tripId?: string) {

    const query = useQuery({
        queryKey: ["trip", tripId, "bookings"],
        queryFn: () => tripService.getTripBookings(tripId!),
        enabled: !!tripId,
    });

    return {
        bookings: query.data?.content ?? [],
        isLoading: query.isLoading,
    };
}
