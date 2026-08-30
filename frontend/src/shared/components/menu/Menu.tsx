
import styles from "./Menu.module.css"

type MenuProps = {
    isOpen: boolean;
    children: React.ReactNode;
    className?: string;
};

export default function Menu({ isOpen, children, className = "" }: MenuProps) {

    if (!isOpen) return null;

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.menu} ${className}`}>
                {children}
            </div>
        </div>
    );
}