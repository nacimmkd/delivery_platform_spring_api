
import styles from "./Spinner.module.css"

export default function Spinner() {
    return (
        <svg
            className={styles.spinner}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
        >
            <circle
                cx="8"
                cy="8"
                r="6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="40.8"
                strokeDashoffset="10"
            />
        </svg>
    );
}