import {bookingDetailsPath, parcelDetailsPath, tripDetailsPath, tripRequestsPath} from "@/app/routes/paths.ts";
import type { NotificationDto } from "@/shared/types";

export default function notificationPath(notification: NotificationDto): string | undefined {
    if (!notification.referenceId) return undefined;

    switch (notification.type) {
        case "BOOKING_CREATED":
        case "BOOKING_CANCELED":
        case "BOOKING_COMPLETED":
        case "BOOKING_PAID":
            return bookingDetailsPath(notification.referenceId);
        case "TRIP_CANCELLED":
            return tripDetailsPath(notification.referenceId);
        case "PARCEL_DELIVERED":
            return parcelDetailsPath(notification.referenceId);
        case "REQUEST_RECEIVED":
            return tripRequestsPath(notification.referenceId);
        default:
            return undefined;
    }
}
