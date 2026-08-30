import { Euro, Route, WeightTilde, Zap } from "lucide-react";
import styles from "./TripOverview.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import Divider from "@/shared/components/divider/Divider.tsx";
import PriceDisplay from "@/shared/components/price/Price.tsx";
import formatPrice from "@/shared/utils/formatPrice.ts";
import { tripStateLabel } from "@/features/trips/utils/tripLabels.ts";
import type { Price, TripSummary } from "@/shared/types";

type TripOverviewProps = {
    state?: TripSummary["state"];
    pricePerKg?: Price;
    estimatedEarning?: Price;
    availableWeightKg?: number;
    remainingWeightKg?: number;
    maxDetourKm?: number;
    instantBooking?: boolean;
    notes?: string;
};

export default function TripOverview({
    state,
    pricePerKg,
    estimatedEarning,
    availableWeightKg,
    remainingWeightKg,
    maxDetourKm,
    instantBooking,
    notes,
}: TripOverviewProps) {
    const remaining = remainingWeightKg ?? availableWeightKg ?? 0;
    const used = availableWeightKg ? availableWeightKg - remaining : 0;
    const usedPercent = availableWeightKg ? Math.round((used / availableWeightKg) * 100) : 0;

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <Tag icon={<Route size={14} />} value={tripStateLabel(state)} className={styles.statusBadge} />

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <div className={styles.statIcon}><Euro size={18} /></div>
                        <div className={styles.statBody}>
                            <Text tag="span" muted className={styles.statLabel}>Prix</Text>
                            <Text tag="p" weight="bold" className={styles.statValue}>
                                {formatPrice(pricePerKg)}
                                <Text tag="span" muted className={styles.statUnit}>/kg</Text>
                            </Text>
                        </div>
                    </div>

                    <div className={styles.stat}>
                        <div className={styles.statIcon}><Route size={18} /></div>
                        <div className={styles.statBody}>
                            <Text tag="span" muted className={styles.statLabel}>Détour max</Text>
                            <Text tag="p" weight="bold" className={styles.statValue}>{maxDetourKm} km</Text>
                        </div>
                    </div>

                    {instantBooking && (
                        <div className={styles.stat}>
                            <div className={`${styles.statIcon} ${styles.statIconAccent}`}><Zap size={18} /></div>
                            <div className={styles.statBody}>
                                <Text tag="span" muted className={styles.statLabel}>Réservation</Text>
                                <Text tag="p" weight="bold" className={styles.statValue}>Instantanée</Text>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.weight}>
                    <div className={styles.weightHeader}>
                        <Text tag="span" icon={<WeightTilde size={15} />} weight="semibold">Poids</Text>
                        <Text tag="span" muted className={styles.weightValues}>{used}/{availableWeightKg} kg utilisé</Text>
                    </div>
                    <div className={styles.weightTrack}>
                        <div className={styles.weightFill} style={{ width: `${usedPercent}%` }} />
                    </div>
                </div>

                {notes && (
                    <div className={styles.notes}>
                        <Text tag="p" muted>{notes}</Text>
                    </div>
                )}
            </div>

            {estimatedEarning && (
                <>
                    <Divider orientation="vertical" className={styles.divider} />

                    <div className={styles.earnings}>
                        <PriceDisplay totalPrice={estimatedEarning} label="Gains estimés" align="right" />
                    </div>
                </>
            )}
        </div>
    );
}
