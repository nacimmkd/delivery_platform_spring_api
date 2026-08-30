import styles from "./BookingCodePopup.module.css";
import Popup from "@/shared/components/popup/Popup.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";

type BookingCodePopupProps = {
    title: string;
    description: string;
    code: string;
    onClose: () => void;
};

export default function BookingCodePopup({ title, description, code, onClose }: BookingCodePopupProps) {
    return (
        <Popup onClose={onClose}>
            <Container gap={8}>
                <Text tag="h3" weight="bold">{title}</Text>
                <Text tag="p" muted>{description}</Text>

                <Text tag="p" weight="bold" size={2} align="center" className={styles.code}>{code}</Text>

                <Button label="Fermer" variant="ghost" fullWidth onClick={onClose} />
            </Container>
        </Popup>
    );
}
