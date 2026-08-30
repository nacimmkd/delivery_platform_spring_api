import type { components } from "./api.d.ts";

// --- Auth ---
export type AuthRequest              = components["schemas"]["AuthRequest"];
export type UserCreateRequest        = components["schemas"]["UserCreateRequest"];
export type UpdatePasswordRequest    = components["schemas"]["UpdatePasswordRequest"];
export type RequestEmailVerification = components["schemas"]["RequestEmailVerification"];
export type VerifyEmailRequest       = components["schemas"]["VerifyEmailRequest"];
export type RequestPasswordReset     = components["schemas"]["RequestPasswordReset"];
export type ResetPasswordRequest     = components["schemas"]["ResetPasswordRequest"];

// --- User ---
export type UserDetails              = components["schemas"]["UserDetails"];
export type UserSummary              = components["schemas"]["UserSummary"];

// --- Profile ---
export type ProfileDto               = components["schemas"]["ProfileDto"];
export type ProfileBrief             = components["schemas"]["ProfileBrief"];
export type ProfileUpdateRequest     = components["schemas"]["ProfileUpdateRequest"];

// --- AddressForm ---
export type Address                  = components["schemas"]["Address"];
export type AddressRequest           = components["schemas"]["AddressRequest"];

// --- Image ---
export type PresignedUrl             = components["schemas"]["PresignedUrl"];

// --- TripCard ---
export type TripDetails              = components["schemas"]["TripDetails"];
export type TripSummary              = components["schemas"]["TripSummary"];
export type TripCreateRequest        = components["schemas"]["TripCreateRequest"];
export type TripUpdateRequest        = components["schemas"]["TripUpdateRequest"];
export type TripStopDto              = components["schemas"]["TripStopDto"];
export type TripBookingDto           = components["schemas"]["TripBookingDto"];
export type PageTripSummary          = components["schemas"]["PageTripSummary"];
export type PageTripBookingDto       = components["schemas"]["PageTripBookingDto"];

// --- ParcelListPage ---
export type ParcelDetails            = components["schemas"]["ParcelDetails"];
export type ParcelSummary            = components["schemas"]["ParcelSummary"];
export type ParcelCreateRequest      = components["schemas"]["ParcelCreateRequest"];
export type ParcelUpdateRequest      = components["schemas"]["ParcelUpdateRequest"];
export type ParcelBookingDto         = components["schemas"]["ParcelBookingDto"];
export type PageParcelBookingDto     = components["schemas"]["PageParcelBookingDto"];
export type TrackEventDto            = components["schemas"]["TrackEventDto"];
export type ParcelImageDto           = components["schemas"]["ParcelImageDto"];
export type ParcelImageRequest       = components["schemas"]["ParcelImageRequest"];

// --- Pagination ---
export type Pageable                 = components["schemas"]["Pageable"];
export type PageableObject           = components["schemas"]["PageableObject"];
export type SortObject               = components["schemas"]["SortObject"];
export type PageParcelSummary        = components["schemas"]["PageParcelSummary"];

// --- Booking ---
export type BookingDto               = components["schemas"]["BookingDto"];
export type PageBookingDto           = components["schemas"]["PageBookingDto"];
export type CreateBookingRequest     = components["schemas"]["CreateBookingRequest"];

// --- Price ---
export type Price                    = components["schemas"]["Price"];

// --- Review ---
export type ReviewDto                = components["schemas"]["ReviewDto"];
export type PageReviewDto            = components["schemas"]["PageReviewDto"];
export type CreateReviewRequest      = components["schemas"]["CreateReviewRequest"];

// --- Payment ---
export type PaymentResponse          = components["schemas"]["PaymentResponse"];

// --- Conversation / Message ---
export type ConversationDetails      = components["schemas"]["ConversationDetails"];
export type ConversationSummary      = components["schemas"]["ConversationSummary"];
export type MessageSummary           = components["schemas"]["MessageSummary"];
export type MessageImageDto          = components["schemas"]["MessageImageDto"];

// --- Notification ---
export type NotificationDto          = components["schemas"]["NotificationDto"];

// --- Match ---
export type MatchResultDto           = components["schemas"]["MatchResultDto"];