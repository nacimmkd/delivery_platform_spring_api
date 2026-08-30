import { useMutation, useQueryClient } from "@tanstack/react-query";
import reviewsService from "@/features/reviews/services/reviews.service.ts";
import type { CreateReviewRequest, ReviewDto } from "@/shared/types";
import type { AppError } from "@/shared/types/AppError";

export default function useCreateReview() {

    const queryClient = useQueryClient();

    const mutation = useMutation<ReviewDto, AppError, CreateReviewRequest>({
        mutationFn: (data) => reviewsService.createReview(data),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });

    function createReview(data: CreateReviewRequest): Promise<boolean> {
        return mutation.mutateAsync(data).then(() => true).catch(() => false);
    }

    return {
        createReview,
        isLoading: mutation.isPending,
        error: mutation.error,
    };
}
