package com.deliveryplatform.bookings;

import com.deliveryplatform.bookings.dto.BookingRequest;
import com.deliveryplatform.bookings.dto.BookingResponse;
import com.deliveryplatform.parcels.Parcel;
import com.deliveryplatform.trips.Trip;
import com.deliveryplatform.users.User;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-01T04:23:10+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class BookingMapperImpl implements BookingMapper {

    @Override
    public BookingResponse toDto(Booking booking) {
        if ( booking == null ) {
            return null;
        }

        UUID tripId = null;
        UUID parcelId = null;
        UUID requesterId = null;
        UUID id = null;
        BookingStatus status = null;
        BigDecimal price = null;
        OffsetDateTime acceptedAt = null;
        OffsetDateTime completedAt = null;
        OffsetDateTime createdAt = null;

        tripId = bookingTripId( booking );
        parcelId = bookingParcelId( booking );
        requesterId = bookingRequesterId( booking );
        id = booking.getId();
        status = booking.getStatus();
        price = booking.getPrice();
        acceptedAt = booking.getAcceptedAt();
        completedAt = booking.getCompletedAt();
        createdAt = booking.getCreatedAt();

        BookingResponse bookingResponse = new BookingResponse( id, tripId, parcelId, requesterId, status, price, acceptedAt, completedAt, createdAt );

        return bookingResponse;
    }

    @Override
    public Booking toEntity(BookingRequest bookingRequest) {
        if ( bookingRequest == null ) {
            return null;
        }

        Booking.BookingBuilder booking = Booking.builder();

        return booking.build();
    }

    private UUID bookingTripId(Booking booking) {
        Trip trip = booking.getTrip();
        if ( trip == null ) {
            return null;
        }
        return trip.getId();
    }

    private UUID bookingParcelId(Booking booking) {
        Parcel parcel = booking.getParcel();
        if ( parcel == null ) {
            return null;
        }
        return parcel.getId();
    }

    private UUID bookingRequesterId(Booking booking) {
        User requester = booking.getRequester();
        if ( requester == null ) {
            return null;
        }
        return requester.getId();
    }
}
