import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createStompClient } from "@/app/config/websocket.config.ts";
import type { NotificationDto } from "@/shared/types";

export default function useNotificationsSocket() {

    const queryClient = useQueryClient();

    useEffect(() => {
        const client = createStompClient();

        client.onConnect = () => {
            client.subscribe("/user/queue/notifications", (message) => {
                const notification = JSON.parse(message.body) as NotificationDto;

                queryClient.setQueryData<NotificationDto[]>(["notifications"], (old = []) => {
                    if (old.some((n) => n.notificationId === notification.notificationId)) return old;
                    return [notification, ...old];
                });
            });
        };

        client.activate();

        return () => {
            void client.deactivate();
        };
    }, [queryClient]);
}
