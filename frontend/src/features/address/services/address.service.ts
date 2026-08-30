import axios from "axios";
import type { AddressRequest } from "@/shared/types";

type BanFeature = {
    properties: {
        label: string;
        name?: string;
        city?: string;
        postcode?: string;
    };
};

type BanResponse = {
    features: BanFeature[];
};

export type AddressSuggestion = {
    label: string;
    address: AddressRequest;
};

const BAN_SEARCH_URL = "https://api-adresse.data.gouv.fr/search/";
const MAX_RESULTS = 5;

const addressService = {

    async search(query: string, signal?: AbortSignal): Promise<AddressSuggestion[]> {
        const res = await axios.get<BanResponse>(BAN_SEARCH_URL, {
            params: { q: query, limit: MAX_RESULTS, autocomplete: 1 },
            signal,
        });
        return (res.data.features ?? []).map((feature) => ({
            label: feature.properties.label,
            address: {
                street: feature.properties.name ?? "",
                city: feature.properties.city ?? "",
                postalCode: feature.properties.postcode ?? "",
                country: "France",
            },
        }));
    },

};

export default addressService;
