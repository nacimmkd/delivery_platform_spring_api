import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Select.module.css";

type SelectItemElement = React.ReactElement<{
    value: string;
    disabled?: boolean;
    children: React.ReactNode;
}>;

type SelectVariant = "default" | "pill";

type SelectProps = {
    id?: string;
    name?: string;
    label?: string;
    value: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    variant?: SelectVariant;
    onChange: (value: string) => void;
    className?: string;
    children: React.ReactNode;
};

export default function Select({
    id,
    label,
    value,
    disabled,
    error,
    variant = "default",
    onChange,
    className = "",
    children,
}: SelectProps) {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const items = Children.toArray(children).filter(isValidElement) as SelectItemElement[];
    const selectedIndex = items.findIndex((item) => item.props.value === value);
    const selectedLabel = selectedIndex >= 0 ? items[selectedIndex].props.children : null;

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleSelect(itemValue: string) {
        onChange(itemValue);
        setOpen(false);
    }

    function moveActive(direction: 1 | -1) {
        setActiveIndex((i) => {
            let next = i;
            for (let step = 0; step < items.length; step++) {
                next = (next + direction + items.length) % items.length;
                if (!items[next].props.disabled) break;
            }
            return next;
        });
    }

    function handleTriggerKeyDown(e: React.KeyboardEvent) {
        if (disabled) return;

        if (e.key === "Escape") {
            setOpen(false);
            return;
        }

        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!open) {
                setOpen(true);
                setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
                return;
            }
            moveActive(e.key === "ArrowDown" ? 1 : -1);
            return;
        }

        if ((e.key === "Enter" || e.key === " ") && open) {
            e.preventDefault();
            const item = items[activeIndex];
            if (item && !item.props.disabled) handleSelect(item.props.value);
        }
    }

    function handleTriggerClick() {
        if (disabled) return;
        setOpen((o) => {
            if (!o) setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
            return !o;
        });
    }

    return (
        <div className={`${styles.field} ${className}`} ref={containerRef}>
            {label && <label className={styles.label} htmlFor={id}>{label}</label>}

            <button
                type="button"
                id={id}
                className={[styles.trigger, styles[variant], error ? styles.triggerError : "", open ? styles.triggerOpen : ""].filter(Boolean).join(" ")}
                onClick={handleTriggerClick}
                onKeyDown={handleTriggerKeyDown}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={styles.triggerLabel}>{selectedLabel}</span>
                <ChevronDown size={16} className={styles.chevron} />
            </button>

            {open && (
                <ul className={styles.dropdown} role="listbox">
                    {items.map((item, i) => cloneElement(item, {
                        // @ts-expect-error - SelectItem accepts these internal props from Select
                        selected: item.props.value === value,
                        active: i === activeIndex,
                        onSelect: handleSelect,
                    }))}
                </ul>
            )}

            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
}
