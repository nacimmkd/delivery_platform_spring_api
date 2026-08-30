import styles from "./VerifyEmailForm.module.css";
import { Mail } from "lucide-react";
import Button from "@/shared/components/button/Button";
import Text from "@/shared/components/text/Text";
import Error from "@/shared/components/error/Error.tsx";
import Container from "@/shared/components/container/Container.tsx";
import type { AppError } from "@/shared/types/AppError";

type VerifyFormProps = {
    email: string | null;
    sent: boolean;
    isLoading: boolean;
    error: AppError | null;
    onSend: () => void;
};

export default function VerifyEmailForm({ email, sent, isLoading, error, onSend }: VerifyFormProps) {

    if (!sent) {
        return (
            <Container variant="elevated" maxWidth={420} gap={22} className={styles.container}>

                <Error error={error} />

                <Container gap={0} className={styles.heading}>
                    <Text tag="h1" weight="bold" size={2}>Vérifiez votre email</Text>
                    <Text tag="p" muted>
                        Nous allons envoyer un lien de vérification à {email}
                    </Text>
                </Container>

                <Button
                    label="Envoyer le lien"
                    variant="main"
                    fullWidth
                    icon={<Mail size={20} />}
                    iconPosition="left"
                    loading={isLoading}
                    onClick={onSend}
                />

            </Container>
        );
    }

    return (
        <Container variant="elevated" maxWidth={420} gap={22} className={styles.container}>

            <Container gap={0} className={styles.heading}>
                <Text tag="h1" weight="bold" size={2}>Vérifiez votre boîte mail</Text>
                <Text tag="p" muted>
                    Un lien de vérification a été envoyé à {email}. Cliquez dessus pour activer votre compte.
                </Text>
            </Container>

            <Error error={error} />

            <Text tag="p" align="center" muted>
                Pas reçu ?{" "}
                <Text tag="span" onClick={onSend} className={styles.resend}>
                    Renvoyer
                </Text>
            </Text>

        </Container>
    );
}