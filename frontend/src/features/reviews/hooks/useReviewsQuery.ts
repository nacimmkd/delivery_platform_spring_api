import { useQuery } from "@tanstack/react-query";
import reviewsService from "@/features/reviews/services/reviews.service.ts";

export default function useReviewsQuery(revieweeId?: string) {

    const query = useQuery({
        queryKey: ["reviews", revieweeId],
        queryFn: () => reviewsService.getUserReviews(revieweeId!),
        enabled: !!revieweeId,
    });

    return {
        reviews: query.data?.content ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
