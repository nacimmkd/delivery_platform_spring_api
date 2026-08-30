import { useQuery } from "@tanstack/react-query";
import bookingService from "@/features/booking/services/booking.service.ts";

export default function useBookingQuery(id?: string) {

    const query = useQuery({
        queryKey: ["booking", id],
        queryFn: () => bookingService.getBooking(id!),
        enabled: !!id,
    });

    return {
        booking: query.data ?? null,
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
