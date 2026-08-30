import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { CheckCircle2, CreditCard, XCircle } from "lucide-react";
import styles from "./PaymentPage.module.css";
import Container from "@/shared/components/container/Container.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Popup from "@/shared/components/popup/Popup.tsx";
import useCreateCheckout from "@/features/payments/hooks/useCreateCheckout.ts";
import { stripePromise } from "@/app/config/stripe.config.ts";
import { bookingDetailsPath } from "@/app/routes/paths.ts";

export default function PaymentPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { createCheckout, isLoading } = useCreateCheckout();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [failed, setFailed] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    useEffect(() => {
        if (!id) return;

        createCheckout(id).then((result) => {
            if (result?.clientSecret) {
                setClientSecret(result.clientSecret);
            } else {
                setFailed(true);
            }
        });
    }, [id, createCheckout]);

    function handleComplete() {
        void queryClient.invalidateQueries({ queryKey: ["booking", id] });
        setSucceeded(true);
    }

    function goToBooking() {
        navigate(bookingDetailsPath(id ?? ""), { replace: true });
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.iconBadge}>
                        <CreditCard size={26} />
                    </div>
                    <Text tag="h2" weight="bold">Paiement</Text>
                </div>

                {!failed && (isLoading || !clientSecret) && (
                    <Container direction="row" align="center" justify="center" minHeight={200}>
                        <Spinner />
                    </Container>
                )}

                {!failed && clientSecret && (
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={{ clientSecret, onComplete: handleComplete }}
                    >
                        <EmbeddedCheckout className={styles.checkout} />
                    </EmbeddedCheckoutProvider>
                )}
            </div>

            {failed && (
                <Popup onClose={goToBooking}>
                    <Container gap={12} align="center">
                        <XCircle size={40} className={styles.errorIcon} />
                        <Text tag="h3" weight="bold" align="center">Le paiement a échoué</Text>
                        <Text tag="p" muted align="center">Impossible d'initialiser le paiement. Veuillez réessayer.</Text>
                        <Button label="Retour à la réservation" variant="ghost" fullWidth onClick={goToBooking} />
                    </Container>
                </Popup>
            )}

            {succeeded && (
                <Popup onClose={goToBooking}>
                    <Container gap={12} align="center">
                        <CheckCircle2 size={40} className={styles.successIcon} />
                        <Text tag="h3" weight="bold" align="center">Paiement réussi</Text>
                        <Text tag="p" muted align="center">Votre demande a bien été envoyée au livreur.</Text>
                        <Button label="Voir ma réservation" variant="main" fullWidth onClick={goToBooking} />
                    </Container>
                </Popup>
            )}
        </div>
    );
}
