import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths.ts";
import App from "@/app/App.tsx";
import RequireAuth from "@/app/routes/require_auth/RequireAuth.tsx";
import LoginPage from "@/features/auth/pages/LoginPage.tsx";
import HomePage from "@/features/home/pages/HomePage.tsx";
import SignupPage from "@/features/auth/pages/SignupPage.tsx";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage.tsx";
import VerifyEmailPage from "@/features/auth/pages/VerifyEmailPage.tsx";
import ParcelListPage from "@/features/parcel/pages/ParcelListPage.tsx";
import CreateParcelPage from "@/features/parcel/pages/CreateParcelPage.tsx";
import EditParcelPage from "@/features/parcel/pages/EditParcelPage.tsx";
import ParcelDetailsPage from "@/features/parcel/pages/ParcelDetailsPage.tsx";
import CreateTripPage from "@/features/trips/pages/CreateTripPage.tsx";
import EditTripPage from "@/features/trips/pages/EditTripPage.tsx";
import TripListPage from "@/features/trips/pages/TripListPage.tsx";
import TripDetailsPage from "@/features/trips/pages/TripDetailsPage.tsx";
import TripRequestsPage from "@/features/trips/pages/TripRequestsPage.tsx";
import TripBookingsPage from "@/features/trips/pages/TripBookingsPage.tsx";
import MatchingPage from "@/features/matching/pages/MatchingPage.tsx";
import BookingDetailsPage from "@/features/booking/pages/BookingDetailsPage.tsx";
import PaymentPage from "@/features/payments/pages/PaymentPage.tsx";
import MyProfilePage from "@/features/profile/pages/MyProfilePage.tsx";
import UserProfilePage from "@/features/profile/pages/UserProfilePage.tsx";
import ReviewsPage from "@/features/reviews/pages/ReviewsPage.tsx";

export const router = createBrowserRouter([
    {
        path: paths.home,
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: paths.login, element: <LoginPage /> },
            { path: paths.signup, element: <SignupPage /> },
            { path: paths.verify_email, element: <VerifyEmailPage /> },
            { path: paths.reset_password, element: <ResetPasswordPage/> },
            {
                element: <RequireAuth />,
                children: [
                    { path: paths.parcels_list, element: <ParcelListPage/> },
                    { path: "/parcels/:id", element: <ParcelDetailsPage/> },
                    { path: paths.parcel_create, element: <CreateParcelPage/>},
                    { path: paths.parcel_edit, element: <EditParcelPage/>},
                    { path: paths.trips, element: <TripListPage/> },
                    { path: paths.trip_create, element: <CreateTripPage/>},
                    { path: paths.trip_edit, element: <EditTripPage/>},
                    { path: paths.trip_details, element: <TripDetailsPage/>},
                    { path: paths.trip_requests, element: <TripRequestsPage/>},
                    { path: paths.trip_bookings, element: <TripBookingsPage/>},
                    { path: paths.profile, element: <MyProfilePage/> },
                    { path: paths.user_profile, element: <UserProfilePage/> },
                    { path: paths.user_reviews, element: <ReviewsPage/> },
                    { path: paths.search, element: <MatchingPage/> },
                    { path: paths.booking_details, element: <BookingDetailsPage/> },
                    { path: paths.booking_payment, element: <PaymentPage/> },
                ],
            },
        ]
    }
]);