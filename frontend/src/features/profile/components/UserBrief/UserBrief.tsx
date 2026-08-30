import styles from "./UserBrief.module.css"
import { Star } from "lucide-react";
import Container from "@/shared/components/container/Container.tsx";
import Icon from "@/shared/components/icon/Icon.tsx";
import Text from "@/shared/components/text/Text.tsx";
import type { ProfileBrief } from "@/shared/types";

type UserBriefProps = {
    user: ProfileBrief;
};

export default function UserBrief({ user }: UserBriefProps) {
    const { firstName, lastName, avatarUrl, avgRating, reviewCount, verified } = user;
    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    const wrapperClasses = [
        styles.avatarWrapper,
        verified && styles.verified,
    ].filter(Boolean).join(" ");

    return (
        <Container align="center" gap={10}>
            <span className={wrapperClasses}>
                <Icon className={styles.avatar} src={avatarUrl ?? "/avatar.png"} size={60} label={fullName} />
            </span>
            <Container gap={2} direction="column" align="center">
                <Text tag="p" weight="semibold">{fullName}</Text>
                { avgRating || reviewCount
                    ? <Container align={"center"} gap={3} justify={"center"} direction={"row"}>
                        <Star fill={"#FB923C"} color={"#FB923C"} size={14}/>
                        <Text>{`${avgRating} (${reviewCount})`}</Text>
                    </Container>
                    : <Text muted size={0.85}>Pas encore d'avis</Text> }
            </Container>
        </Container>
    );
}
