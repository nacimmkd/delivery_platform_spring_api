import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import userService from "@/features/auth/services/user.service";
import type { RequestEmailVerification, VerifyEmailRequest } from "@/shared/types";
import type { AppError } from "@/shared/types/AppError";

export default function useVerifyEmail() {

    const requestMutation = useMutation<void, AppError, RequestEmailVerification>({
        mutationFn: (data) => userService.requestEmailVerification(data),
    });

    const verifyMutation = useMutation<void, AppError, VerifyEmailRequest>({
        mutationFn: (data) => userService.verifyEmail(data),
    });

    const requestEmailVerification = useCallback((data: RequestEmailVerification): Promise<boolean> =>
        requestMutation.mutateAsync(data).then(() => true).catch(() => false), [requestMutation]);

    const verifyEmail = useCallback((data: VerifyEmailRequest): Promise<boolean> =>
        verifyMutation.mutateAsync(data).then(() => true).catch(() => false), [verifyMutation]);

    return {
        requestEmailVerification,
        verifyEmail,
        isLoading: requestMutation.isPending || verifyMutation.isPending,
        error: requestMutation.error ?? verifyMutation.error,
    };
}
