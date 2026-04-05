package com.deliveryplatform.parcels;

import com.deliveryplatform.addresses.Address;
import com.deliveryplatform.addresses.GeocodedAddress;
import com.deliveryplatform.parcels.dto.ParcelRequest;
import com.deliveryplatform.parcels.dto.ParcelResponse;
import com.deliveryplatform.users.User;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-05T05:14:45+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class ParcelMapperImpl implements ParcelMapper {

    @Override
    public ParcelResponse toDto(Parcel parcel) {
        if ( parcel == null ) {
            return null;
        }

        UUID userId = null;
        UUID id = null;
        String description = null;
        BigDecimal weightKg = null;
        ParcelSize size = null;
        boolean fragile = false;
        GeocodedAddress pickupAddress = null;
        GeocodedAddress dropoffAddress = null;
        ParcelStatus status = null;
        LocalDate deadlineDate = null;
        OffsetDateTime createdAt = null;

        userId = parcelUserId( parcel );
        id = parcel.getId();
        description = parcel.getDescription();
        weightKg = parcel.getWeightKg();
        size = parcel.getSize();
        fragile = parcel.isFragile();
        pickupAddress = parcel.getPickupAddress();
        dropoffAddress = parcel.getDropoffAddress();
        status = parcel.getStatus();
        deadlineDate = parcel.getDeadlineDate();
        createdAt = parcel.getCreatedAt();

        ParcelResponse parcelResponse = new ParcelResponse( id, userId, description, weightKg, size, fragile, pickupAddress, dropoffAddress, status, deadlineDate, createdAt );

        return parcelResponse;
    }

    @Override
    public Parcel toEntity(ParcelRequest parcelRequest) {
        if ( parcelRequest == null ) {
            return null;
        }

        Parcel.ParcelBuilder parcel = Parcel.builder();

        parcel.description( parcelRequest.description() );
        parcel.weightKg( parcelRequest.weightKg() );
        parcel.size( parcelRequest.size() );
        parcel.fragile( parcelRequest.fragile() );
        parcel.deadlineDate( parcelRequest.deadlineDate() );
        parcel.pickupAddress( addressToGeocodedAddress( parcelRequest.pickupAddress() ) );
        parcel.dropoffAddress( addressToGeocodedAddress( parcelRequest.dropoffAddress() ) );

        return parcel.build();
    }

    @Override
    public void updateEntity(Parcel parcel, ParcelRequest request) {
        if ( request == null ) {
            return;
        }

        parcel.setDescription( request.description() );
        parcel.setWeightKg( request.weightKg() );
        parcel.setSize( request.size() );
        parcel.setFragile( request.fragile() );
        parcel.setDeadlineDate( request.deadlineDate() );
        if ( request.pickupAddress() != null ) {
            if ( parcel.getPickupAddress() == null ) {
                parcel.setPickupAddress( GeocodedAddress.builder().build() );
            }
            addressToGeocodedAddress1( request.pickupAddress(), parcel.getPickupAddress() );
        }
        else {
            parcel.setPickupAddress( null );
        }
        if ( request.dropoffAddress() != null ) {
            if ( parcel.getDropoffAddress() == null ) {
                parcel.setDropoffAddress( GeocodedAddress.builder().build() );
            }
            addressToGeocodedAddress1( request.dropoffAddress(), parcel.getDropoffAddress() );
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

    protected GeocodedAddress addressToGeocodedAddress(Address address) {
        if ( address == null ) {
            return null;
        }

        GeocodedAddress.GeocodedAddressBuilder geocodedAddress = GeocodedAddress.builder();

        geocodedAddress.street( address.street() );
        geocodedAddress.city( address.city() );
        geocodedAddress.postalCode( address.postalCode() );
        geocodedAddress.country( address.country() );

        return geocodedAddress.build();
    }

    protected void addressToGeocodedAddress1(Address address, GeocodedAddress mappingTarget) {
        if ( address == null ) {
            return;
        }

        mappingTarget.setStreet( address.street() );
        mappingTarget.setCity( address.city() );
        mappingTarget.setPostalCode( address.postalCode() );
        mappingTarget.setCountry( address.country() );
    }
}
