import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import styles from "./ReviewsNavCard.module.css";
import Text from "@/shared/components/text/Text.tsx";
import { userReviewsPath } from "@/app/routes/paths.ts";

type ReviewsNavCardProps = {
    profileId: string;
    reviewCount?: number;
    avgRating?: number;
};

export default function ReviewsNavCard({ profileId, reviewCount = 0, avgRating }: ReviewsNavCardProps) {
    return (
        <Link to={userReviewsPath(profileId)} className={styles.card}>
            <div className={styles.iconBadge}>
                <Star size={20} fill="currentColor" />
            </div>

            <div className={styles.body}>
                <Text tag="p" weight="bold" size={1.05}>Avis reçus</Text>
                {avgRating ? (
                    <div className={styles.rating}>
                        <div className={styles.stars}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                    key={i}
                                    size={13}
                                    fill={i < Math.round(avgRating) ? "#FB923C" : "none"}
                                    color="#FB923C"
                                />
                            ))}
                        </div>
                        <Text tag="span" muted size={0.85}>
                            {avgRating.toFixed(1)} · {reviewCount} avis
                        </Text>
                    </div>
                ) : (
                    <Text tag="span" muted size={0.85}>Aucun avis pour le moment</Text>
                )}
            </div>

            <ArrowRight size={20} className={styles.arrow} />
        </Link>
    );
}
