import type { Address } from "@/shared/types";

export function addressToString(address: Address | undefined): string {
    if (!address) return "";
    return `${address.street}, ${address.city} ${address.postalCode}, ${address.country}`;
}

export function addressToBriefString(address: Address | undefined): string {
    if (!address) return "";
    return `${address.city}, ${address.country}`;
}
