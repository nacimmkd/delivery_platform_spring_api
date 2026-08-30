import {ArrowUpRight} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MatchResult.module.css"
import type {MatchResultDto} from "@/shared/types";
import Divider from "@/shared/components/divider/Divider.tsx";
import Price from "@/shared/components/price/Price.tsx";
import { bookingDetailsPath, userProfilePath } from "@/app/routes/paths.ts";
import UserBrief from "@/features/profile/components/UserBrief/UserBrief.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import Itinerary from "@/shared/components/itinerary/Itinerary.tsx";
import useCreateBooking from "@/features/booking/hooks/useCreateBooking.ts";

type SearchResultProps = {
    result: MatchResultDto;
    parcelId: string;
}

export default function MatchResult({ result, parcelId }: SearchResultProps) {

    const { trip, owner, price } = result;
    const instantBooking = trip?.instantBooking;
    const navigate = useNavigate();
    const { createBooking, isLoading: isBooking } = useCreateBooking();

    async function handleReserve() {
        if (!trip?.tripId || !parcelId) return;
        const booking = await createBooking(trip.tripId, parcelId);
        if (booking?.bookingId) navigate(bookingDetailsPath(booking.bookingId));
    }

    return (
        <div className={styles.container}>
            {instantBooking && <Tag className={styles.tag} value="Instantané" variant="accent"/>}
            <div className={styles.left_container}>
                <Itinerary
                    departure={trip?.departure}
                    arrival={trip?.arrival}
                    departureDate={trip?.departureDate}
                    arrivalDate={trip?.arrivalDate}
                />
            </div>

            <Divider orientation="vertical" className={styles.divider} />

            <Link to={userProfilePath(owner?.userId ?? "")} className={styles.middle_container}>
                {owner && <UserBrief user={owner} />}
            </Link>

            <Divider orientation="vertical" className={styles.divider} />

            <div className={styles.right_container}>
                <div className={styles.price_container}>
                    <Price totalPrice={price}
                           pricePerKg={trip?.pricePerKg}
                           label="Prix total"
                           align="right"/>
                </div>

                <Button label={"Réserver"}
                        className={styles.button}
                        fullWidth
                        icon={<ArrowUpRight />}
                        iconPosition="right"
                        animate="slideUp"
                        delay={400}
                        loading={isBooking}
                        disabled={!trip?.tripId || !parcelId}
                        onClick={handleReserve}/>
            </div>
        </div>
    )
}
