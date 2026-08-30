
export default function formatDate(iso: string | undefined): string {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}