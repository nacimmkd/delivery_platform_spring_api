import { useMutation, useQueryClient } from "@tanstack/react-query";
import tripService from "@/features/trips/services/trip.service";
import type { AddressRequest } from "@/shared/types";

export default function useAddTripStop() {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ tripId, address }: { tripId: string; address: AddressRequest }) => tripService.addStop(tripId, address),
        onSuccess: (_result, { tripId }) => {
            void queryClient.invalidateQueries({ queryKey: ["trip", tripId] });
        },
    });

    function addStop(tripId: string, address: AddressRequest): Promise<boolean> {
        return mutation.mutateAsync({ tripId, address }).then(() => true).catch(() => false);
    }

    return { addStop, isLoading: mutation.isPending };
}
