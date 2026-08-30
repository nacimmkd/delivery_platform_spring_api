import { useNavigate, useParams } from "react-router-dom";
import TripForm from "@/features/trips/components/TripForm/TripForm.tsx";
import useTripQuery from "@/features/trips/hooks/useTripQuery.ts";
import useUpdateTrip from "@/features/trips/hooks/useUpdateTrip.ts";
import { paths } from "@/app/routes/paths.ts";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import type { Address, AddressRequest, TripCreateRequest } from "@/shared/types";

function toAddressRequest(address?: Address): AddressRequest {
    return {
        street: address?.street ?? "",
        city: address?.city ?? "",
        postalCode: address?.postalCode ?? "",
        country: address?.country ?? "France",
    };
}

export default function EditTripPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { trip, isError: notFound } = useTripQuery(id);
    const { updateTrip, isLoading, error } = useUpdateTrip();

    async function handleSubmit(data: TripCreateRequest) {
        if (!id) return;
        const updated = await updateTrip(id, {
            ...data,
            availableWeightKg: data.availableWeightKg ?? 0,
            notes: data.notes ?? "",
        });
        if (updated) {
            navigate(paths.trips);
        }
    }

    if (notFound) {
        return (
            <Container direction="row" align="center" justify="center" maxWidth={1200} margin="0 auto" padding={20} minHeight="40vh">
                <Text tag="p" align="center">Trajet introuvable.</Text>
            </Container>
        );
    }

    if (!trip) {
        return (
            <Container direction="row" align="center" justify="center" maxWidth={1200} margin="0 auto" padding={20} minHeight="40vh">
                <Spinner />
            </Container>
        );
    }

    return (
        <Container direction="row" align="center" justify="center" maxWidth={1200} margin="0 auto" padding={20} minHeight="40vh">
            <TripForm
                heading="Modifier le trajet"
                subtitle="Mettez à jour les détails de votre trajet"
                submitLabel="Enregistrer les modifications"
                initialValues={{
                    departureAddress: toAddressRequest(trip.departureAddress),
                    arrivalAddress: toAddressRequest(trip.arrivalAddress),
                    departureDate: trip.departureDate ?? "",
                    arrivalDate: trip.arrivalDate ?? "",
                    availableWeightKg: trip.availableWeightKg,
                    pricePerKg: trip.pricePerKg,
                    instantBooking: trip.instantBooking ?? false,
                    maxDetourKm: trip.maxDetourKm,
                    notes: trip.notes,
                }}
                tripId={trip.tripId}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
                lockRoute={trip.state !== "PUBLISHED"}
            />
        </Container>
    );
}
