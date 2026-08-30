import api from "@/app/config/axios.config";
import type {AddressRequest, PageTripBookingDto, PageTripSummary, TripCreateRequest, TripDetails, TripUpdateRequest} from "@/shared/types";

const tripService = {

    async getTrip(id: string): Promise<TripDetails> {
        const res = await api.get<TripDetails>(`/trips/${id}`);
        return res.data;
    },

    async getMyTrips(page = 0, size = 20): Promise<PageTripSummary> {
        const res = await api.get<PageTripSummary>("/trips/me", { params: { page, size } });
        return res.data;
    },

    async createTrip(data: TripCreateRequest): Promise<TripDetails> {
        const res = await api.post<TripDetails>("/trips", data);
        return res.data;
    },

    async updateTrip(id: string, data: TripUpdateRequest): Promise<TripDetails> {
        const res = await api.put<TripDetails>(`/trips/${id}`, data);
        return res.data;
    },

    async deleteTrip(id: string): Promise<void> {
        await api.delete(`/trips/${id}`);
    },

    async addStop(id: string, data: AddressRequest): Promise<void> {
        await api.post(`/trips/${id}/stops`, data);
    },

    async deleteStop(tripId: string, stopId: string): Promise<void> {
        await api.delete(`/trips/${tripId}/stops/${stopId}`);
    },

    async getTripBookings(tripId: string, page = 0, size = 20): Promise<PageTripBookingDto> {
        const res = await api.get<PageTripBookingDto>(`/trips/${tripId}/bookings`, { params: { page, size } });
        return res.data;
    },

    async getTripRequests(tripId: string, page = 0, size = 20): Promise<PageTripBookingDto> {
        const res = await api.get<PageTripBookingDto>(`/trips/${tripId}/requests`, { params: { page, size } });
        return res.data;
    },

};

export default tripService;
