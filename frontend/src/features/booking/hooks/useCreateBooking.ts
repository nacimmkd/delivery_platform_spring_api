import { useMutation, useQueryClient } from "@tanstack/react-query";
import bookingService from "@/features/booking/services/booking.service.ts";
import type { BookingDto } from "@/shared/types";

export default function useCreateBooking() {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ tripId, parcelId }: { tripId: string; parcelId: string }) =>
            bookingService.createBooking({ tripId, parcelId }),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["parcels"] });
            void queryClient.invalidateQueries({ queryKey: ["trips"] });
        },
    });

    function createBooking(tripId: string, parcelId: string): Promise<BookingDto | null> {
        return mutation.mutateAsync({ tripId, parcelId }).catch(() => null);
    }

    return { createBooking, isLoading: mutation.isPending, error: mutation.error };
}
