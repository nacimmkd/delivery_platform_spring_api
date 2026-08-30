import styles from "./Confirmation.module.css";
import Popup from "@/shared/components/popup/Popup.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";

type ConfirmationType = "delete" | "default";

type ConfirmationProps = {
    title: string;
    description?: React.ReactNode;
    type?: ConfirmationType;
    confirmLabel?: string;
    cancelLabel?: string;
    isLoading?: boolean;
    onConfirm: () => void;
    onClose: () => void;
};

const CONFIRM_VARIANT: Record<ConfirmationType, "danger" | "main"> = {
    delete: "danger",
    default: "main",
};

const DEFAULT_CONFIRM_LABEL: Record<ConfirmationType, string> = {
    delete: "Supprimer",
    default: "Confirmer",
};

export default function Confirmation({
    title,
    description,
    type = "default",
    confirmLabel,
    cancelLabel = "Annuler",
    isLoading = false,
    onConfirm,
    onClose,
}: ConfirmationProps) {
    return (
        <Popup onClose={onClose}>
            <Container gap={8}>
                <Text tag="h3" weight="bold">{title}</Text>
                {description && <Text tag="p" muted>{description}</Text>}
                <Container direction="row" gap={10} className={styles.actions}>
                    <Button
                        label={cancelLabel}
                        variant="ghost"
                        fullWidth
                        onClick={onClose}
                        disabled={isLoading}
                    />
                    <Button
                        label={confirmLabel ?? DEFAULT_CONFIRM_LABEL[type]}
                        variant={CONFIRM_VARIANT[type]}
                        fullWidth
                        onClick={onConfirm}
                        loading={isLoading}
                    />
                </Container>
            </Container>
        </Popup>
    );
}
