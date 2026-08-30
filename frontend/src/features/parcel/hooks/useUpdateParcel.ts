import { useMutation, useQueryClient } from "@tanstack/react-query";
import parcelService from "@/features/parcel/services/parcel.service";
import type { ParcelDetails, ParcelUpdateRequest } from "@/shared/types";
import type { AppError } from "@/shared/types/AppError";

export default function useUpdateParcel() {

    const queryClient = useQueryClient();

    const mutation = useMutation<ParcelDetails, AppError, { id: string; data: ParcelUpdateRequest }>({
        mutationFn: ({ id, data }) => parcelService.updateParcel(id, data),
        onSuccess: (_result, { id }) => {
            void queryClient.invalidateQueries({ queryKey: ["parcels"] });
            void queryClient.invalidateQueries({ queryKey: ["parcel", id] });
        },
    });

    function updateParcel(id: string, data: ParcelUpdateRequest): Promise<ParcelDetails | null> {
        return mutation.mutateAsync({ id, data }).catch(() => null);
    }

    return {
        updateParcel,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}
