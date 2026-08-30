import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import styles from "./TripItinerary.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import { addressToString } from "@/shared/utils/addressToString.ts";
import formatDate from "@/shared/utils/formatDate.ts";
import type { Address, TripStopDto } from "@/shared/types";

type TripItineraryProps = {
    departure?: Address;
    arrival?: Address;
    departureDate?: string;
    arrivalDate?: string;
    stops: TripStopDto[];
};

export default function TripItinerary({ departure, arrival, departureDate, arrivalDate, stops }: TripItineraryProps) {
    const [showDetails, setShowDetails] = useState(false);
    const orderedStops = [...stops].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const hasStops = orderedStops.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Text tag="h3" weight="bold">Itinéraire</Text>
                {hasStops && (
                    <Button
                        label={showDetails ? "Voir moins" : "Voir les étapes"}
                        variant="ghost"
                        size="sm"
                        icon={<ChevronDown size={16} className={showDetails ? styles.chevronOpen : styles.chevron} />}
                        iconPosition="right"
                        onClick={() => setShowDetails((prev) => !prev)}
                    />
                )}
            </div>

            <ul className={styles.steps}>
                <li className={styles.step}>
                    <span className={`${styles.marker} ${styles.markerEnd}`} />
                    <span className={styles.step_text}>{addressToString(departure)}</span>
                    {departureDate && <span className={styles.step_date}>{formatDate(departureDate)}</span>}
                </li>

                {showDetails ? (
                    orderedStops.map((stop) => (
                        <li key={stop.id} className={styles.step}>
                            <span className={`${styles.marker} ${styles.markerStop}`} />
                            <span className={styles.step_text}>{addressToString(stop.address)}</span>
                        </li>
                    ))
                ) : hasStops && (
                    <li className={styles.step}>
                        <span className={styles.marker} />
                        <Tag
                            size="sm"
                            icon={<MapPin size={12} />}
                            value={`${orderedStops.length} arrêt${orderedStops.length > 1 ? "s" : ""}`}
                        />
                    </li>
                )}

                <li className={styles.step}>
                    <span className={`${styles.marker} ${styles.markerEnd}`} />
                    <span className={styles.step_text}>{addressToString(arrival)}</span>
                    {arrivalDate && <span className={styles.step_date}>{formatDate(arrivalDate)}</span>}
                </li>
            </ul>
        </div>
    );
}
