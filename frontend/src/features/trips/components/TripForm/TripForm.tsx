import { useRef, useState } from "react";
import { Circle, MapPin } from "lucide-react";
import styles from "./TripForm.module.css";
import Input from "@/shared/components/input/Input";
import AddressForm from "@/features/address/components/AddressForm/AddressForm.tsx";
import Toggle from "@/shared/components/toggle/Toggle";
import Multistep from "@/shared/components/multistep/Multistep.tsx";
import TripStops from "@/features/trips/components/TripStops/TripStops.tsx";
import Error from "@/shared/components/error/Error.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import { addressToString } from "@/shared/utils/addressToString.ts";
import type { AddressRequest, TripCreateRequest } from "@/shared/types";
import type { AppError } from "@/shared/types/AppError";

const EMPTY_ADDRESS: AddressRequest = { street: "", city: "", postalCode: "", country: "France" };

const EMPTY_TRIP: TripCreateRequest = {
    departureAddress: EMPTY_ADDRESS,
    arrivalAddress: EMPTY_ADDRESS,
    departureDate: "",
    arrivalDate: "",
    availableWeightKg: undefined,
    pricePerKg: { amountInCents: 0, currency: "EUR" },
    instantBooking: false,
    maxDetourKm: 0,
    notes: "",
};

type TripFormProps = {
    onCreate?: (data: TripCreateRequest) => Promise<string | null>;
    onSubmit?: (data: TripCreateRequest) => void;
    onFinish?: () => void;
    isLoading?: boolean;
    error?: AppError | null;
    initialValues?: Partial<TripCreateRequest>;
    tripId?: string;
    heading?: string;
    subtitle?: string;
    submitLabel?: string;
    lockRoute?: boolean;
};

