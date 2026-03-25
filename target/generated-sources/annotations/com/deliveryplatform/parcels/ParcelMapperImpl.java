package com.deliveryplatform.parcels;

import com.deliveryplatform.common.addresses.Address;
import com.deliveryplatform.common.addresses.GeoAddress;
import com.deliveryplatform.users.User;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-25T01:34:00+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class ParcelMapperImpl implements ParcelMapper {

    @Override
    public ParcelDto.ParcelResponse toDto(Parcel parcel) {
        if ( parcel == null ) {
            return null;
        }

        UUID userId = null;
        UUID id = null;
        String description = null;
        BigDecimal weightKg = null;
        ParcelSize size = null;
        BigDecimal price = null;
        boolean fragile = false;
        GeoAddress pickupAddress = null;
        GeoAddress dropoffAddress = null;
        ParcelStatus status = null;
        LocalDate deadlineDate = null;
        OffsetDateTime createdAt = null;

        userId = parcelUserId( parcel );
        id = parcel.getId();
        description = parcel.getDescription();
        weightKg = parcel.getWeightKg();
        size = parcel.getSize();
        price = parcel.getPrice();
        fragile = parcel.isFragile();
        pickupAddress = parcel.getPickupAddress();
        dropoffAddress = parcel.getDropoffAddress();
        status = parcel.getStatus();
        deadlineDate = parcel.getDeadlineDate();
        createdAt = parcel.getCreatedAt();

        ParcelDto.ParcelResponse parcelResponse = new ParcelDto.ParcelResponse( id, userId, description, weightKg, size, price, fragile, pickupAddress, dropoffAddress, status, deadlineDate, createdAt );

        return parcelResponse;
    }

    @Override
    public Parcel toEntity(ParcelDto.ParcelRequest parcelRequest) {
        if ( parcelRequest == null ) {
            return null;
        }

        Parcel.ParcelBuilder parcel = Parcel.builder();

        parcel.description( parcelRequest.description() );
        parcel.weightKg( parcelRequest.weightKg() );
        parcel.size( parcelRequest.size() );
        parcel.fragile( parcelRequest.fragile() );
        parcel.price( parcelRequest.price() );
        parcel.deadlineDate( parcelRequest.deadlineDate() );
        parcel.pickupAddress( addressToGeoAddress( parcelRequest.pickupAddress() ) );
        parcel.dropoffAddress( addressToGeoAddress( parcelRequest.dropoffAddress() ) );

        return parcel.build();
    }

    @Override
    public void updateEntity(Parcel parcel, ParcelDto.ParcelRequest request) {
        if ( request == null ) {
            return;
        }

        parcel.setDescription( request.description() );
        parcel.setWeightKg( request.weightKg() );
        parcel.setSize( request.size() );
        parcel.setFragile( request.fragile() );
        parcel.setPrice( request.price() );
        parcel.setDeadlineDate( request.deadlineDate() );
        if ( request.pickupAddress() != null ) {
            if ( parcel.getPickupAddress() == null ) {
                parcel.setPickupAddress( GeoAddress.builder().build() );
            }
            addressToGeoAddress1( request.pickupAddress(), parcel.getPickupAddress() );
        }
        else {
            parcel.setPickupAddress( null );
        }
        if ( request.dropoffAddress() != null ) {
            if ( parcel.getDropoffAddress() == null ) {
                parcel.setDropoffAddress( GeoAddress.builder().build() );
            }
            addressToGeoAddress1( request.dropoffAddress(), parcel.getDropoffAddress() );
        }
        else {
            parcel.setDropoffAddress( null );
        }
    }

    private UUID parcelUserId(Parcel parcel) {
        User user = parcel.getUser();
        if ( user == null ) {
            return null;
        }
        return user.getId();
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
