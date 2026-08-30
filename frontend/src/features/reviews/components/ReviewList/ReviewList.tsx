import { Star } from "lucide-react";
import styles from "./ReviewList.module.css";
import Icon from "@/shared/components/icon/Icon.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import formatDate from "@/shared/utils/formatDate.ts";
import type { ReviewDto } from "@/shared/types";

type ReviewListProps = {
    reviews: ReviewDto[];
};

export default function ReviewList({ reviews }: ReviewListProps) {
    if (reviews.length === 0) {
        return <Text tag="p" muted align="center">Aucun avis pour le moment.</Text>;
    }

    return (
        <Container gap={12}>
            {reviews.map((review) => {
                const fullName = [review.reviewer?.firstName, review.reviewer?.lastName].filter(Boolean).join(" ");
                return (
                    <div key={review.id} className={styles.review}>
                        <Icon className={styles.avatar} src={review.reviewer?.avatarUrl ?? "/avatar.png"} size={40} label={fullName} />

                        <Container gap={4} className={styles.body}>
                            <Container direction="row" align="center" justify="space-between" gap={10}>
                                <Text tag="p" weight="semibold">{fullName || "Utilisateur"}</Text>
                                {review.createdAt && (
                                    <Text tag="span" muted size={0.8}>{formatDate(review.createdAt)}</Text>
                                )}
                            </Container>

                            <Container direction="row" align="center" gap={2}>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        fill={i < (review.rating ?? 0) ? "#FB923C" : "none"}
                                        color="#FB923C"
                                    />
                                ))}
                            </Container>

                            {review.comment && (
                                <Text tag="p" size={0.9}>{review.comment}</Text>
                            )}
                        </Container>
                    </div>
                );
            })}
        </Container>
    );
}
