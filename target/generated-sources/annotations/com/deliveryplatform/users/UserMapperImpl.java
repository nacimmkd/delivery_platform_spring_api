package com.deliveryplatform.users;

import com.deliveryplatform.profiles.Profile;
import com.deliveryplatform.profiles.dto.ProfileRequest;
import com.deliveryplatform.profiles.dto.ProfileResponse;
import com.deliveryplatform.users.dto.UserRequest;
import com.deliveryplatform.users.dto.UserResponse;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-05T05:14:45+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponse toDto(User user) {
        if ( user == null ) {
            return null;
        }

        UUID id = null;
        String email = null;
        Role role = null;
        LocalDateTime registeredAt = null;
        ProfileResponse profile = null;

        id = user.getId();
        email = user.getEmail();
        role = user.getRole();
        registeredAt = user.getRegisteredAt();
        profile = profileToProfileResponse( user.getProfile() );

        boolean isVerified = false;
        boolean isActive = false;

        UserResponse userResponse = new UserResponse( id, email, role, isVerified, isActive, registeredAt, profile );

        return userResponse;
    }

    @Override
    public User toEntity(UserRequest request) {
        if ( request == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.email( request.email() );
        user.password( request.password() );
        user.profile( profileRequestToProfile( request.profile() ) );

        return user.build();
    }

    protected ProfileResponse profileToProfileResponse(Profile profile) {
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

        ProfileResponse profileResponse = new ProfileResponse( firstName, lastName, phone, avgRating, totalDeliveries, totalOrders, iban );

        return profileResponse;
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
