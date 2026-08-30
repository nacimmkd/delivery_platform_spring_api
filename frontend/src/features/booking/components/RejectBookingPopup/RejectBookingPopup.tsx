import { useState } from "react";
import styles from "./RejectBookingPopup.module.css";
import Popup from "@/shared/components/popup/Popup.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Input from "@/shared/components/input/Input.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";

type RejectBookingPopupProps = {
    isLoading?: boolean;
    onConfirm: (reason: string) => void;
    onClose: () => void;
};

export default function RejectBookingPopup({ isLoading = false, onConfirm, onClose }: RejectBookingPopupProps) {
    const [reason, setReason] = useState("");
    const trimmedReason = reason.trim();

    function handleConfirm() {
        if (!trimmedReason) return;
        onConfirm(trimmedReason);
    }

    return (
        <Popup onClose={onClose}>
            <Container gap={8}>
                <Text tag="h3" weight="bold">Refuser cette demande ?</Text>
                <Text tag="p" muted>Indiquez au client la raison de ce refus.</Text>

                <Input
                    multiline
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Ex : plus de place disponible sur ce trajet"
                    disabled={isLoading}
                />

                <Container direction="row" gap={10} className={styles.actions}>
                    <Button
                        label="Annuler"
                        variant="ghost"
                        fullWidth
                        onClick={onClose}
                        disabled={isLoading}
                    />
                    <Button
                        label="Refuser"
                        variant="danger"
                        fullWidth
                        onClick={handleConfirm}
                        loading={isLoading}
                        disabled={!trimmedReason}
                    />
                </Container>
            </Container>
        </Popup>
    );
}
