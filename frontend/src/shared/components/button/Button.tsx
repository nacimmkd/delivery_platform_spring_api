
import { Link } from "react-router-dom";
import Spinner from "@/shared/components/spinner/Spinner";
import styles from "./Button.module.css"
import textStyles from "@/shared/components/text/Text.module.css"

type Size = "sm" | "md" | "lg";
type Variant = "main" | "secondary" | "ghost" | "danger";
type Animate = "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight";

type ButtonProps = {
    label?: string;
    ariaLabel?: string;
    to?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    iconOnly?: boolean;
    fullWidth?: boolean;
    animate?: Animate;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
};

export default function Button({
    label,
    ariaLabel,
    to,
    type = "button",
    onClick,
    variant = "main",
    size = "md",
    disabled = false,
    loading = false,
    icon,
    iconPosition = "left",
    iconOnly = false,
    fullWidth = false,
    animate,
    delay = 0,
    className = "",
    style,
}: ButtonProps) {

    const classes = [
        styles.button,
        styles[variant],
        styles[size],
        iconOnly ? styles.iconOnly : "",
        fullWidth ? styles.fullWidth : "",
        loading ? styles.loading : "",
        animate ? textStyles[animate] : "",
        className,
    ].filter(Boolean).join(" ");

    const computedStyle: React.CSSProperties = {
        ...(delay ? { animationDelay: `${delay}ms` } : {}),
        ...style,
    };

    const content = (
        <>
            {loading && <Spinner/>}
            {!loading && icon && (iconOnly || iconPosition === "left") && <span className={styles.icon}>{icon}</span>}
            {!iconOnly && <span>{label}</span>}
            {!loading && icon && !iconOnly && iconPosition === "right" && <span className={styles.icon}>{icon}</span>}
        </>
    );

    if (to) {
        return (
            <Link
                to={to}
                className={classes}
                style={computedStyle}
                aria-label={ariaLabel ?? (iconOnly ? label : undefined)}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            className={classes}
            style={style}
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            aria-busy={loading}
            aria-label={ariaLabel ?? (iconOnly ? label : undefined)}
        >
            {content}
        </button>
    );
};