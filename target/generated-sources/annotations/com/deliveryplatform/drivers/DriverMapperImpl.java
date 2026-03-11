package com.deliveryplatform.drivers;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-11T16:19:14+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class DriverMapperImpl implements DriverMapper {

    @Override
    public DriverDto toDto(DriverProfile driverProfile) {
        if ( driverProfile == null ) {
            return null;
        }

        DriverDto.DriverDtoBuilder driverDto = DriverDto.builder();

        driverDto.totalDeliveries( driverProfile.getTotalDeliveries() );
        driverDto.vehicleType( driverProfile.getVehicleType() );

        return driverDto.build();
    }
}
