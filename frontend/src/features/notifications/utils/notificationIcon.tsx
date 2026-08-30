import {
    Ban,
    CalendarPlus,
    CircleCheckBig,
    CreditCard,
    Inbox,
    KeyRound,
    MailCheck,
    MessageCircle,
    PackageCheck,
    PartyPopper,
} from "lucide-react";
import type { NotificationDto } from "@/shared/types";

type NotificationType = NonNullable<NotificationDto["type"]>;

const NOTIFICATION_ICON: Record<NotificationType, React.ReactNode> = {
    VERIFY_USER: <MailCheck size={18} />,
    RESET_PASSWORD: <KeyRound size={18} />,
    USER_CREATED: <PartyPopper size={18} />,
    MESSAGE_RECEIVED: <MessageCircle size={18} />,
    REQUEST_RECEIVED: <Inbox size={18} />,
    BOOKING_CREATED: <CalendarPlus size={18} />,
    BOOKING_CANCELED: <Ban size={18} />,
    BOOKING_COMPLETED: <CircleCheckBig size={18} />,
    BOOKING_PAID: <CreditCard size={18} />,
    TRIP_CANCELLED: <Ban size={18} />,
    PARCEL_DELIVERED: <PackageCheck size={18} />,
};

export default function notificationIcon(notification: NotificationDto): React.ReactNode {
    if (!notification.type) return <Inbox size={18} />;
    return NOTIFICATION_ICON[notification.type];
}
