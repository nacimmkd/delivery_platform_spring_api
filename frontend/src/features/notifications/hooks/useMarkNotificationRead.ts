import { useMutation, useQueryClient } from "@tanstack/react-query";
import notificationService from "@/features/notifications/services/notification.service.ts";

export default function useMarkNotificationRead() {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => notificationService.markAsRead(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });

    function markAsRead(id: string): Promise<boolean> {
        return mutation.mutateAsync(id).then(() => true).catch(() => false);
    }

    return { markAsRead, isLoading: mutation.isPending };
}
