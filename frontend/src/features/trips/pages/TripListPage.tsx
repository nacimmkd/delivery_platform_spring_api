import { useState } from "react";
import Text from "@/shared/components/text/Text.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Container from "@/shared/components/container/Container.tsx";
import { CarFront, PlusIcon } from "lucide-react";
import TripCard from "@/features/trips/components/TripCard/TripCard.tsx";
import type { TripSummary } from "@/shared/types";
import { paths } from "@/app/routes/paths.ts";
import useMyTrips from "@/features/trips/hooks/useMyTrips.ts";

type Filter = "all" | "published" | "completed" | "expired" | "cancelled";

const FILTERS: { key: Filter; label: string; match: (state?: TripSummary["state"]) => boolean }[] = [
    { key: "all", label: "Tous", match: () => true },
    { key: "published", label: "Publié", match: (state) => state === "PUBLISHED" || state === "ACTIVE" || state === "FULL" },
    { key: "completed", label: "Terminé", match: (state) => state === "COMPLETED" },
    { key: "expired", label: "Expiré", match: (state) => state === "EXPIRED" },
    { key: "cancelled", label: "Annulé", match: (state) => state === "CANCELLED" },
];

export default function TripListPage() {
    const { trips, isLoading, error } = useMyTrips();
    const [filter, setFilter] = useState<Filter>("all");

    const activeFilter = FILTERS.find((f) => f.key === filter)!;
    const filteredTrips = trips.filter((trip) => activeFilter.match(trip.state));

    return (
        <Container gap={30} maxWidth={900} margin="0 auto" padding={20}>
            <Container direction="row" align="center" justify="space-between" gap={30} stackOnMobile>
                <Container gap={5}>
                    <Text tag="h1" weight="bold" size={2.5}>Mes Trajets</Text>
                    <Text tag="p">
                        Partagez vos trajets et transportez des colis en cours de route.
                    </Text>
                </Container>
                <Button to={paths.trip_create} label="Proposer un trajet" variant="main" icon={<PlusIcon />} style={{ flexShrink: 0 }} />
            </Container>
            <Container gap={32} align="start">
                <Container direction="row" align="center" gap={10} wrap centerOnMobile>
                    {FILTERS.map(({ key, label }) => (
                        <Button
                            key={key}
                            label={label}
                            variant={filter === key ? "main" : "ghost"}
                            size="sm"
                            onClick={() => setFilter(key)}
                        />
                    ))}
                </Container>

                {isLoading && (
                    <Container direction="row" align="center" justify="center" padding="40px 0">
                        <Spinner />
                    </Container>
                )}

                {!isLoading && error && (
                    <Text tag="p" align="center">{error.message}</Text>
                )}

                {!isLoading && !error && filteredTrips.length === 0 && (
                    <Container align="center" justify="center" gap={6} padding="70px 20px" style={{ textAlign: "center" }}>
                        <CarFront size={60}/>
                        <Text tag="h3" weight="bold">
                            {filter === "all" ? "Aucun trajet pour le moment" : "Aucun trajet dans cette catégorie"}
                        </Text>
                        <Text tag="p" muted align="center" maxWidth={360}>
                            {filter === "all"
                                ? "Vous n'avez pas encore proposé de trajet. Créez-en un pour commencer."
                                : "Essayez un autre filtre pour voir vos trajets."}
                        </Text>
                        {filter === "all" && (
                            <Button to={paths.trip_create} label="Proposer un trajet" variant="main" icon={<PlusIcon size={18} />} style={{ marginTop: 18 }} />
                        )}
                    </Container>
                )}

                {!isLoading && !error && filteredTrips.length > 0 && (
                    <Container gap={16}>
                        {filteredTrips.map((trip) => (
                            <TripCard key={trip.tripId} trip={trip} />
                        ))}
                    </Container>
                )}
            </Container>
        </Container>
    )
}
