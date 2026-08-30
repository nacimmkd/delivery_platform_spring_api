import { useParams } from "react-router-dom";
import { Phone } from "lucide-react";
import styles from "./UserProfilePage.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import ProfileOverview from "@/features/profile/components/ProfileOverview/ProfileOverview.tsx";
import SectionCard from "@/features/profile/components/SectionCard/SectionCard.tsx";
import ReviewsNavCard from "@/features/reviews/components/ReviewsNavCard/ReviewsNavCard.tsx";
import useProfileQuery from "@/features/profile/hooks/useProfileQuery.ts";

export default function UserProfilePage() {
    const { id } = useParams<{ id: string }>();
    const { profile, isLoading, isError } = useProfileQuery(id);

    if (isError) {
        return (
            <Container gap={30} maxWidth={800} margin="0 auto" padding={20}>
                <Text tag="p" align="center">Profil introuvable.</Text>
            </Container>
        );
    }

    if (isLoading || !profile) {
        return (
            <Container direction="row" align="center" justify="center" minHeight="40vh">
                <Spinner />
            </Container>
        );
    }

    return (
        <Container maxWidth={980} margin="0 auto" padding={20}>
            <Container direction="column" gap={24} align="start" stackOnMobile>
                <Container style={{ flex: "1 1 300px" }}>
                    <ProfileOverview profile={profile} />
                </Container>

                <Container gap={20} style={{ flex: "2 1 480px", minWidth: 0 }}>
                    <SectionCard icon={<Phone size={18} />} title="Informations de contact">
                        <div className={!profile.phoneVisible ? styles.blurred : undefined}>
                            <Container direction="row" justify="space-between">
                                <Text muted>Téléphone</Text>
                                <Text weight="semibold">{profile.phoneVisible ? (profile.phone || "-") : "+33 6 12 34 56 78"}</Text>
                            </Container>
                        </div>
                        {!profile.phoneVisible && (
                            <Text muted size={0.85} align="center">
                                Vous devez avoir une réservation active avec cette personne pour accéder à ses coordonnées.
                            </Text>
                        )}
                    </SectionCard>

                    <ReviewsNavCard
                        profileId={profile.profileId ?? ""}
                        reviewCount={profile.reviewCount}
                        avgRating={profile.avgRating}
                    />
                </Container>
            </Container>
        </Container>
    );
}
