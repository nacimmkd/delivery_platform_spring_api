import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Button from "@/shared/components/button/Button.tsx";
import ReviewList from "@/features/reviews/components/ReviewList/ReviewList.tsx";
import useReviewsQuery from "@/features/reviews/hooks/useReviewsQuery.ts";

export default function ReviewsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { reviews, isLoading } = useReviewsQuery(id);

    return (
        <Container gap={30} maxWidth={700} margin="0 auto" padding={20}>
            <Container direction="row" align="center" gap={14}>
                <Button
                    iconOnly
                    variant="ghost"
                    icon={<ArrowLeft size={18} />}
                    ariaLabel="Retour au profil"
                    onClick={() => navigate(-1)}
                />
                <Text tag="h1" weight="bold" size={2}>Avis reçus</Text>
            </Container>

            {isLoading ? (
                <Container direction="row" align="center" justify="center" padding="40px 0">
                    <Spinner />
                </Container>
            ) : (
                <ReviewList reviews={reviews} />
            )}
        </Container>
    );
}
