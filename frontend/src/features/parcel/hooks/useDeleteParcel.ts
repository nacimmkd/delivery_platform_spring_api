import { useMutation, useQueryClient } from "@tanstack/react-query";
import parcelService from "@/features/parcel/services/parcel.service";

export default function useDeleteParcel() {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => parcelService.deleteParcel(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["parcels"] });
        },
    });

    function deleteParcel(id: string): Promise<boolean> {
        return mutation.mutateAsync(id).then(() => true).catch(() => false);
    }

    return { deleteParcel, isLoading: mutation.isPending };
}
