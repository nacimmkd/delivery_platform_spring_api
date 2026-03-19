package com.deliveryplatform.parcels;

import com.deliveryplatform.addresses.Address;
import com.deliveryplatform.addresses.AddressDto;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-19T04:22:34+0100",
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
        UUID userId = null;
        String description = null;
        BigDecimal weightKg = null;
        BigDecimal lengthCm = null;
        BigDecimal widthCm = null;
        BigDecimal heightCm = null;
        AddressDto.AddressResponse pickupAddress = null;
        AddressDto.AddressResponse dropoffAddress = null;
        ParcelStatus status = null;
        LocalDate deadlineDate = null;
        OffsetDateTime createdAt = null;

        id = parcel.getId();
        userId = parcel.getUserId();
        description = parcel.getDescription();
        weightKg = parcel.getWeightKg();
        lengthCm = parcel.getLengthCm();
        widthCm = parcel.getWidthCm();
        heightCm = parcel.getHeightCm();
        pickupAddress = addressToAddressResponse( parcel.getPickupAddress() );
        dropoffAddress = addressToAddressResponse( parcel.getDropoffAddress() );
        status = parcel.getStatus();
        deadlineDate = parcel.getDeadlineDate();
        createdAt = parcel.getCreatedAt();

        boolean isFragile = false;

        ParcelDto.ParcelResponse parcelResponse = new ParcelDto.ParcelResponse( id, userId, description, weightKg, lengthCm, widthCm, heightCm, isFragile, pickupAddress, dropoffAddress, status, deadlineDate, createdAt );

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
        parcel.lengthCm( parcelRequest.lengthCm() );
        parcel.widthCm( parcelRequest.widthCm() );
        parcel.heightCm( parcelRequest.heightCm() );
        parcel.isFragile( parcelRequest.isFragile() );
        parcel.deadlineDate( parcelRequest.deadlineDate() );
        parcel.pickupAddress( addressRequestToAddress( parcelRequest.pickupAddress() ) );
        parcel.dropoffAddress( addressRequestToAddress( parcelRequest.dropoffAddress() ) );

        return parcel.build();
    }

    protected AddressDto.AddressResponse addressToAddressResponse(Address address) {
        if ( address == null ) {
            return null;
        }

        String street = null;
        String city = null;
        String postalCode = null;
        String country = null;
        BigDecimal lat = null;
        BigDecimal lng = null;

        street = address.getStreet();
        city = address.getCity();
        postalCode = address.getPostalCode();
        country = address.getCountry();
        lat = address.getLat();
        lng = address.getLng();

        AddressDto.AddressResponse addressResponse = new AddressDto.AddressResponse( street, city, postalCode, country, lat, lng );

        return addressResponse;
    }

    protected Address addressRequestToAddress(AddressDto.AddressRequest addressRequest) {
        if ( addressRequest == null ) {
            return null;
        }

        Address.AddressBuilder address = Address.builder();

        address.street( addressRequest.street() );
        address.city( addressRequest.city() );
        address.postalCode( addressRequest.postalCode() );
        address.country( addressRequest.country() );
        address.lat( addressRequest.lat() );
        address.lng( addressRequest.lng() );

        return address.build();
    }
}
