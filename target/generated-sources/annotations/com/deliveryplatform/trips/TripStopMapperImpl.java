package com.deliveryplatform.trips;

import com.deliveryplatform.common.addresses.Address;
import com.deliveryplatform.common.addresses.GeoAddress;
import com.deliveryplatform.trips.dto.StopRequest;
import com.deliveryplatform.trips.dto.StopResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-04T07:58:27+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class TripStopMapperImpl implements TripStopMapper {

    @Override
    public StopResponse toResponse(TripStop tripStop) {
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

    @Override
    public List<TripStop> toEntityList(List<StopRequest> request) {
        if ( request == null ) {
            return null;
        }

        List<TripStop> list = new ArrayList<TripStop>( request.size() );
        for ( StopRequest stopRequest : request ) {
            list.add( stopRequestToTripStop( stopRequest ) );
        }

        return list;
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
}
