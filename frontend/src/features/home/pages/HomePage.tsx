import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Button from "@/shared/components/button/Button.tsx";
import { ArrowUpRight, Circle } from "lucide-react";
import { paths } from "@/app/routes/paths.ts";

const ctaStyle = { fontSize: "1.4rem", padding: "15px 25px" };

export default function HomePage() {

    return (
        <Container maxWidth={1500} margin="0 auto" padding="5% 10%">

            <Container gap={0} style={{ textAlign: "center" }}>
                <Text
                    tag="p"
                    align="center"
                    weight="bold"
                    animate="fadeIn"
                    icon={<Circle size={12} fill="currentColor" />}
                    style={{
                        display: "inline-flex",
                        margin: "20px auto",
                        padding: "5px 20px",
                        borderRadius: 30,
                        background: "var(--color-chip-peach)",
                    }}
                >
                    Livraison responsable
                </Text>
                <Text
                    tag="h1"
                    align="center"
                    weight="bold"
                    animate="slideUp"
                    delay={100}
                    letterSpacing="-0.02em"
                    lineHeight={1.1}
                    style={{ padding: "20px 0", fontSize: "clamp(3rem, 2rem + 4vw, 5rem)" }}
                >
                    Envoyez vos colis, respectez la planète
                </Text>
                <Text
                    tag="p"
                    align="center"
                    animate="slideUp"
                    delay={200}
                    letterSpacing="-0.01em"
                    lineHeight={1.8}
                    maxWidth={680}
                    style={{ padding: "10px 20px", margin: "0 auto" }}
                >
                    Ecolis repense la logistique du quotidien — suivi en temps réel,
                    paiements sécurisés et trajets partagés pour livrer malin et vert.
                </Text>
            </Container>

            <Container direction="row" wrap align="center" justify="center" gap={20} padding={20}>
                <Button
                    to={paths.parcel_create}
                    label="J'envoi"
                    variant="main"
                    size="lg"
                    icon={<ArrowUpRight />}
                    iconPosition="right"
                    animate="slideUp"
                    delay={300}
                    style={ctaStyle}
                />
                <Button
                    to={paths.trip_create}
                    label="Je voyage"
                    variant="secondary"
                    size="lg"
                    icon={<ArrowUpRight />}
                    iconPosition="right"
                    animate="slideUp"
                    delay={400}
                    style={ctaStyle}
                />
            </Container>

        </Container>
    );
}
