import styles from "./Icon.module.css"

type IconProps = {
    src: string;
    size?: number;
    onClick?: () => void;
    className?: string;
    label?: string;
};

export default function Icon({
    src,
    size = 24,
    onClick,
    className = "",
    label,
}: IconProps) {

    const classes = [
        styles.icon,
        onClick ? styles.clickable : "",
        className,
    ].filter(Boolean).join(" ");

    return (
        <img
            className={classes}
            src={src}
            alt={label ?? ""}
            width={size}
            height={size}
            onClick={onClick}
        />
    );
}