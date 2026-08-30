import type { Price } from "@/shared/types";
import currencyToSymbol from "@/shared/utils/currencyToSymbol.ts";

export default function formatPrice(price?: Price): string {
    if (!price?.amountInCents) return "-";
    return `${currencyToSymbol(price.currency)}${(price.amountInCents / 100).toFixed(2)}`;
}
