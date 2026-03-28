package com.deliveryplatform.profiles;

import com.deliveryplatform.profiles.dto.ProfileRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-26T16:46:40+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class ProfileMapperImpl implements ProfileMapper {

    @Override
    public Profile toEntity(ProfileRequest profileRequest) {
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
