import type { AppPath } from "@/app/routes/paths";
import styles from "./MenuItem.module.css"
import { Link } from "react-router-dom";

type MenuItemProps = {
    label: string;
    icon?: React.ReactNode;
    trailing?: React.ReactNode;
    onClick?: () => void;
    to?: AppPath;
    danger?: boolean;
};

export default function MenuItem({ label, icon, trailing, onClick, to, danger }: MenuItemProps) {

    const classes = `${styles.item} ${danger ? styles.danger : ""}`;

    const content = (
        <>
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.label}>{label}</span>
            {trailing && <span className={styles.trailing}>{trailing}</span>}
        </>
    );

    if (to) {
        return (
            <Link className={classes} to={to}>
                {content}
            </Link>
        );
    }

    return (
        <button className={classes} onClick={onClick}>
            {content}
        </button>
    );
}