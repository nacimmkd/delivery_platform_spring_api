import styles from "./Container.module.css";
import * as React from "react";

type Direction = "row" | "column";
type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end" | "space-between";
type Variant = "card" | "elevated";

type ContainerProps = {
    children: React.ReactNode;
    direction?: Direction;
    align?: Align;
    justify?: Justify;
    wrap?: boolean;
    gap?: number | string;
    padding?: number | string;
    margin?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    flex?: string;
    variant?: Variant;
    stackOnMobile?: boolean;
    centerOnMobile?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

const alignMap: Record<Align, React.CSSProperties["alignItems"]> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
};

const justifyMap: Record<Justify, React.CSSProperties["justifyContent"]> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    "space-between": "space-between",
};

function toCssSize(value: number | string): string {
    return typeof value === "number" ? `${value}px` : value;
}

export default function Container({
    children,
    direction = "column",
    align,
    justify,
    wrap = false,
    gap,
    padding,
    margin,
    maxWidth,
    minHeight,
    flex,
    variant,
    stackOnMobile = false,
    centerOnMobile = false,
    className = "",
    style,
}: ContainerProps) {
    const classes = [
        styles.container,
        variant ? styles[variant] : "",
        stackOnMobile ? styles.stackOnMobile : "",
        centerOnMobile ? styles.centerOnMobile : "",
        className,
    ].filter(Boolean).join(" ");

    const computedStyle: React.CSSProperties = {
        flexDirection: direction,
        ...(wrap ? { flexWrap: "wrap" } : {}),
        ...(align ? { alignItems: alignMap[align] } : {}),
        ...(justify ? { justifyContent: justifyMap[justify] } : {}),
        ...(gap !== undefined ? { gap: toCssSize(gap) } : {}),
        ...(padding !== undefined ? { padding: toCssSize(padding) } : {}),
        ...(margin !== undefined ? { margin: toCssSize(margin) } : {}),
        ...(maxWidth !== undefined ? { maxWidth: toCssSize(maxWidth) } : {}),
        ...(minHeight !== undefined ? { minHeight: toCssSize(minHeight) } : {}),
        ...(flex !== undefined ? { flex } : {}),
        ...style,
    };

    return (
        <div className={classes} style={computedStyle}>
            {children}
        </div>
    );
}
