import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import userService from "@/features/auth/services/user.service";
import type { RequestPasswordReset, ResetPasswordRequest } from "@/shared/types";
import type { AppError } from "@/shared/types/AppError";

export default function usePasswordReset() {

    const requestMutation = useMutation<void, AppError, RequestPasswordReset>({
        mutationFn: (data) => userService.requestPasswordReset(data),
    });

    const resetMutation = useMutation<void, AppError, ResetPasswordRequest>({
        mutationFn: (data) => userService.resetPassword(data),
    });

    const requestPasswordReset = useCallback((data: RequestPasswordReset): Promise<boolean> =>
        requestMutation.mutateAsync(data).then(() => true).catch(() => false), [requestMutation]);

    const resetPassword = useCallback((data: ResetPasswordRequest): Promise<boolean> =>
        resetMutation.mutateAsync(data).then(() => true).catch(() => false), [resetMutation]);

    return {
        requestPasswordReset,
        resetPassword,
        isLoading: requestMutation.isPending || resetMutation.isPending,
        error: requestMutation.error ?? resetMutation.error,
    };
}
