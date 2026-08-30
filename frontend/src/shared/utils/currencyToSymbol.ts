const CURRENCY_SYMBOLS: Record<string, string> = {
    EUR: "€",
    USD: "$",
    GBP: "£",
    CHF: "CHF",
};

export default function currencyToSymbol(currency: string): string {
    return CURRENCY_SYMBOLS[currency] ?? currency;
}
