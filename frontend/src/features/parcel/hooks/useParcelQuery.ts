import { useQuery } from "@tanstack/react-query";
import parcelService from "@/features/parcel/services/parcel.service";

export default function useParcelQuery(id?: string) {

    const query = useQuery({
        queryKey: ["parcel", id],
        queryFn: () => parcelService.getParcel(id!),
        enabled: !!id,
    });

    return {
        parcel: query.data?.parcel ?? null,
        bookings: query.data?.bookings ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
