import { useNavigate } from "react-router-dom";
import styles from "./TripCard.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import Itinerary from "@/shared/components/itinerary/Itinerary.tsx";
import { Euro, Route, WeightTilde, Zap } from "lucide-react";
import type { TripSummary } from "@/shared/types";
import formatPrice from "@/shared/utils/formatPrice.ts";
import { tripDetailsPath } from "@/app/routes/paths.ts";
import { tripStateLabel } from "@/features/trips/utils/tripLabels.ts";

type TripProps = {
    trip: TripSummary;
};

export default function TripCard({ trip }: TripProps) {
    const navigate = useNavigate();
    const { tripId, departure, arrival, departureDate, arrivalDate, availableWeightKg, remainingWeightKg, pricePerKg, instantBooking, state } = trip;
    const remaining = remainingWeightKg ?? availableWeightKg ?? 0;
    const used = availableWeightKg ? availableWeightKg - remaining : 0;
    const usedPercent = availableWeightKg ? Math.round((used / availableWeightKg) * 100) : 0;

    function handleClick() {
        if (!tripId) return;
        navigate(tripDetailsPath(tripId));
    }

    return (
        <div className={`${styles.container} ${styles.clickable}`} onClick={handleClick}>
            <div className={styles.status}>
                <Tag icon={<Route size={14} />} value={tripStateLabel(state)} className={styles.status_badge} />
            </div>

            <div className={styles.top}>
                <Itinerary
                    departure={departure}
                    arrival={arrival}
                    departureDate={departureDate}
                    arrivalDate={arrivalDate}
                />
            </div>

            <div className={styles.bottom}>
                <div className={styles.tags}>
                    <Tag icon={<Euro />} value={`${formatPrice(pricePerKg)}/kg`} />
                    <Tag icon={<WeightTilde />} value={`${remaining} kg dispo`} />
                    {instantBooking && (
                        <Tag icon={<Zap />} value="Instantané" variant="accent" />
                    )}
                </div>

                <div className={styles.weight_bar}>
                    <div className={styles.weight_track}>
                        <div className={styles.weight_fill} style={{ width: `${usedPercent}%` }} />
                    </div>
                    <Text tag="span" weight="bold" className={styles.weight_values}>
                        {used}<Text tag="span" muted className={styles.weight_total}>/{availableWeightKg} kg utilisé</Text>
                    </Text>
                </div>
            </div>
        </div>
    );
}
