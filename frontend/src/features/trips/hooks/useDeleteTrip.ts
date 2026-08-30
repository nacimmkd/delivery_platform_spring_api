import { useMutation, useQueryClient } from "@tanstack/react-query";
import tripService from "@/features/trips/services/trip.service";

export default function useDeleteTrip() {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => tripService.deleteTrip(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["trips"] });
        },
    });

    function deleteTrip(id: string): Promise<boolean> {
        return mutation.mutateAsync(id).then(() => true).catch(() => false);
    }

    return { deleteTrip, isLoading: mutation.isPending };
}
