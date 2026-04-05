package com.deliveryplatform.addresses;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-05T15:39:04+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class AddressMapperImpl implements AddressMapper {

    @Override
    public GeocodedAddress toGeocodedAddress(Address address, double latitude, double longitude) {
        if ( address == null ) {
            return null;
        }

        GeocodedAddress.GeocodedAddressBuilder geocodedAddress = GeocodedAddress.builder();

        if ( address != null ) {
            geocodedAddress.street( address.street() );
            geocodedAddress.city( address.city() );
            geocodedAddress.postalCode( address.postalCode() );
            geocodedAddress.country( address.country() );
        }
        geocodedAddress.latitude( latitude );
        geocodedAddress.longitude( longitude );

        return geocodedAddress.build();
    }
}
