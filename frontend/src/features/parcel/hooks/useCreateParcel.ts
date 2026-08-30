import { useMutation, useQueryClient } from "@tanstack/react-query";
import parcelService from "@/features/parcel/services/parcel.service";
import type { ParcelCreateRequest, ParcelDetails } from "@/shared/types";
import type { AppError } from "@/shared/types/AppError";

export default function useCreateParcel() {

    const queryClient = useQueryClient();

    const mutation = useMutation<ParcelDetails, AppError, ParcelCreateRequest>({
        mutationFn: (data) => parcelService.createParcel(data),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["parcels"] });
        },
    });

    function createParcel(data: ParcelCreateRequest): Promise<ParcelDetails | null> {
        return mutation.mutateAsync(data).catch(() => null);
    }

    return {
        createParcel,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}
