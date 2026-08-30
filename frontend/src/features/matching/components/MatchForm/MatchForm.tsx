import { useState } from "react";
import { SearchIcon } from "lucide-react";
import styles from "./MatchForm.module.css";
import Input from "@/shared/components/input/Input.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Error from "@/shared/components/error/Error.tsx";
import type { AppError } from "@/shared/types/AppError";
import * as React from "react";

type SearchFormProps = {
    parcelId: string;
    onSearch: (date: string) => void;
    isLoading?: boolean;
    error?: AppError | null;
};

export default function MatchForm({ onSearch, isLoading = false, error = null }: SearchFormProps) {
    const [date, setDate] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSearch(date);
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <Error error={error} />

            <div className={styles.fields}>
                <Input
                    id="date"
                    name="date"
                    type="date"
                    value={date}
                    required
                    onChange={(e) => setDate(e.target.value)}
                    error={error?.fields.date}
                    className={styles.field}
                />

                <Button
                    type="submit"
                    label="Chercher"
                    loading={isLoading}
                    disabled={!date}
                    icon={<SearchIcon size={20} />}
                    iconPosition="left"
                    className={styles.submit}
                />
            </div>
        </form>
    );
}
