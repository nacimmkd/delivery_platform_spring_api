import { useMutation, useQueryClient } from "@tanstack/react-query";
import tripService from "@/features/trips/services/trip.service";

export default function useDeleteTripStop() {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ tripId, stopId }: { tripId: string; stopId: string }) => tripService.deleteStop(tripId, stopId),
        onSuccess: (_result, { tripId }) => {
            void queryClient.invalidateQueries({ queryKey: ["trip", tripId] });
        },
    });

    function deleteStop(tripId: string, stopId: string): Promise<boolean> {
        return mutation.mutateAsync({ tripId, stopId }).then(() => true).catch(() => false);
    }

    return { deleteStop, isLoading: mutation.isPending };
}
