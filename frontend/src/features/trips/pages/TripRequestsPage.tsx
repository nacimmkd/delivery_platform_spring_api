import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Inbox } from "lucide-react";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Button from "@/shared/components/button/Button.tsx";
import TripBookingCard from "@/features/trips/components/TripBookingCard/TripBookingCard.tsx";
import RejectBookingPopup from "@/features/booking/components/RejectBookingPopup/RejectBookingPopup.tsx";
import useTripRequestsQuery from "@/features/trips/hooks/useTripRequestsQuery.ts";
import useAcceptBooking from "@/features/booking/hooks/useAcceptBooking.ts";
import useRejectBooking from "@/features/booking/hooks/useRejectBooking.ts";
import { tripDetailsPath } from "@/app/routes/paths.ts";
import type { TripBookingDto } from "@/shared/types";

export default function TripRequestsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { requests: pendingBookings, isLoading } = useTripRequestsQuery(id);
    const { acceptBooking, isLoading: isAccepting } = useAcceptBooking(id);
    const { rejectBooking, isLoading: isRejecting } = useRejectBooking(id);
    const [rejectTarget, setRejectTarget] = useState<TripBookingDto | null>(null);
    const [processingId, setProcessingId] = useState<string | null>(null);

    async function handleAccept(bookingId?: string) {
        if (!bookingId) return;
        setProcessingId(bookingId);
        await acceptBooking(bookingId);
        setProcessingId(null);
    }

    async function handleRejectConfirm(reason: string) {
        const bookingId = rejectTarget?.bookingId;
        if (!bookingId) return;
        setProcessingId(bookingId);
        const success = await rejectBooking(bookingId, reason);
        setProcessingId(null);
        if (success) setRejectTarget(null);
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
                <Text tag="h1" weight="bold" size={2}>Nouvelles demandes</Text>
            </Container>

            {isLoading && (
                <Container direction="row" align="center" justify="center" padding="40px 0">
                    <Spinner />
                </Container>
            )}

            {!isLoading && pendingBookings.length === 0 && (
                <Container align="center" justify="center" gap={6} padding="70px 20px" style={{ textAlign: "center" }}>
                    <Inbox size={60} />
                    <Text tag="h3" weight="bold">Aucune nouvelle demande</Text>
                    <Text tag="p" muted align="center" maxWidth={360}>
                        Vous serez notifié dès qu'un expéditeur demandera à réserver ce trajet.
                    </Text>
                </Container>
            )}

            {!isLoading && pendingBookings.length > 0 && (
                <Container gap={12}>
                    {pendingBookings.map((booking) => (
                        <TripBookingCard
                            key={booking.bookingId}
                            booking={booking}
                            onAccept={() => handleAccept(booking.bookingId)}
                            onReject={() => setRejectTarget(booking)}
                            isAccepting={processingId === booking.bookingId && isAccepting}
                            isRejecting={processingId === booking.bookingId && isRejecting}
                        />
                    ))}
                </Container>
            )}

            {rejectTarget && (
                <RejectBookingPopup
                    isLoading={processingId === rejectTarget.bookingId && isRejecting}
                    onConfirm={handleRejectConfirm}
                    onClose={() => setRejectTarget(null)}
                />
            )}
        </Container>
    );
}
