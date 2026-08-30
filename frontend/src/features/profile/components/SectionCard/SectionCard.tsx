import styles from "./SectionCard.module.css";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";

type SectionCardProps = {
    icon: React.ReactNode;
    title: string;
    action?: React.ReactNode;
    children: React.ReactNode;
};

export default function SectionCard({ icon, title, action, children }: SectionCardProps) {
    return (
        <Container variant="elevated" gap={18} style={{ padding: "26px 28px" }}>
            <Container direction="row" align="center" justify="space-between" gap={12}>
                <Container direction="row" align="center" gap={12}>
                    <div className={styles.iconBadge}>{icon}</div>
                    <Text tag="h3" weight="bold">{title}</Text>
                </Container>
                {action}
            </Container>
            {children}
        </Container>
    );
}
