import { useMutation, useQueryClient } from "@tanstack/react-query";
import bookingService from "@/features/booking/services/booking.service.ts";

export default function useCancelBooking() {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => bookingService.cancelBooking(id),
        onSuccess: (_data, id) => {
            void queryClient.invalidateQueries({ queryKey: ["booking", id] });
        },
    });

    function cancelBooking(id: string): Promise<boolean> {
        return mutation.mutateAsync(id).then(() => true).catch(() => false);
    }

    return { cancelBooking, isLoading: mutation.isPending };
}
