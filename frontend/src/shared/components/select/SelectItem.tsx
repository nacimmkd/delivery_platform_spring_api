import { Check } from "lucide-react";
import styles from "./SelectItem.module.css";

type SelectItemProps = {
    value: string;
    disabled?: boolean;
    children: React.ReactNode;
    selected?: boolean;
    active?: boolean;
    onSelect?: (value: string) => void;
};

export default function SelectItem({ value, disabled, children, selected, active, onSelect }: SelectItemProps) {
    return (
        <li
            role="option"
            aria-selected={selected}
            aria-disabled={disabled}
            className={[
                styles.option,
                selected ? styles.optionSelected : "",
                active ? styles.optionActive : "",
                disabled ? styles.optionDisabled : "",
            ].filter(Boolean).join(" ")}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => !disabled && onSelect?.(value)}
        >
            <span>{children}</span>
            {selected && <Check size={16} className={styles.check} />}
        </li>
    );
}
