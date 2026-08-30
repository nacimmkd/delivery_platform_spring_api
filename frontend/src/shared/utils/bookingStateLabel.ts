type BookingState = "PENDING" | "WAITING_FOR_ANSWER" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "COMPLETED";

const BOOKING_STATE_LABELS: Record<BookingState, string> = {
    PENDING: "En attente",
    WAITING_FOR_ANSWER: "En attente de réponse",
    ACCEPTED: "Acceptée",
    REJECTED: "Refusée",
    CANCELLED: "Annulée",
    COMPLETED: "Terminée",
};

export default function bookingStateLabel(state?: BookingState): string {
    return BOOKING_STATE_LABELS[state ?? "PENDING"];
}
