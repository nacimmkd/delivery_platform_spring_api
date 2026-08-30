import { createPortal } from "react-dom";
import styles from "./Popup.module.css"

type BackgroundProps = {
    children: React.ReactNode;
    onClose: () => void;
};

export default function Popup({children, onClose}: BackgroundProps) {

    return createPortal(
        <div onClick={onClose} className={styles.container}>
            <div onClick={(e) => e.stopPropagation()} className={styles.element}>
                {children}
            </div>
        </div>,
        document.body,
    );
}