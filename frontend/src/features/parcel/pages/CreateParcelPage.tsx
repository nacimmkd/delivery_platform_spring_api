import { useNavigate } from "react-router-dom";
import ParcelForm from "@/features/parcel/components/ParcelForm/ParcelForm.tsx";
import Container from "@/shared/components/container/Container.tsx";
import useCreateParcel from "@/features/parcel/hooks/useCreateParcel.ts";
import { paths } from "@/app/routes/paths.ts";
import type { ParcelCreateRequest } from "@/shared/types";

export default function CreateParcelPage() {
    const navigate = useNavigate();
    const { createParcel, isLoading, error } = useCreateParcel();

    async function handleCreate(data: ParcelCreateRequest): Promise<string | null> {
        const result = await createParcel(data);
        return result?.parcel?.parcelId ?? null;
    }

    function handleFinish() {
        navigate(paths.parcels_list);
    }

    return (
        <Container direction="row" justify="center" maxWidth={1200} margin="0 auto" padding={20}>
            <ParcelForm
                onCreate={handleCreate}
                onFinish={handleFinish}
                isLoading={isLoading}
                error={error}
            />
        </Container>
    )
}