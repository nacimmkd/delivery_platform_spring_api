import styles from "./Text.module.css"

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "label" | "small";
type Weight = "regular" | "medium" | "semibold" | "bold";
type Align = "left" | "center" | "right";
type Animate = "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight";
type IconPosition = "left" | "right";

type TextProps = {
    children: React.ReactNode;
    tag?: Tag;
    weight?: Weight;
    size?: number;
    maxWidth?: number | string;
    lineHeight?: number | string;
    letterSpacing?: number | string;
    color?: string;
    align?: Align;
    muted?: boolean;
    animate?: Animate;
    delay?: number;
    className?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    iconPosition?: IconPosition;
    htmlFor?: string;
    style?: React.CSSProperties;
};

const justifyMap: Record<Align, React.CSSProperties["justifyContent"]> = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
};

export default function Text({
    children,
    tag: Tag = "p",
    weight = "regular",
    size,
    maxWidth,
    lineHeight,
    letterSpacing,
    color,
    align,
    muted = false,
    animate,
    delay = 0,
    className = "",
    onClick,
    icon,
    iconPosition = "left",
    htmlFor,
    style,
}: TextProps) {

    const classes = [
        styles.text,
        styles[weight],
        muted ? styles.muted : "",
        animate ? styles[animate] : "",
        icon ? styles.withIcon : "",
        className,
    ].filter(Boolean).join(" ");

    const computedStyle: React.CSSProperties = {
        ...(size ? { fontSize: `${size}rem` } : {}),
        ...(maxWidth ? { maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth } : {}),
        ...(lineHeight ? { lineHeight } : {}),
        ...(letterSpacing ? { letterSpacing: typeof letterSpacing === "number" ? `${letterSpacing}px` : letterSpacing } : {}),
        ...(color ? { color } : {}),
        ...(align ? { textAlign: align } : {}),
        ...(icon && align ? { justifyContent: justifyMap[align] } : {}),
        ...(delay ? { animationDelay: `${delay}ms` } : {}),
        ...style,
    };

    return (
        <Tag className={classes} style={computedStyle} onClick={onClick} htmlFor={htmlFor}>
            {icon && iconPosition === "left" && (
                <span className={styles.icon}>{icon}</span>
            )}
            {children}
            {icon && iconPosition === "right" && (
                <span className={styles.icon}>{icon}</span>
            )}
        </Tag>
    );
}