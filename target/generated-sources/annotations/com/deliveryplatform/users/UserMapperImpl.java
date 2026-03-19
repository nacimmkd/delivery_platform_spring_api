package com.deliveryplatform.users;

import com.deliveryplatform.profiles.Profile;
import com.deliveryplatform.profiles.ProfileDto;
import com.deliveryplatform.profiles.ProfileRequest;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-19T04:22:34+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toDto(User user) {
        if ( user == null ) {
            return null;
        }

        UUID id = null;
        String email = null;
        Role role = null;
        LocalDateTime registeredAt = null;
        ProfileDto profile = null;

        id = user.getId();
        email = user.getEmail();
        role = user.getRole();
        registeredAt = user.getRegisteredAt();
        profile = profileToProfileDto( user.getProfile() );

        boolean isVerified = false;
        boolean isActive = false;

        UserDto userDto = new UserDto( id, email, role, isVerified, isActive, registeredAt, profile );

        return userDto;
    }

    @Override
    public User toEntity(RegisterUserRequest registerUserRequest) {
        if ( registerUserRequest == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.email( registerUserRequest.email() );
        user.password( registerUserRequest.password() );
        user.profile( profileRequestToProfile( registerUserRequest.profile() ) );

        return user.build();
    }

    protected ProfileDto profileToProfileDto(Profile profile) {
        if ( profile == null ) {
            return null;
        }

        String firstName = null;
        String lastName = null;
        String phone = null;
        BigDecimal avgRating = null;
        int totalDeliveries = 0;
        int totalOrders = 0;
        String iban = null;

        firstName = profile.getFirstName();
        lastName = profile.getLastName();
        phone = profile.getPhone();
        avgRating = profile.getAvgRating();
        totalDeliveries = profile.getTotalDeliveries();
        totalOrders = profile.getTotalOrders();
        iban = profile.getIban();

        ProfileDto profileDto = new ProfileDto( firstName, lastName, phone, avgRating, totalDeliveries, totalOrders, iban );

        return profileDto;
    }

    protected Profile profileRequestToProfile(ProfileRequest profileRequest) {
        if ( profileRequest == null ) {
            return null;
        }

        Profile.ProfileBuilder profile = Profile.builder();

        profile.firstName( profileRequest.firstName() );
        profile.lastName( profileRequest.lastName() );
        profile.phone( profileRequest.phone() );
        profile.iban( profileRequest.iban() );

        return profile.build();
    }
}
