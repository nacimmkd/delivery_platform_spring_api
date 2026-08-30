import { useNavigate, useParams } from "react-router-dom";
import ParcelForm from "@/features/parcel/components/ParcelForm/ParcelForm.tsx";
import useParcelQuery from "@/features/parcel/hooks/useParcelQuery.ts";
import useUpdateParcel from "@/features/parcel/hooks/useUpdateParcel.ts";
import { paths } from "@/app/routes/paths.ts";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import type { AddressRequest, ParcelCreateRequest, ParcelSummary } from "@/shared/types";

function toAddressRequest(address: ParcelSummary["pickup"]): AddressRequest {
    return {
        street: address?.street ?? "",
        city: address?.city ?? "",
        postalCode: address?.postalCode ?? "",
        country: address?.country ?? "France",
    };
}

export default function EditParcelPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { parcel, isError: notFound } = useParcelQuery(id);
    const { updateParcel, isLoading, error } = useUpdateParcel();

    async function handleSubmit(data: ParcelCreateRequest) {
        if (!id) return;
        const updated = await updateParcel(id, { ...data, fragile: data.fragile ?? false });
        if (updated) {
            navigate(paths.parcels_list);
        }
    }

    if (notFound) {
        return (
            <Container direction="row" align="center" justify="center" maxWidth={1200} margin="0 auto" padding={20} minHeight="40vh">
                <Text tag="p" align="center">Colis introuvable.</Text>
            </Container>
        );
    }

    if (!parcel) {
        return (
            <Container direction="row" align="center" justify="center" maxWidth={1200} margin="0 auto" padding={20} minHeight="40vh">
                <Spinner />
            </Container>
        );
    }

    return (
        <Container direction="row" align="center" justify="center" maxWidth={1200} margin="0 auto" padding={20} minHeight="40vh">
            <ParcelForm
                heading="Modifier le colis"
                subtitle="Mettez à jour les détails de votre colis"
                submitLabel="Enregistrer les modifications"
                initialValues={{
                    title: parcel.title ?? "",
                    weightKg: parcel.weightKg ?? 0,
                    size: parcel.size ?? "M",
                    fragile: parcel.fragile ?? false,
                    pickupAddress: toAddressRequest(parcel.pickup),
                    dropoffAddress: toAddressRequest(parcel.dropoff),
                }}
                initialImages={parcel.images}
                parcelId={parcel.parcelId}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
            />
        </Container>
    );
}
