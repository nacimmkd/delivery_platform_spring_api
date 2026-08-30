import { Loader2, MapPin } from "lucide-react";
import styles from "./AddressForm.module.css";
import useAddressAutocomplete from "@/features/address/hooks/useAddressAutocomplete.ts";
import Text from "@/shared/components/text/Text.tsx";
import Input from "@/shared/components/input/Input.tsx";
import type { AddressRequest } from "@/shared/types";

type AddressFormProps = {
    id?: string;
    icon?: React.ReactNode;
    label?: string;
    placeholder?: string;
    value: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    onChange: (query: string) => void;
    onSelect: (address: AddressRequest, label: string) => void;
};

export default function AddressForm({
    id,
    icon,
    label,
    placeholder = "10 rue Paris, 76010 Paris",
    value,
    required,
    disabled,
    error,
    onChange,
    onSelect,
}: AddressFormProps) {
    const {
        containerRef,
        suggestions,
        open,
        loading,
        activeIndex,
        setOpen,
        handleQueryChange,
        handleSelect,
        handleKeyDown,
    } = useAddressAutocomplete(onChange, onSelect);

    return (
        <div className={styles.field} ref={containerRef}>
            {label && (
                <Text tag="label" htmlFor={id} weight="semibold" icon={icon} className={styles.label}>
                    {label}
                </Text>
            )}

            <Input
                id={id}
                value={value}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                error={error}
                autoComplete="off"
                suffix={loading ? <Loader2 className={styles.spinner} size={16} /> : undefined}
                onChange={handleQueryChange}
                onFocus={() => suggestions.length > 0 && setOpen(true)}
                onKeyDown={handleKeyDown}
            />

            {open && suggestions.length > 0 && (
                <ul className={styles.dropdown}>
                    {suggestions.map((suggestion, i) => (
                        <li
                            key={suggestion.label}
                            className={`${styles.option} ${i === activeIndex ? styles.optionActive : ""}`}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleSelect(suggestion)}
                        >
                            <MapPin size={14} />
                            <Text tag="span">{suggestion.label}</Text>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
