package com.deliveryplatform.trips;

import com.deliveryplatform.common.addresses.Address;
import com.deliveryplatform.common.addresses.GeoAddress;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-25T02:19:10+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class TripStopMapperImpl implements TripStopMapper {

    @Override
    public TripStopDto.StopResponse toResponse(TripStop tripStop) {
        if ( tripStop == null ) {
            return null;
        }

        UUID id = null;
        Integer stopOrder = null;
        GeoAddress address = null;

        id = tripStop.getId();
        stopOrder = tripStop.getStopOrder();
        address = tripStop.getAddress();

        TripStopDto.StopResponse stopResponse = new TripStopDto.StopResponse( id, stopOrder, address );

        return stopResponse;
    }

    @Override
    public TripStop toEntity(TripStopDto.StopRequest request) {
        if ( request == null ) {
            return null;
        }

        TripStop.TripStopBuilder tripStop = TripStop.builder();

        if ( request.stopOrder() != null ) {
            tripStop.stopOrder( request.stopOrder() );
        }
        tripStop.address( addressToGeoAddress( request.address() ) );

        return tripStop.build();
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
}
