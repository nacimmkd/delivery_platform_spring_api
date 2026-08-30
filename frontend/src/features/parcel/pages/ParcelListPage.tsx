import { useState } from "react";
import Text from "@/shared/components/text/Text.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Container from "@/shared/components/container/Container.tsx";
import {PackageOpen, PlusIcon} from "lucide-react";
import ParcelCard from "@/features/parcel/components/ParcelCard/ParcelCard.tsx";
import type { ParcelSummary } from "@/shared/types";
import {paths} from "@/app/routes/paths.ts";
import useMyParcels from "@/features/parcel/hooks/useMyParcels.ts";

const IN_TRANSIT_STATES: ParcelSummary["state"][] = ["BOOKED", "PICKED_UP", "IN_TRANSIT"];

type Filter = "all" | "in_transit" | "delivered" | "cancelled";

const FILTERS: { key: Filter; label: string; match: (state?: ParcelSummary["state"]) => boolean }[] = [
    { key: "all", label: "Tous", match: () => true },
    { key: "in_transit", label: "En livraison", match: (state) => IN_TRANSIT_STATES.includes(state) },
    { key: "delivered", label: "Livré", match: (state) => state === "DELIVERED" },
    { key: "cancelled", label: "Annulé", match: (state) => state === "CANCELLED" },
];

export default function ParcelListPage() {
    const { parcels, isLoading, error, hasMore, isLoadingMore, loadMore } = useMyParcels();
    const [filter, setFilter] = useState<Filter>("all");

    const activeFilter = FILTERS.find((f) => f.key === filter)!;
    const filteredParcels = parcels.filter((parcel) => activeFilter.match(parcel.state));

    return (
        <Container gap={30} maxWidth={1200} margin="0 auto" padding={20}>
            <Container direction="row" align="center" justify="space-between" gap={30} stackOnMobile>
                <Container gap={5}>
                    <Text tag="h1" weight="bold" size={2.5}>Mes Colis</Text>
                    <Text tag="p">
                        Track your active shipments in real-time. Experience effortless precision with Couriq.
                    </Text>
                </Container>
                <Button to={paths.parcel_create} label="Envoyer un colis" variant="main" icon={<PlusIcon />} style={{ flexShrink: 0 }} />
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

                {!isLoading && !error && filteredParcels.length === 0 && (
                    <Container align="center" justify="center" gap={6} padding="70px 20px" style={{ textAlign: "center" }}>
                        <PackageOpen size={60}/>
                        <Text tag="h3" weight="bold">
                            {filter === "all" ? "Aucun colis pour le moment" : "Aucun colis dans cette catégorie"}
                        </Text>
                        <Text tag="p" muted align="center" maxWidth={360}>
                            {filter === "all"
                                ? "Vous n'avez pas encore envoyé de colis. Créez-en un pour commencer."
                                : "Essayez un autre filtre pour voir vos colis."}
                        </Text>
                        {filter === "all" && (
                            <Button to={paths.parcel_create} label="Envoyer un colis" variant="main" icon={<PlusIcon size={18} />} style={{ marginTop: 18 }} />
                        )}
                    </Container>
                )}

                {!isLoading && !error && filteredParcels.length > 0 && (
                    <Container direction="row" justify="center" gap={30} wrap>
                        {filteredParcels.map((parcel) => (
                            <ParcelCard key={parcel.parcelId} parcel={parcel} />
                        ))}
                    </Container>
                )}

                {!isLoading && !error && hasMore && (
                    <Button
                        label="Charger plus"
                        variant="main"
                        style={{ alignSelf: "center" }}
                        loading={isLoadingMore}
                        onClick={() => loadMore()}
                    />
                )}
            </Container>
        </Container>
    )
}