import type { ParcelSummary } from "@/shared/types";

const PARCEL_STATE_LABELS: Record<NonNullable<ParcelSummary["state"]>, string> = {
    PUBLISHED: "Publié",
    BOOKED: "Réservé",
    PICKED_UP: "Récupéré",
    IN_TRANSIT: "En transit",
    DELIVERED: "Livré",
    CANCELLED: "Annulé",
};

export function parcelStateLabel(state?: ParcelSummary["state"]): string {
    return PARCEL_STATE_LABELS[state ?? "PUBLISHED"];
}
