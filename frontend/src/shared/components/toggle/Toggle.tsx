import styles from "./Toggle.module.css";
import Text from "@/shared/components/text/Text";

type ToggleProps = {
    id?: string;
    label?: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
};

export default function Toggle({
    id,
    label,
    description,
    checked,
    onChange,
    className = "",
}: ToggleProps) {
    return (
        <label className={`${styles.row} ${className}`} htmlFor={id}>
            {(label || description) && (
                <div className={styles.text}>
                    {label && <Text tag="p" weight="semibold">{label}</Text>}
                    {description && <Text tag="p" muted size={0.85}>{description}</Text>}
                </div>
            )}
            <span className={styles.toggle}>
                <input
                    id={id}
                    className={styles.input}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className={styles.track}>
                    <span className={styles.thumb} />
                </span>
            </span>
        </label>
    );
}
