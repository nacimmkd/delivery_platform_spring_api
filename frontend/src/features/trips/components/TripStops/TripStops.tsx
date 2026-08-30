import { useState } from "react";
import { MapPin, X } from "lucide-react";
import styles from "./TripStops.module.css";
import AddressForm from "@/features/address/components/AddressForm/AddressForm.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Button from "@/shared/components/button/Button.tsx";
import useTripQuery from "@/features/trips/hooks/useTripQuery.ts";
import useAddTripStop from "@/features/trips/hooks/useAddTripStop.ts";
import useDeleteTripStop from "@/features/trips/hooks/useDeleteTripStop.ts";
import { addressToBriefString } from "@/shared/utils/addressToString.ts";
import type { AddressRequest } from "@/shared/types";

type TripStopsProps = {
    tripId: string;
};

export default function TripStops({ tripId }: TripStopsProps) {
    const { trip, isLoading } = useTripQuery(tripId);
    const { addStop, isLoading: isAdding } = useAddTripStop();
    const { deleteStop, isLoading: isDeleting } = useDeleteTripStop();
    const [query, setQuery] = useState("");

    const stops = [...(trip?.stops ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    async function handleSelect(address: AddressRequest) {
        setQuery("");
        await addStop(tripId, address);
    }

    return (
        <Container gap={14}>
            <Text tag="p" weight="semibold" className={styles.label}>
                Arrêts intermédiaires (optionnel){stops.length > 0 ? ` — ${stops.length}` : ""}
            </Text>

            <AddressForm
                id="tripStop"
                placeholder="Ajouter un arrêt"
                value={query}
                disabled={isAdding}
                onChange={setQuery}
                onSelect={handleSelect}
            />

            {isLoading && (
                <Container direction="row" justify="center" className={styles.state}>
                    <Spinner />
                </Container>
            )}

            {!isLoading && stops.length > 0 && (
                <ul className={styles.stops_list}>
                    {stops.map((stop, index) => (
                        <li key={stop.id} className={styles.stop}>
                            <Text tag="p" icon={<MapPin size={14} />}>
                                <span className={styles.stop_order}>{index + 1}.</span> {addressToBriefString(stop.address)}
                            </Text>
                            <Button
                                iconOnly
                                variant="danger"
                                size="sm"
                                icon={<X size={14} />}
                                ariaLabel="Supprimer l'arrêt"
                                onClick={() => stop.id && deleteStop(tripId, stop.id)}
                                disabled={isDeleting}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
}
