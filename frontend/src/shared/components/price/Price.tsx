import styles from "./Price.module.css";
import Text from "@/shared/components/text/Text.tsx";
import formatPrice from "@/shared/utils/formatPrice.ts";
import type { Price as PriceType } from "@/shared/types";

type Direction = "vertical" | "horizontal";
type Align =  "left" | "center" | "right";

type PriceProps = {
    totalPrice?: PriceType;
    pricePerKg?: PriceType;
    label?: string;
    align?: Align;
    direction?: Direction;
    className?: string;
};

export default function Price({
    totalPrice,
    pricePerKg,
    label,
    align,
    direction = "vertical",
    className = "",
}: PriceProps) {

    const classes = [
        styles.container,
        direction === "horizontal" ? styles.horizontal : styles.vertical,
        align && styles[`align_${align}`],
        className,
    ].filter(Boolean).join(" ");

    return (
        <div className={classes}>
            {label && <Text tag="p" weight={"bold"} muted size={1} lineHeight={1}>{label}</Text>}
            {totalPrice && <Text tag="p" weight="bold" size={2.5} lineHeight={1.4}>{formatPrice(totalPrice)}</Text>}
            {pricePerKg && <Text tag="p" muted size={1} lineHeight={1}>{formatPrice(pricePerKg)} / kg</Text>}
        </div>
    );
}
