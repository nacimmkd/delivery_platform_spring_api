package com.deliveryplatform.trips;

import com.deliveryplatform.common.addresses.Address;
import com.deliveryplatform.common.addresses.AddressRequest;
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
    date = "2026-03-24T05:17:54+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class TripMapperImpl implements TripMapper {

    @Override
    public TripDto.TripResponse toResponse(Trip trip) {
        if ( trip == null ) {
            return null;
        }

        UUID userId = null;
        UUID id = null;
        Address departure = null;
        Address arrival = null;
        LocalDate departureDate = null;
        LocalDate arrivalDate = null;
        BigDecimal maxVolumeM3 = null;
        BigDecimal maxWeightKg = null;
        BigDecimal price = null;
        TripStatus status = null;
        String notes = null;
        List<TripStopDto.StopResponse> stops = null;

        userId = tripUserId( trip );
        id = trip.getId();
        departure = trip.getDeparture();
        arrival = trip.getArrival();
        departureDate = trip.getDepartureDate();
        arrivalDate = trip.getArrivalDate();
        maxVolumeM3 = trip.getMaxVolumeM3();
        maxWeightKg = trip.getMaxWeightKg();
        price = trip.getPrice();
        status = trip.getStatus();
        notes = trip.getNotes();
        stops = tripStopListToStopResponseList( trip.getStops() );

        TripDto.TripResponse tripResponse = new TripDto.TripResponse( id, userId, departure, arrival, departureDate, arrivalDate, maxVolumeM3, maxWeightKg, price, status, notes, stops );

        return tripResponse;
    }

    @Override
    public Trip toEntity(TripDto.TripRequest request) {
        if ( request == null ) {
            return null;
        }

        Trip.TripBuilder trip = Trip.builder();

        trip.departure( addressRequestToAddress( request.departure() ) );
        trip.arrival( addressRequestToAddress( request.arrival() ) );
        trip.departureDate( request.departureDate() );
        trip.arrivalDate( request.arrivalDate() );
        trip.maxVolumeM3( request.maxVolumeM3() );
        trip.maxWeightKg( request.maxWeightKg() );
        trip.price( request.price() );
        trip.maxDetourKm( request.maxDetourKm() );
        trip.notes( request.notes() );
        trip.stops( stopRequestListToTripStopList( request.stops() ) );

        return trip.build();
    }

    @Override
    public void updateEntity(Trip trip, TripDto.TripRequest request) {
        if ( request == null ) {
            return;
        }

        if ( request.departure() != null ) {
            if ( trip.getDeparture() == null ) {
                trip.setDeparture( Address.builder().build() );
            }
            addressRequestToAddress1( request.departure(), trip.getDeparture() );
        }
        else {
            trip.setDeparture( null );
        }
        if ( request.arrival() != null ) {
            if ( trip.getArrival() == null ) {
                trip.setArrival( Address.builder().build() );
            }
            addressRequestToAddress1( request.arrival(), trip.getArrival() );
        }
        else {
            trip.setArrival( null );
        }
        trip.setDepartureDate( request.departureDate() );
        trip.setArrivalDate( request.arrivalDate() );
        trip.setMaxVolumeM3( request.maxVolumeM3() );
        trip.setMaxWeightKg( request.maxWeightKg() );
        trip.setPrice( request.price() );
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

    protected TripStopDto.StopResponse tripStopToStopResponse(TripStop tripStop) {
        if ( tripStop == null ) {
            return null;
        }

        UUID id = null;
        Integer stopOrder = null;
        Address address = null;

        id = tripStop.getId();
        stopOrder = tripStop.getStopOrder();
        address = tripStop.getAddress();

        TripStopDto.StopResponse stopResponse = new TripStopDto.StopResponse( id, stopOrder, address );

        return stopResponse;
    }

    protected List<TripStopDto.StopResponse> tripStopListToStopResponseList(List<TripStop> list) {
        if ( list == null ) {
            return null;
        }

        List<TripStopDto.StopResponse> list1 = new ArrayList<TripStopDto.StopResponse>( list.size() );
        for ( TripStop tripStop : list ) {
            list1.add( tripStopToStopResponse( tripStop ) );
        }

        return list1;
    }

    protected Address addressRequestToAddress(AddressRequest addressRequest) {
        if ( addressRequest == null ) {
            return null;
        }

        Address.AddressBuilder address = Address.builder();

        address.street( addressRequest.street() );
        address.city( addressRequest.city() );
        address.postalCode( addressRequest.postalCode() );
        address.country( addressRequest.country() );

        return address.build();
    }

    protected TripStop stopRequestToTripStop(TripStopDto.StopRequest stopRequest) {
        if ( stopRequest == null ) {
            return null;
        }

        TripStop.TripStopBuilder tripStop = TripStop.builder();

        if ( stopRequest.stopOrder() != null ) {
            tripStop.stopOrder( stopRequest.stopOrder() );
        }
        tripStop.address( addressRequestToAddress( stopRequest.address() ) );

        return tripStop.build();
    }

    protected List<TripStop> stopRequestListToTripStopList(List<TripStopDto.StopRequest> list) {
        if ( list == null ) {
            return null;
        }

        List<TripStop> list1 = new ArrayList<TripStop>( list.size() );
        for ( TripStopDto.StopRequest stopRequest : list ) {
            list1.add( stopRequestToTripStop( stopRequest ) );
        }

        return list1;
    }

    protected void addressRequestToAddress1(AddressRequest addressRequest, Address mappingTarget) {
        if ( addressRequest == null ) {
            return;
        }

        mappingTarget.setStreet( addressRequest.street() );
        mappingTarget.setCity( addressRequest.city() );
        mappingTarget.setPostalCode( addressRequest.postalCode() );
        mappingTarget.setCountry( addressRequest.country() );
    }
}
