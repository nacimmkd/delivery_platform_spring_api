import styles from "./Itinerary.module.css";
import Text from "@/shared/components/text/Text.tsx";
import formatDate from "@/shared/utils/formatDate.ts";
import type { Address } from "@/shared/types";

type ItineraryProps = {
    departure?: Address;
    arrival?: Address;
    departureDate?: string;
    arrivalDate?: string;
};

export default function Itinerary({ departure, arrival, departureDate, arrivalDate }: ItineraryProps) {
    return (
        <div className={styles.briefRoute}>
            <div className={styles.briefPoint}>
                <Text tag="span" muted className={styles.briefLabel}>Départ</Text>
                <Text tag="span" className={styles.briefStreet}>{departure?.street}</Text>
                <Text tag="p" weight="semibold" className={styles.briefAddress}>
                    {departure?.city}
                </Text>
                <Text tag="span" muted className={styles.briefCountry}>{departure?.country}</Text>
                {departureDate && (
                    <Text tag="span" muted className={styles.briefDate}>{formatDate(departureDate)}</Text>
                )}
            </div>

            <div className={styles.routeLine}>
                <span className={styles.routeDot} />
                <span className={styles.routeTrack} />
                <span className={styles.routeDot} />
            </div>

            <div className={`${styles.briefPoint} ${styles.briefPointRight}`}>
                <Text tag="span" muted className={styles.briefLabel}>Arrivée</Text>
                <Text tag="span" className={styles.briefStreet}>{arrival?.street}</Text>
                <Text tag="p" weight="semibold" className={styles.briefAddress}>
                    {arrival?.city}
                </Text>
                <Text tag="span" muted className={styles.briefCountry}>{arrival?.country}</Text>
                {arrivalDate && (
                    <Text tag="span" muted className={styles.briefDate}>{formatDate(arrivalDate)}</Text>
                )}
            </div>
        </div>
    );
}
