import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import paymentService from "@/features/payments/services/payment.service.ts";
import type { PaymentResponse } from "@/shared/types";
import type { AppError } from "@/shared/types/AppError";

export default function useCreateCheckout() {

    const mutation = useMutation<PaymentResponse, AppError, string>({
        mutationFn: (bookingId: string) => paymentService.createCheckoutSession(bookingId),
    });

    const createCheckout = useCallback((bookingId: string): Promise<PaymentResponse | null> =>
        mutation.mutateAsync(bookingId).catch(() => null), [mutation.mutateAsync]);

    return { createCheckout, isLoading: mutation.isPending, error: mutation.error };
}