export default function TripForm({
    onCreate,
    onSubmit,
    onFinish,
    isLoading = false,
    error = null,
    initialValues,
    tripId,
    heading = "Proposer un trajet",
    subtitle = "Renseignez les détails de votre trajet ainsi que les conditions de transport",
    submitLabel = "Publier le trajet",
    lockRoute = false,
}: TripFormProps) {

    const isCreateMode = !tripId;

    const [trip, setTrip] = useState<TripCreateRequest>(() => ({ ...EMPTY_TRIP, ...initialValues }));
    const [departureLabel, setDepartureLabel] = useState(() => addressToString(initialValues?.departureAddress));
    const [arrivalLabel, setArrivalLabel] = useState(() => addressToString(initialValues?.arrivalAddress));
    const [step, setStep] = useState(0);
    const [createdTripId, setCreatedTripId] = useState<string | undefined>(tripId);
    const formRef = useRef<HTMLFormElement>(null);

    function updateField<K extends keyof TripCreateRequest>(field: K, value: TripCreateRequest[K]) {
        setTrip((prev) => ({ ...prev, [field]: value }));
    }

    async function handleNext() {
        if (formRef.current && !formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }
        if (isCreateMode && step === 2 && !createdTripId) {
            const newId = await onCreate?.(trip);
            if (!newId) return;
            setCreatedTripId(newId);
        }
        setStep((s) => Math.min(s + 1, 3));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isCreateMode) {
            onFinish?.();
        } else {
            onSubmit?.(trip);
        }
    }

    return (
        <div className={styles.container}>
            <Error error={error} showWithFieldErrors />

            <Container gap={0} className={styles.heading}>
                <Text tag="h1" weight="bold" size={2}>{heading}</Text>
                <Text tag="p" className={styles.subtitle}>{subtitle}</Text>
            </Container>

            <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
                <Multistep
                    current={step}
                    onNext={handleNext}
                    onBack={() => setStep((s) => Math.max(s - 1, 0))}
                    finishType="submit"
                    finishLabel={submitLabel}
                    isLoading={isLoading}
                    nextDisabled={isLoading}
                    steps={[
                        {
                            label: "Trajet",
                            content: (
                                <div className={styles.addresses_row}>
                                    <AddressForm
                                        id="departureAddress"
                                        icon={<Circle size={13} />}
                                        label="Départ"
                                        value={departureLabel}
                                        required
                                        disabled={lockRoute}
                                        onChange={setDepartureLabel}
                                        onSelect={(address) => updateField("departureAddress", address)}
                                        error={error?.fields.departureAddress}
                                    />
                                    <AddressForm
                                        id="arrivalAddress"
                                        icon={<MapPin size={13} />}
                                        label="Arrivée"
                                        value={arrivalLabel}
                                        required
                                        disabled={lockRoute}
                                        onChange={setArrivalLabel}
                                        onSelect={(address) => updateField("arrivalAddress", address)}
                                        error={error?.fields.arrivalAddress}
                                    />
                                </div>
                            ),
                        },
                        {
                            label: "Planning",
                            content: (
                                <div className={styles.trip_details}>
                                    <div className={styles.ligne}>
                                        <Input
                                            id="departureDate"
                                            name="departureDate"
                                            type="date"
                                            label="Date de départ"
                                            value={trip.departureDate}
                                            required
                                            disabled={lockRoute}
                                            onChange={(e) => updateField("departureDate", e.target.value)}
                                            error={error?.fields.departureDate}
                                        />
                                        <Input
                                            id="arrivalDate"
                                            name="arrivalDate"
                                            type="date"
                                            label="Date d'arrivée"
                                            value={trip.arrivalDate}
                                            required
                                            disabled={lockRoute}
                                            onChange={(e) => updateField("arrivalDate", e.target.value)}
                                            error={error?.fields.arrivalDate}
                                        />
                                    </div>

                                    <div className={styles.ligne}>
                                        <Input
                                            id="availableWeightKg"
                                            name="availableWeightKg"
                                            type="number"
                                            label="Poids disponible"
                                            placeholder="20"
                                            value={trip.availableWeightKg ? String(trip.availableWeightKg) : ""}
                                            required
                                            suffix={<span className={styles.unit}>kg</span>}
                                            onChange={(e) => updateField("availableWeightKg", e.target.value === "" ? undefined : Number(e.target.value))}
                                            error={error?.fields.availableWeightKg}
                                        />
                                        <Input
                                            id="maxDetourKm"
                                            name="maxDetourKm"
                                            type="number"
                                            label="Détour maximum"
                                            placeholder="10"
                                            value={trip.maxDetourKm ? String(trip.maxDetourKm) : ""}
                                            required
                                            suffix={<span className={styles.unit}>km</span>}
                                            onChange={(e) => updateField("maxDetourKm", e.target.value === "" ? 0 : Number(e.target.value))}
                                            error={error?.fields.maxDetourKm}
                                        />
                                    </div>
                                </div>
                            ),
                        },
                        {
                            label: "Tarif",
                            content: (
                                <div className={styles.trip_details}>
                                    <Input
                                        id="pricePerKg"
                                        name="pricePerKg"
                                        type="number"
                                        label="Prix par kg"
                                        placeholder="5.00"
                                        value={trip.pricePerKg.amountInCents ? String(trip.pricePerKg.amountInCents / 100) : ""}
                                        required
                                        suffix={<span className={styles.unit}>€/kg</span>}
                                        onChange={(e) => updateField("pricePerKg", { amountInCents: Math.round(Number(e.target.value || 0) * 100), currency: "EUR" })}
                                        error={error?.fields.pricePerKg}
                                    />

                                    <Toggle
                                        id="instantBooking"
                                        label="Réservation instantanée"
                                        description="Les colis sont acceptés automatiquement sans validation manuelle"
                                        checked={trip.instantBooking}
                                        onChange={(checked) => updateField("instantBooking", checked)}
                                    />

                                    <Input
                                        id="notes"
                                        name="notes"
                                        label="Notes (optionnel)"
                                        multiline
                                        placeholder="Précisions sur le trajet, les arrêts, etc."
                                        value={trip.notes ?? ""}
                                        onChange={(e) => updateField("notes", e.target.value)}
                                    />
                                </div>
                            ),
                        },
                        {
                            label: "Arrêts",
                            content: createdTripId ? <TripStops tripId={createdTripId} /> : null,
                        },
                    ]}
                />
            </form>
        </div>
    );
}
