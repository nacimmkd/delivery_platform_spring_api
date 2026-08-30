import { useState } from "react";
import styles from "./ParcelCard.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Button from "@/shared/components/button/Button.tsx";
import { Circle, MapPin, Route, Ruler, Trash2, WeightTilde } from "lucide-react";
import Carousel from "@/shared/components/carousel/Carousel.tsx";
import type { ParcelSummary } from "@/shared/types";
import formatDate from "@/shared/utils/formatDate.ts";
import Confirmation from "@/shared/components/confirmation/Confirmation.tsx";
import useDeleteParcel from "@/features/parcel/hooks/useDeleteParcel.ts";
import { addressToBriefString } from "@/shared/utils/addressToString";
import { parcelStateLabel } from "@/features/parcel/utils/parcelLabels.ts";
import { paths } from "@/app/routes/paths.ts";

type ParcelProps = {
    parcel: ParcelSummary;
};

export default function ParcelCard({ parcel }: ParcelProps) {
    const { parcelId, title, weightKg, size, fragile, pickup, dropoff, state, images, publishedAt } = parcel;
    const { deleteParcel, isLoading: isDeleting } = useDeleteParcel();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const canDelete = parcel?.state === "PUBLISHED";

    async function handleConfirmDelete() {
        const success = await deleteParcel(parcelId ?? "");
        if (success) setIsConfirmOpen(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.status}>
                <Tag icon={<Route />} value={parcelStateLabel(state)} />
            </div>
            {canDelete && <Button
                iconOnly
                variant="danger"
                size="sm"
                icon={<Trash2 size={16} />}
                ariaLabel="Supprimer le colis"
                className={styles.delete_button}
                onClick={() => setIsConfirmOpen(true)}
            /> }

            <div className={styles.image_container}>
                <Carousel
                    images={(images ?? [])
                        .map((img) => img.url)
                        .filter((url): url is string => url !== undefined)}
                />
            </div>
            <Container gap={14} justify="space-between" className={styles.body}>
                <Container gap={2}>
                    <Text tag="h2" weight={"bold"} className={styles.title_text}>{title}</Text>
                    <Text tag="p" muted={true} size={0.8}>Publié le {formatDate(publishedAt)}</Text>
                </Container>
                <Container gap={6} className={styles.addresses_container}>
                    <Container gap={4} className={`${styles.address_point} ${styles.address}`}>
                        <Text tag="p" icon={<Circle size={13} />} className={styles.address_label}>
                            <span className={styles.address_text}>{addressToBriefString(pickup)}</span>
                        </Text>
                    </Container>
                    <Container gap={4} className={`${styles.address_point} ${styles.address}`}>
                        <Text tag="p" icon={<MapPin size={13} />} className={styles.address_label}>
                            <span className={styles.address_text}>{addressToBriefString(dropoff)}</span>
                        </Text>
                    </Container>
                </Container>
                <Container direction="row" align="center" gap={8}>
                    <Tag icon={<WeightTilde />} value={`${weightKg} kg`} />
                    <Tag icon={<Ruler />} value={size ?? ""} />
                    {fragile && (
                        <Tag icon={<Ruler />} value="Fragile" variant="accent" />
                    )}
                </Container>
            </Container>
            <Container direction="row" gap={10} className={styles.links_container}>
                <Button to={`/parcels/${parcelId}`} label="Détails" variant="secondary" fullWidth />
                {state === "PUBLISHED" && (<Button to={`${paths.search}?parcelId=${parcelId}`} label="Envoyer" variant="main" fullWidth />)}
            </Container>

            {isConfirmOpen && (
                <Confirmation
                    type="delete"
                    title="Supprimer ce colis ?"
                    description={`Cette action est irréversible. Le colis "${title}" sera définitivement supprimé.`}
                    onConfirm={handleConfirmDelete}
                    onClose={() => setIsConfirmOpen(false)}
                    isLoading={isDeleting}
                />
            )}
        </div>
    );
}
