import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Button from "@/shared/components/button/Button.tsx";
import ParcelOverview from "@/features/parcel/components/ParcelOverview/ParcelOverview.tsx";
import ParcelTracking from "@/features/parcel/components/ParcelTracking/ParcelTracking.tsx";
import ParcelBookingCard from "@/features/parcel/components/ParcelBookingCard/ParcelBookingCard.tsx";
import Confirmation from "@/shared/components/confirmation/Confirmation.tsx";
import useParcelQuery from "@/features/parcel/hooks/useParcelQuery.ts";
import useDeleteParcel from "@/features/parcel/hooks/useDeleteParcel.ts";
import { paths, parcelEditPath } from "@/app/routes/paths.ts";

export default function ParcelDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { parcel, bookings, isLoading, isError } = useParcelQuery(id);
    const { deleteParcel, isLoading: isDeleting } = useDeleteParcel();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const canModifyOrDelete = parcel?.state === "PUBLISHED" || parcel?.state === "CANCELLED";

    if (isError) {
        return (
            <Container gap={30} maxWidth={1000} margin="0 auto" padding={20}>
                <Text tag="p" align="center">Colis introuvable.</Text>
            </Container>
        );
    }

    if (!parcel || isLoading) {
        return (
            <Container direction="row" align="center" justify="center" minHeight="40vh">
                <Spinner />
            </Container>
        );
    }

    const images = (parcel.images ?? [])
        .map((img) => img.url)
        .filter((url): url is string => url !== undefined);

    const actionStyle = { height: 42, minWidth: 120, boxSizing: "border-box" } as const;

    async function handleConfirmDelete() {
        const success = await deleteParcel(parcel?.parcelId ?? "");
        if (success) navigate(paths.parcels_list);
    }

    return (
        <Container gap={30} maxWidth={1000} margin="0 auto" padding={20}>
            <Container direction="row" align="center" justify="space-between" gap={20} stackOnMobile>
                <Container direction="row" align="center" gap={14}>
                    <Text tag="h1" weight="bold" size={2}>{parcel.title}</Text>
                </Container>

                <Container direction="row" align={"center"} justify={"end"} gap={10} wrap>
                    {canModifyOrDelete && <Button
                        iconOnly
                        variant="ghost"
                        size="md"
                        icon={<Trash2 size={18} />}
                        ariaLabel="Supprimer le colis"
                        onClick={() => setIsConfirmOpen(true)}
                    />}
                    {canModifyOrDelete && <Button
                        to={parcelEditPath(parcel.parcelId ?? "")}
                        iconOnly
                        variant="ghost"
                        size="md"
                        icon={<Pencil size={18} />}
                        ariaLabel="Modifier le colis"
                    />}
                    {parcel?.state === "PUBLISHED" && (
                        <Button
                            to={`${paths.search}?parcelId=${parcel?.parcelId}`}
                            label="Envoyer"
                            variant="main"
                            size="md"
                            style={actionStyle}
                            icon={<ArrowUpRight size={18} />}
                            iconPosition="right"
                        />
                    )}
                </Container>
            </Container>

            <Container direction="row" gap={24} stackOnMobile>
                <Container style={{ flex: "1 1 70%", minWidth: 0 }}>
                    <ParcelOverview
                        images={images}
                        weightKg={parcel.weightKg}
                        size={parcel.size}
                        fragile={parcel.fragile}
                    />
                </Container>
                <Container style={{ flex: "1 1 30%", minWidth: 0 }}>
                    <ParcelTracking
                        state={parcel.state}
                        pickup={parcel.pickup}
                        dropoff={parcel.dropoff}
                        publishedAt={parcel.publishedAt}
                    />
                </Container>
            </Container>

            <Container gap={16}>
                <Text tag="h3" weight="bold">Propositions de transport</Text>

                {bookings.length === 0 && (
                    <Text tag="p" muted>Aucune proposition pour le moment.</Text>
                )}

                {bookings.length > 0 && (
                    <Container gap={12}>
                        {bookings.map((booking) => (
                            <ParcelBookingCard key={booking.bookingId} booking={booking} parcelState={parcel.state} />
                        ))}
                    </Container>
                )}
            </Container>

            {isConfirmOpen && (
                <Confirmation
                    type="delete"
                    title="Supprimer ce colis ?"
                    description={`Cette action est irréversible. Le colis "${parcel.title}" sera définitivement supprimé.`}
                    onConfirm={handleConfirmDelete}
                    onClose={() => setIsConfirmOpen(false)}
                    isLoading={isDeleting}
                />
            )}
        </Container>
    );
}
