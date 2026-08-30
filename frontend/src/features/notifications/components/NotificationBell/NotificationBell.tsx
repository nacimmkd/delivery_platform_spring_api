import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import styles from "./NotificationBell.module.css";
import Menu from "@/shared/components/menu/Menu.tsx";
import MenuItem from "@/shared/components/menu/MenuItem.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import useClickOutside from "@/shared/hooks/useClickOutside.ts";
import useNotificationsQuery from "@/features/notifications/hooks/useNotificationsQuery.ts";
import useNotificationsSocket from "@/features/notifications/hooks/useNotificationsSocket.ts";
import useMarkNotificationRead from "@/features/notifications/hooks/useMarkNotificationRead.ts";
import notificationText from "@/features/notifications/utils/notificationText.ts";
import notificationPath from "@/features/notifications/utils/notificationPath.ts";
import notificationIcon from "@/features/notifications/utils/notificationIcon.tsx";
import type { NotificationDto } from "@/shared/types";

export default function NotificationBell() {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { notifications, unreadCount, isLoading } = useNotificationsQuery();
    const { markAsRead } = useMarkNotificationRead();

    useNotificationsSocket();
    useClickOutside(containerRef, () => setIsOpen(false));

    function handleSelect(notification: NotificationDto) {
        if (!notification.isRead && notification.notificationId) {
            void markAsRead(notification.notificationId);
        }
        setIsOpen(false);

        const path = notificationPath(notification);
        if (path) navigate(path);
    }

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.trigger} onClick={() => setIsOpen((v) => !v)}>
                <Bell size={24} color="white" />
                {unreadCount > 0 && <span className={styles.badge}>{unreadCount > 9 ? "9+" : unreadCount}</span>}
            </div>

            <Menu isOpen={isOpen} className={styles.dropdown}>
                <Text tag="h4" weight="semibold" className={styles.title}>Notifications</Text>

                {isLoading && (
                    <div className={styles.state}>
                        <Spinner />
                    </div>
                )}

                {!isLoading && notifications.length === 0 && (
                    <Text tag="p" muted size={0.85} className={styles.state}>Aucune notification.</Text>
                )}

                {!isLoading && notifications.map((notification) => (
                    <MenuItem
                        key={notification.notificationId}
                        label={notificationText(notification)}
                        icon={notificationIcon(notification)}
                        trailing={!notification.isRead ? <span className={styles.dot} /> : undefined}
                        onClick={() => handleSelect(notification)}
                    />
                ))}
            </Menu>
        </div>
    );
}
