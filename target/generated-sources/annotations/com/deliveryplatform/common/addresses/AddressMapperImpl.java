package com.deliveryplatform.common.addresses;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-25T17:53:49+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class AddressMapperImpl implements AddressMapper {

    @Override
    public GeoAddress toEntity(Address request) {
        if ( request == null ) {
            return null;
        }

        GeoAddress.GeoAddressBuilder geoAddress = GeoAddress.builder();

        geoAddress.street( request.street() );
        geoAddress.city( request.city() );
        geoAddress.postalCode( request.postalCode() );
        geoAddress.country( request.country() );

        return geoAddress.build();
    }
}
