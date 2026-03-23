package com.deliveryplatform.parcels;

import com.deliveryplatform.common.addresses.Address;
import com.deliveryplatform.common.addresses.AddressRequest;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-23T23:15:37+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class ParcelMapperImpl implements ParcelMapper {

    @Override
    public ParcelDto.ParcelResponse toDto(Parcel parcel) {
        if ( parcel == null ) {
            return null;
        }

        UUID id = null;
        String description = null;
        BigDecimal weightKg = null;
        ParcelSize size = null;
        BigDecimal price = null;
        boolean fragile = false;
        Address pickupAddress = null;
        Address dropoffAddress = null;
        ParcelStatus status = null;
        LocalDate deadlineDate = null;
        OffsetDateTime createdAt = null;

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

        ParcelDto.ParcelResponse parcelResponse = new ParcelDto.ParcelResponse( id, description, weightKg, size, price, fragile, pickupAddress, dropoffAddress, status, deadlineDate, createdAt );

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
        parcel.pickupAddress( addressRequestToAddress( parcelRequest.pickupAddress() ) );
        parcel.dropoffAddress( addressRequestToAddress( parcelRequest.dropoffAddress() ) );

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
                parcel.setPickupAddress( Address.builder().build() );
            }
            addressRequestToAddress1( request.pickupAddress(), parcel.getPickupAddress() );
        }
        else {
            parcel.setPickupAddress( null );
        }
        if ( request.dropoffAddress() != null ) {
            if ( parcel.getDropoffAddress() == null ) {
                parcel.setDropoffAddress( Address.builder().build() );
            }
            addressRequestToAddress1( request.dropoffAddress(), parcel.getDropoffAddress() );
        }
        else {
            parcel.setDropoffAddress( null );
        }
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
