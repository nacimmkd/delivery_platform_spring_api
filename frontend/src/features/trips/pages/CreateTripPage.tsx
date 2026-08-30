import { useNavigate } from "react-router-dom";
import TripForm from "@/features/trips/components/TripForm/TripForm.tsx";
import Container from "@/shared/components/container/Container.tsx";
import useCreateTrip from "@/features/trips/hooks/useCreateTrip.ts";
import { paths } from "@/app/routes/paths.ts";
import type { TripCreateRequest } from "@/shared/types";

export default function CreateTripPage() {
    const navigate = useNavigate();
    const { createTrip, isLoading, error } = useCreateTrip();

    async function handleCreate(data: TripCreateRequest): Promise<string | null> {
        const result = await createTrip(data);
        return result?.tripId ?? null;
    }

    function handleFinish() {
        navigate(paths.trips);
    }

    return (
        <Container direction="row" justify="center" maxWidth={1200} margin="0 auto" padding={20}>
            <TripForm
                onCreate={handleCreate}
                onFinish={handleFinish}
                isLoading={isLoading}
                error={error}
            />
        </Container>
    );
}
