import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import styles from "./MatchingPage.module.css"
import MatchForm from "@/features/matching/components/MatchForm/MatchForm.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Select from "@/shared/components/select/Select.tsx";
import SelectItem from "@/shared/components/select/SelectItem.tsx";
import useMatching from "@/features/matching/hooks/useMatching.ts";
import MatchResult from "@/features/matching/components/MatchResult/MatchResult.tsx";
import Container from "@/shared/components/container/Container.tsx"

type SortBy = "match" | "price" | "driver_score";

const SORT_PARAMS: Record<SortBy, string> = {
    match: "score,desc",
    price: "price.amountInCents,asc",
    driver_score: "owner.avgRating,desc",
};

export default function MatchingPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { search, matches, isLoading, error, hasSearched } = useMatching();
    const [sortBy, setSortBy] = useState<SortBy>("match");
    const [date, setDate] = useState("");

    const parcelId = searchParams.get("parcelId") ?? "";

    function handleSearch(date: string) {
        setSearchParams({ parcelId });
        setDate(date);
        void search(parcelId, date, SORT_PARAMS[sortBy]);
    }

    function handleSortChange(value: SortBy) {
        setSortBy(value);
        if (date) void search(parcelId, date, SORT_PARAMS[value]);
    }

    return (
        <div className={styles.container}>
            { !hasSearched && <Container align="center">
                <Text tag="h1" align="center" weight="bold" animate="slideUp" delay={100} maxWidth={800} lineHeight={1.1} letterSpacing={1} className={styles.title}>
                    Trouver le meilleur trajet pour votre colis
                </Text>
            </Container> }

            <MatchForm
                parcelId={parcelId}
                onSearch={handleSearch}
                isLoading={isLoading}
                error={error}
            />

            {isLoading && (
                <div className={styles.state_container}>
                    <Spinner />
                </div>
            )}

            {!isLoading && hasSearched && !error && matches.length === 0 && (
                <div className={styles.empty_state}>
                    <SearchX size={48} className={styles.empty_icon} />
                    <Text tag="h3" weight="bold" className={styles.empty_title}>Aucun trajet trouvé</Text>
                    <Text tag="p" muted align="center" className={styles.empty_text}>
                        Essayez une autre date ou un autre colis.
                    </Text>
                </div>
            )}

            {!isLoading && matches.length > 0 && (
                <>
                    <div className={styles.results_header}>
                        <Text tag="h2" weight="bold" className={styles.results_title}>Résultat</Text>
                        <div className={styles.sort_select}>
                            <Select
                                id="sortBy"
                                value={sortBy}
                                variant="pill"
                                onChange={(value) => handleSortChange(value as SortBy)}
                            >
                                <SelectItem value="match">Meilleur match</SelectItem>
                                <SelectItem value="price">Prix</SelectItem>
                                <SelectItem value="driver_score">Note du livreur</SelectItem>
                            </Select>
                        </div>
                    </div>

                    <div className={styles.results_container}>
                        {matches.map((match, i) => (
                            match && <MatchResult key={i} result={match} parcelId={parcelId}/>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
