import { useQuery } from "@tanstack/react-query";
import notificationService from "@/features/notifications/services/notification.service.ts";

export default function useNotificationsQuery() {

    const query = useQuery({
        queryKey: ["notifications"],
        queryFn: () => notificationService.getMyNotifications(),
    });

    const notifications = query.data ?? [];
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return {
        notifications,
        unreadCount,
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
