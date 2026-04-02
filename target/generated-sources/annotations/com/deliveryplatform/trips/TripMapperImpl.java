package com.deliveryplatform.trips;

import com.deliveryplatform.common.addresses.Address;
import com.deliveryplatform.common.addresses.GeoAddress;
import com.deliveryplatform.trips.dto.StopRequest;
import com.deliveryplatform.trips.dto.StopResponse;
import com.deliveryplatform.trips.dto.TripRequest;
import com.deliveryplatform.trips.dto.TripResponse;
import com.deliveryplatform.users.User;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-02T06:41:51+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class TripMapperImpl implements TripMapper {

    @Override
    public TripResponse toResponse(Trip trip) {
        if ( trip == null ) {
            return null;
        }

        UUID userId = null;
        UUID id = null;
        GeoAddress departure = null;
        GeoAddress arrival = null;
        LocalDate departureDate = null;
        LocalDate arrivalDate = null;
        BigDecimal availableVolumeCm3 = null;
        BigDecimal availableWeightKg = null;
        BigDecimal pricePerKg = null;
        boolean instantBooking = false;
        TripStatus status = null;
        String notes = null;
        List<StopResponse> stops = null;

        userId = tripUserId( trip );
        id = trip.getId();
        departure = trip.getDeparture();
        arrival = trip.getArrival();
        departureDate = trip.getDepartureDate();
        arrivalDate = trip.getArrivalDate();
        availableVolumeCm3 = trip.getAvailableVolumeCm3();
        availableWeightKg = trip.getAvailableWeightKg();
        pricePerKg = trip.getPricePerKg();
        instantBooking = trip.isInstantBooking();
        status = trip.getStatus();
        notes = trip.getNotes();
        stops = tripStopListToStopResponseList( trip.getStops() );

        TripResponse tripResponse = new TripResponse( id, userId, departure, arrival, departureDate, arrivalDate, availableVolumeCm3, availableWeightKg, pricePerKg, instantBooking, status, notes, stops );

        return tripResponse;
    }

    @Override
    public Trip toEntity(TripRequest request) {
        if ( request == null ) {
            return null;
        }

        Trip.TripBuilder trip = Trip.builder();

        trip.departure( addressToGeoAddress( request.departure() ) );
        trip.arrival( addressToGeoAddress( request.arrival() ) );
        trip.departureDate( request.departureDate() );
        trip.arrivalDate( request.arrivalDate() );
        trip.availableVolumeCm3( request.availableVolumeCm3() );
        trip.availableWeightKg( request.availableWeightKg() );
        trip.pricePerKg( request.pricePerKg() );
        trip.instantBooking( request.instantBooking() );
        trip.maxDetourKm( request.maxDetourKm() );
        trip.notes( request.notes() );
        trip.stops( stopRequestListToTripStopList( request.stops() ) );

        return trip.build();
    }

    @Override
    public void updateEntity(Trip trip, TripRequest request) {
        if ( request == null ) {
            return;
        }

        if ( request.departure() != null ) {
            if ( trip.getDeparture() == null ) {
                trip.setDeparture( GeoAddress.builder().build() );
            }
            addressToGeoAddress1( request.departure(), trip.getDeparture() );
        }
        else {
            trip.setDeparture( null );
        }
        if ( request.arrival() != null ) {
            if ( trip.getArrival() == null ) {
                trip.setArrival( GeoAddress.builder().build() );
            }
            addressToGeoAddress1( request.arrival(), trip.getArrival() );
        }
        else {
            trip.setArrival( null );
        }
        trip.setDepartureDate( request.departureDate() );
        trip.setArrivalDate( request.arrivalDate() );
        trip.setAvailableVolumeCm3( request.availableVolumeCm3() );
        trip.setAvailableWeightKg( request.availableWeightKg() );
        trip.setPricePerKg( request.pricePerKg() );
        trip.setInstantBooking( request.instantBooking() );
        trip.setMaxDetourKm( request.maxDetourKm() );
        trip.setNotes( request.notes() );
        if ( trip.getStops() != null ) {
            List<TripStop> list = stopRequestListToTripStopList( request.stops() );
            if ( list != null ) {
                trip.getStops().clear();
                trip.getStops().addAll( list );
            }
            else {
                trip.setStops( null );
            }
        }
        else {
            List<TripStop> list = stopRequestListToTripStopList( request.stops() );
            if ( list != null ) {
                trip.setStops( list );
            }
        }
    }

    private UUID tripUserId(Trip trip) {
        User user = trip.getUser();
        if ( user == null ) {
            return null;
        }
        return user.getId();
    }

    protected StopResponse tripStopToStopResponse(TripStop tripStop) {
        if ( tripStop == null ) {
            return null;
        }

        UUID id = null;
        Integer stopOrder = null;
        GeoAddress address = null;

        id = tripStop.getId();
        stopOrder = tripStop.getStopOrder();
        address = tripStop.getAddress();

        StopResponse stopResponse = new StopResponse( id, stopOrder, address );

        return stopResponse;
    }

    protected List<StopResponse> tripStopListToStopResponseList(List<TripStop> list) {
        if ( list == null ) {
            return null;
        }

        List<StopResponse> list1 = new ArrayList<StopResponse>( list.size() );
        for ( TripStop tripStop : list ) {
            list1.add( tripStopToStopResponse( tripStop ) );
        }

        return list1;
    }

    protected GeoAddress addressToGeoAddress(Address address) {
        if ( address == null ) {
            return null;
        }

        GeoAddress.GeoAddressBuilder geoAddress = GeoAddress.builder();

        geoAddress.street( address.street() );
        geoAddress.city( address.city() );
        geoAddress.postalCode( address.postalCode() );
        geoAddress.country( address.country() );

        return geoAddress.build();
    }

    protected TripStop stopRequestToTripStop(StopRequest stopRequest) {
        if ( stopRequest == null ) {
            return null;
        }

        TripStop.TripStopBuilder tripStop = TripStop.builder();

        if ( stopRequest.stopOrder() != null ) {
            tripStop.stopOrder( stopRequest.stopOrder() );
        }
        tripStop.address( addressToGeoAddress( stopRequest.address() ) );

        return tripStop.build();
    }

    protected List<TripStop> stopRequestListToTripStopList(List<StopRequest> list) {
        if ( list == null ) {
            return null;
        }

        List<TripStop> list1 = new ArrayList<TripStop>( list.size() );
        for ( StopRequest stopRequest : list ) {
            list1.add( stopRequestToTripStop( stopRequest ) );
        }

        return list1;
    }

    protected void addressToGeoAddress1(Address address, GeoAddress mappingTarget) {
        if ( address == null ) {
            return;
        }

        mappingTarget.setStreet( address.street() );
        mappingTarget.setCity( address.city() );
        mappingTarget.setPostalCode( address.postalCode() );
        mappingTarget.setCountry( address.country() );
    }
}
