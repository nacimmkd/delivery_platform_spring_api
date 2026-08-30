import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Pencil, SearchX, Trash2 } from "lucide-react";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Button from "@/shared/components/button/Button.tsx";
import TripOverview from "@/features/trips/components/TripOverview/TripOverview.tsx";
import TripItinerary from "@/features/trips/components/TripItinerary/TripItinerary.tsx";
import Confirmation from "@/shared/components/confirmation/Confirmation.tsx";
import useTripQuery from "@/features/trips/hooks/useTripQuery.ts";
import useDeleteTrip from "@/features/trips/hooks/useDeleteTrip.ts";
import { paths, tripBookingsPath, tripEditPath, tripRequestsPath } from "@/app/routes/paths.ts";
import formatDate from "@/shared/utils/formatDate.ts";

export default function TripDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { trip, isError } = useTripQuery(id);
    const { deleteTrip, isLoading: isDeleting } = useDeleteTrip();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    if (isError) {
        return (
            <Container gap={30} maxWidth={1000} margin="0 auto" padding={20}>
                <Container align="center" justify="center" gap={6} padding="70px 20px" style={{ textAlign: "center" }}>
                    <SearchX size={60} />
                    <Text tag="h3" weight="bold">Trajet introuvable</Text>
                    <Text tag="p" muted align="center" maxWidth={360}>
                        Ce trajet n'existe plus ou a été supprimé.
                    </Text>
                    <Button to={paths.trips} label="Mes trajets" variant="main" style={{ marginTop: 18 }} />
                </Container>
            </Container>
        );
    }

    if (!trip) {
        return (
            <Container direction="row" align="center" justify="center" minHeight="40vh">
                <Spinner />
            </Container>
        );
    }

    const canDelete = trip.state === "PUBLISHED";

    async function handleConfirmDelete() {
        const success = await deleteTrip(trip?.tripId ?? "");
        if (success) navigate(paths.trips);
    }

    return (
        <Container gap={30} maxWidth={1000} margin="0 auto" padding={20}>
            <Container direction="row" align="start" justify="space-between" gap={20} stackOnMobile>
                <Container gap={6}>
                    <Text tag="h1" weight="bold" size={2}>
                        {trip.departureAddress?.city} → {trip.arrivalAddress?.city}
                    </Text>
                    {trip.publishedAt && (
                        <Text tag="p" muted size={0.85}>Publié le {formatDate(trip.publishedAt)}</Text>
                    )}
                </Container>

                <Container direction="row" align="center" justify={"end"} gap={10}>
                    <Button
                        to={tripEditPath(trip.tripId ?? "")}
                        iconOnly
                        variant="ghost"
                        size="md"
                        icon={<Pencil size={18} />}
                        ariaLabel="Modifier le trajet"
                    />
                    {canDelete && (
                        <Button
                            iconOnly
                            variant="ghost"
                            size="md"
                            icon={<Trash2 size={18} />}
                            ariaLabel="Supprimer le trajet"
                            onClick={() => setIsConfirmOpen(true)}
                        />
                    )}
                </Container>
            </Container>

            <TripOverview
                state={trip.state}
                pricePerKg={trip.pricePerKg}
                estimatedEarning={trip.estimatedEarning}
                availableWeightKg={trip.availableWeightKg}
                remainingWeightKg={trip.remainingWeightKg}
                maxDetourKm={trip.maxDetourKm}
                instantBooking={trip.instantBooking}
                notes={trip.notes}
            />

            <TripItinerary
                departure={trip.departureAddress}
                arrival={trip.arrivalAddress}
                departureDate={trip.departureDate}
                arrivalDate={trip.arrivalDate}
                stops={trip.stops ?? []}
            />

            <Container gap={12}>
                <Button
                    to={tripRequestsPath(trip.tripId ?? "")}
                    label={`Nouvelles demandes (${trip.newRequestCount ?? 0})`}
                    variant="secondary"
                    size="lg"
                    fullWidth
                    icon={<ArrowRight size={18} />}
                    iconPosition="right"
                    style={{ justifyContent: "space-between" }}
                />
                <Button
                    to={tripBookingsPath(trip.tripId ?? "")}
                    label={`Gérer les réservations (${trip.acceptedBookingsCount ?? 0})`}
                    variant="secondary"
                    size="lg"
                    fullWidth
                    icon={<ArrowRight size={18} />}
                    iconPosition="right"
                    style={{ justifyContent: "space-between" }}
                />
            </Container>

            {isConfirmOpen && (
                <Confirmation
                    type="delete"
                    title="Supprimer ce trajet ?"
                    description="Cette action est irréversible. Le trajet sera définitivement supprimé."
                    onConfirm={handleConfirmDelete}
                    onClose={() => setIsConfirmOpen(false)}
                    isLoading={isDeleting}
                />
            )}
        </Container>
    );
}
