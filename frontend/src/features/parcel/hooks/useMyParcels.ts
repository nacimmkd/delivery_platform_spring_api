import { useInfiniteQuery } from "@tanstack/react-query";
import parcelService from "@/features/parcel/services/parcel.service";
import type { AppError } from "@/shared/types/AppError";
import type { PageParcelSummary } from "@/shared/types";

const PAGE_SIZE = 3;

export default function useMyParcels() {

    const query = useInfiniteQuery<PageParcelSummary, AppError>({
        queryKey: ["parcels", "mine"],
        queryFn: ({ pageParam }) => parcelService.getMyParcels(pageParam as number, PAGE_SIZE),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => (lastPage.last ? undefined : (lastPage.number ?? 0) + 1),
    });

    const parcels = query.data?.pages.flatMap((page) => page.content ?? []) ?? [];

    return {
        parcels,
        isLoading: query.isLoading,
        error: query.error,
        hasMore: query.hasNextPage,
        isLoadingMore: query.isFetchingNextPage,
        loadMore: query.fetchNextPage,
    };
}
