import { Ruler, WeightTilde } from "lucide-react";
import styles from "./ParcelOverview.module.css";
import Carousel from "@/shared/components/carousel/Carousel.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import Container from "@/shared/components/container/Container.tsx";
import type { ParcelSummary } from "@/shared/types";

type ParcelOverviewProps = {
    images: string[];
    weightKg?: number;
    size?: ParcelSummary["size"];
    fragile?: boolean;
};

export default function ParcelOverview({ images, weightKg, size, fragile }: ParcelOverviewProps) {
    return (
        <div className={styles.container}>
            <Carousel images={images} />

            <Container direction="row" align="center" gap={8} className={styles.details_container}>
                <Tag icon={<WeightTilde />} value={`${weightKg} kg`} />
                <Tag icon={<Ruler />} value={size ?? ""} />
                {fragile && (
                    <Tag icon={<Ruler />} value="Fragile" variant="accent" />
                )}
            </Container>
        </div>
    );
}
