import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, PackageCheck } from "lucide-react";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Button from "@/shared/components/button/Button.tsx";
import TripBookingCard from "@/features/trips/components/TripBookingCard/TripBookingCard.tsx";
import ConfirmCodePopup from "@/features/booking/components/ConfirmCodePopup/ConfirmCodePopup.tsx";
import useTripBookingsQuery from "@/features/trips/hooks/useTripBookingsQuery.ts";
import useConfirmPickup from "@/features/booking/hooks/useConfirmPickup.ts";
import useCompleteBooking from "@/features/booking/hooks/useCompleteBooking.ts";
import { tripDetailsPath } from "@/app/routes/paths.ts";
import type { TripBookingDto } from "@/shared/types";

type CodeAction = {
    type: "pickup" | "complete";
    booking: TripBookingDto;
};

function isPickedUp(booking: TripBookingDto): boolean {
    return booking.parcel?.state != null && booking.parcel.state !== "BOOKED";
}

export default function TripBookingsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { bookings, isLoading } = useTripBookingsQuery(id);
    const { confirmPickup, isLoading: isConfirmingPickup } = useConfirmPickup(id);
    const { completeBooking, isLoading: isCompleting } = useCompleteBooking(id);
    const [codeAction, setCodeAction] = useState<CodeAction | null>(null);

    const acceptedBookings = bookings.filter(
        (booking) => booking.state === "ACCEPTED" || booking.state === "COMPLETED",
    );

    async function handleConfirmCode(code: string) {
        const bookingId = codeAction?.booking.bookingId;
        if (!bookingId) return;
        const success = codeAction?.type === "pickup"
            ? await confirmPickup(bookingId, code)
            : await completeBooking(bookingId, code);
        if (success) setCodeAction(null);
    }

    return (
        <Container gap={30} maxWidth={1000} margin="0 auto" padding={20}>
            <Container direction="row" align="center" gap={14}>
                <Button
                    iconOnly
                    variant="ghost"
                    icon={<ArrowLeft size={18} />}
                    ariaLabel="Retour au trajet"
                    onClick={() => navigate(tripDetailsPath(id ?? ""))}
                />
                <Text tag="h1" weight="bold" size={2}>Réservations acceptées</Text>
            </Container>

            {isLoading && (
                <Container direction="row" align="center" justify="center" padding="40px 0">
                    <Spinner />
                </Container>
            )}

            {!isLoading && acceptedBookings.length === 0 && (
                <Container align="center" justify="center" gap={6} padding="70px 20px" style={{ textAlign: "center" }}>
                    <PackageCheck size={60} />
                    <Text tag="h3" weight="bold">Aucune réservation acceptée</Text>
                    <Text tag="p" muted align="center" maxWidth={360}>
                        Les demandes que vous acceptez apparaîtront ici.
                    </Text>
                </Container>
            )}

            {!isLoading && acceptedBookings.length > 0 && (
                <Container gap={12}>
                    {acceptedBookings.map((booking) => {
                        const isActive = codeAction?.booking.bookingId === booking.bookingId;
                        const canAct = booking.state === "ACCEPTED";
                        return (
                            <TripBookingCard
                                key={booking.bookingId}
                                booking={booking}
                                onConfirmPickup={canAct && !isPickedUp(booking) ? () => setCodeAction({ type: "pickup", booking }) : undefined}
                                isConfirmingPickup={isActive && codeAction?.type === "pickup" && isConfirmingPickup}
                                onCompleteDelivery={canAct && isPickedUp(booking) ? () => setCodeAction({ type: "complete", booking }) : undefined}
                                isCompletingDelivery={isActive && codeAction?.type === "complete" && isCompleting}
                            />
                        );
                    })}
                </Container>
            )}

            {codeAction && (
                <ConfirmCodePopup
                    title={codeAction.type === "pickup" ? "Confirmer la récupération" : "Confirmer la livraison"}
                    description={
                        codeAction.type === "pickup"
                            ? "Demandez le code de retrait à l'expéditeur."
                            : "Demandez le code de livraison au destinataire."
                    }
                    confirmLabel={codeAction.type === "pickup" ? "Confirmer" : "Terminer"}
                    isLoading={codeAction.type === "pickup" ? isConfirmingPickup : isCompleting}
                    onConfirm={handleConfirmCode}
                    onClose={() => setCodeAction(null)}
                />
            )}
        </Container>
    );
}
