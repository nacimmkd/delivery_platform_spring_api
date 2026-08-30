import type { Address } from "@/shared/types";
import { addressToString } from "@/shared/utils/addressToString.ts";

export default function googleMapsUrl(address?: Address): string {
    if (!address) return "";
    if (address.latitude != null && address.longitude != null) {
        return `https://www.google.com/maps/search/?api=1&query=${address.latitude},${address.longitude}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressToString(address))}`;
}
