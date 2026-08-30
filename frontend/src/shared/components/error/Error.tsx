import styles from "./Error.module.css";
import Text from "@/shared/components/text/Text.tsx";
import type { AppError } from "@/shared/types/AppError";

type ErrorProps = {
    error: AppError | null;
    showWithFieldErrors?: boolean;
};

export default function Error({ error, showWithFieldErrors = false }: ErrorProps) {
    if (!error || (error.hasFieldErrors && !showWithFieldErrors)) return null;

    return (
        <Text className={styles.error} align="center" animate="slideUp">
            {error.message}
        </Text>
    );
}
