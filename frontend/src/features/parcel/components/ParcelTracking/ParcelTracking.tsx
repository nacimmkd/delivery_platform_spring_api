import { Ban, Check, MapPin } from "lucide-react";
import styles from "./ParcelTracking.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import formatDate from "@/shared/utils/formatDate.ts";
import { addressToBriefString } from "@/shared/utils/addressToString.ts";
import type { Address, ParcelSummary } from "@/shared/types";

type ParcelTrackingProps = {
    state?: ParcelSummary["state"];
    pickup?: Address;
    dropoff?: Address;
    publishedAt?: string;
};

const STEPS: { key: NonNullable<ParcelSummary["state"]>; label: string }[] = [
    { key: "PUBLISHED", label: "Publié" },
    { key: "BOOKED", label: "Réservé" },
    { key: "PICKED_UP", label: "Récupéré" },
    { key: "DELIVERED", label: "Livré" },
];

export default function ParcelTracking({ state, pickup, dropoff, publishedAt }: ParcelTrackingProps) {
    if (state === "CANCELLED") {
        return (
            <div className={styles.container}>
                <Text tag="h3" weight="bold">Suivi</Text>
                <Container direction="row" align="center" gap={8} className={styles.cancelled}>
                    <Ban size={18} />
                    <Text tag="p" weight="semibold">Ce colis a été annulé</Text>
                </Container>
            </div>
        );
    }

    const effectiveState = state === "IN_TRANSIT" ? "PICKED_UP" : state;
    const currentIndex = STEPS.findIndex((step) => step.key === effectiveState);

    return (
        <div className={styles.container}>
            <Text tag="h3" weight="bold">Suivi</Text>

            <ol className={styles.steps}>
                {STEPS.map((step, index) => {
                    const isDone = index < currentIndex;
                    const isCurrent = index === currentIndex;
                    const subtext = step.key === "PUBLISHED" ? formatDate(publishedAt)
                        : step.key === "PICKED_UP" ? addressToBriefString(pickup)
                            : step.key === "DELIVERED" ? addressToBriefString(dropoff)
                                : "";

                    return (
                        <li
                            key={step.key}
                            className={`${styles.step} ${isDone ? styles.done : ""} ${isCurrent ? styles.current : ""}`}
                        >
                            <span className={styles.dot}>{isDone && <Check size={12} />}</span>
                            <Container gap={2} className={styles.step_body}>
                                <Text tag="p" weight="semibold">{step.label}</Text>
                                {subtext && (
                                    <Text tag="span" muted size={0.8} icon={step.key !== "PUBLISHED" ? <MapPin size={12} /> : undefined}>
                                        {subtext}
                                    </Text>
                                )}
                            </Container>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
