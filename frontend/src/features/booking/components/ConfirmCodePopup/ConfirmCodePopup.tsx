import { useState } from "react";
import styles from "./ConfirmCodePopup.module.css";
import Popup from "@/shared/components/popup/Popup.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Input from "@/shared/components/input/Input.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";

type ConfirmCodePopupProps = {
    title: string;
    description: string;
    confirmLabel?: string;
    isLoading?: boolean;
    onConfirm: (code: string) => void;
    onClose: () => void;
};

export default function ConfirmCodePopup({
    title,
    description,
    confirmLabel = "Confirmer",
    isLoading = false,
    onConfirm,
    onClose,
}: ConfirmCodePopupProps) {
    const [digits, setDigits] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDigits(e.target.value.replace(/\D/g, "").slice(0, 4));
    }

    function handleConfirm() {
        if (digits.length !== 4) return;
        onConfirm(`BOK-${digits}`);
    }

    return (
        <Popup onClose={onClose}>
            <Container gap={8}>
                <Text tag="h3" weight="bold">{title}</Text>
                <Text tag="p" muted>{description}</Text>

                <Container direction="row" align="center" gap={10} className={styles.codeGroup}>
                    <Text tag="span" weight="bold" size={1.1}>BOK-</Text>
                    <Input
                        type="tel"
                        value={digits}
                        onChange={handleChange}
                        placeholder="5436"
                        disabled={isLoading}
                    />
                </Container>

                <Container direction="row" gap={10} className={styles.actions}>
                    <Button
                        label="Annuler"
                        variant="ghost"
                        fullWidth
                        onClick={onClose}
                        disabled={isLoading}
                    />
                    <Button
                        label={confirmLabel}
                        variant="main"
                        fullWidth
                        onClick={handleConfirm}
                        loading={isLoading}
                        disabled={digits.length !== 4}
                    />
                </Container>
            </Container>
        </Popup>
    );
}
