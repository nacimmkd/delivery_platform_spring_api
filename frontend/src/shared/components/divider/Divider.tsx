import styles from "./Divider.module.css"

type DividerOrientation = "horizontal" | "vertical";

type DividerProps = {
    text?: string;
    orientation?: DividerOrientation;
    className?: string;
};

export default function Divider({ text, orientation = "horizontal", className = "" }: DividerProps) {

    const classes = [
        styles.divider,
        orientation === "vertical" ? styles.vertical : "",
        className,
    ].filter(Boolean).join(" ");

    return (
        <div className={classes}>
            {text && <span className={styles.dividerText}>{text}</span>}
        </div>
    )
}
