export const paths = {
    home: "/",
    login: "/Login",
    signup: "/Signup",
    verify_email: "/verify-email",
    reset_password: "/reset-password",
    parcels_list: "/parcels",
    parcel_details: "/parcels/details",
    parcel_create: "/parcels/create",
    parcel_edit: "/parcels/:id/edit",
    trips: "/trips",
    trip_details: "/trips/:id",
    trip_create: "/trips/create",
    trip_edit: "/trips/:id/edit",
    trip_requests: "/trips/:id/requests",
    trip_bookings: "/trips/:id/bookings",
    profile: "/profile",
    user_profile: "/profile/:id",
    user_reviews: "/profile/:id/reviews",
    search: "/matching",
    booking_details: "/bookings/:id",
    booking_payment: "/bookings/:id/payment",

} as const;

export type AppPath = typeof paths[keyof typeof paths];

export function parcelEditPath(id: string): string {
    return `/parcels/${id}/edit`;
}

export function tripDetailsPath(id: string): string {
    return `/trips/${id}`;
}

export function tripEditPath(id: string): string {
    return `/trips/${id}/edit`;
}

export function tripRequestsPath(id: string): string {
    return `/trips/${id}/requests`;
}

export function tripBookingsPath(id: string): string {
    return `/trips/${id}/bookings`;
}

export function bookingDetailsPath(id: string): string {
    return `/bookings/${id}`;
}

export function bookingPaymentPath(id: string): string {
    return `/bookings/${id}/payment`;
}

export function parcelDetailsPath(id: string): string {
    return `/parcels/${id}`;
}

export function userProfilePath(id: string): string {
    return `/profile/${id}`;
}

export function userReviewsPath(id: string): string {
    return `/profile/${id}/reviews`;
}