import { useState } from "react";
import { CreditCard, KeyRound, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ParcelBookingCard.module.css";
import Price from "@/shared/components/price/Price.tsx";
import Divider from "@/shared/components/divider/Divider.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import UserBrief from "@/features/profile/components/UserBrief/UserBrief.tsx";
import Itinerary from "@/shared/components/itinerary/Itinerary.tsx";
import BookingCodePopup from "@/features/booking/components/BookingCodePopup/BookingCodePopup.tsx";
import CreateReviewPopup from "@/features/reviews/components/CreateReviewPopup/CreateReviewPopup.tsx";
import bookingStateLabel from "@/shared/utils/bookingStateLabel.ts";
import { bookingDetailsPath, bookingPaymentPath, userProfilePath } from "@/app/routes/paths.ts";
import type { ParcelBookingDto, ParcelSummary } from "@/shared/types";

type ParcelBookingCardProps = {
    booking: ParcelBookingDto;
    parcelState?: ParcelSummary["state"];
};

export default function ParcelBookingCard({ booking, parcelState }: ParcelBookingCardProps) {
    const navigate = useNavigate();
    const [showCode, setShowCode] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const isCancelled = booking.state === "CANCELLED";
    const canPay = booking.state === "PENDING";
    const canPickUp = booking.state === "ACCEPTED";
    const canReview = booking.state === "COMPLETED";
    const isPickedUp = parcelState != null && parcelState !== "PUBLISHED" && parcelState !== "BOOKED";
    const code = isPickedUp ? booking.dropOffCode : booking.pickupCode;

    function handleClick() {
        if (isCancelled || !booking.bookingId) return;
        navigate(bookingDetailsPath(booking.bookingId));
    }

    return (
        <div
            className={`${styles.container} ${isCancelled ? "" : styles.clickable}`}
            onClick={handleClick}
        >
            <Tag className={styles.tag} value={bookingStateLabel(booking.state)} />

            <div className={styles.left_container}>
                <Itinerary
                    departure={booking.trip?.departure}
                    arrival={booking.trip?.arrival}
                    departureDate={booking.trip?.departureDate}
                    arrivalDate={booking.trip?.arrivalDate}
                />
            </div>

            <Divider orientation="vertical" className={styles.divider} />

            <Link
                to={userProfilePath(booking.carrier?.userId ?? "")}
                className={styles.middle_container}
                onClick={(e) => e.stopPropagation()}
            >
                {booking.carrier && <UserBrief user={booking.carrier} />}
            </Link>

            <Divider orientation="vertical" className={styles.divider} />

            <div className={styles.right_container}>
                <div className={styles.price_container}>
                    <Price totalPrice={booking.price} label="Prix total" align="right" />
                </div>

                {canPay && (
                    <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
                        <Button
                            to={bookingPaymentPath(booking.bookingId ?? "")}
                            label="Payer"
                            fullWidth
                            icon={<CreditCard size={18} />}
                            iconPosition="right"
                        />
                    </div>
                )}

                {canPickUp && (
                    <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
                        <Button
                            label="Récupérer le code"
                            variant="secondary"
                            fullWidth
                            icon={<KeyRound size={18} />}
                            iconPosition="right"
                            onClick={() => setShowCode(true)}
                        />

                        {showCode && (
                            <BookingCodePopup
                                title={isPickedUp ? "Code de livraison" : "Code de retrait"}
                                description={
                                    isPickedUp
                                        ? "Communiquez ce code au livreur pour confirmer la livraison du colis."
                                        : "Communiquez ce code au livreur pour confirmer la récupération du colis."
                                }
                                code={code ?? "Code indisponible"}
                                onClose={() => setShowCode(false)}
                            />
                        )}
                    </div>
                )}

                {canReview && (
                    <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
                        <Button
                            label="Laisser un avis"
                            variant="secondary"
                            fullWidth
                            icon={<Star size={18} />}
                            iconPosition="right"
                            onClick={() => setShowReview(true)}
                        />

                        {showReview && (
                            <CreateReviewPopup
                                bookingId={booking.bookingId ?? ""}
                                onClose={() => setShowReview(false)}
                                onSuccess={() => setShowReview(false)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
