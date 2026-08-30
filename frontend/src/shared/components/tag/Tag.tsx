import styles from "./Tag.module.css";

type Size = "sm" | "md";
type Variant = "default" | "accent" | "success";
type IconPosition = "left" | "right";

type TagProps = {
    value: string | null;
    icon?: React.ReactNode;
    iconPosition?: IconPosition;
    variant?: Variant;
    size?: Size;
    className?: string;
};

export default function Tag({
    value,
    icon,
    iconPosition = "left",
    variant = "default",
    size = "sm",
    className = "",
}: TagProps) {

    const classes = [
        styles.tag,
        styles[size],
        variant === "accent" ? styles.accent : "",
        variant === "success" ? styles.success : "",
        className,
    ].filter(Boolean).join(" ");

    return (
        <div className={classes}>
            {icon && iconPosition === "left" && icon}
            <p className={styles.bold}>{value}</p>
            {icon && iconPosition === "right" && icon}
        </div>
    );
}
