import styles from "./Step.module.css";
import Text from "@/shared/components/text/Text";

type StepProps = {
    index: number;
    label: string;
    isActive: boolean;
    isDone: boolean;
};

export default function Step({ index, label, isActive, isDone }: StepProps) {
    return (
        <div className={styles.step}>
            <span
                className={[
                    styles.dot,
                    isActive ? styles.dotActive : "",
                    isDone ? styles.dotDone : "",
                ].filter(Boolean).join(" ")}
            >
                {index + 1}
            </span>
            <Text
                tag="span"
                weight="semibold"
                size={0.85}
                className={[styles.stepLabel, isActive ? styles.stepLabelActive : ""].filter(Boolean).join(" ")}
            >
                {label}
            </Text>
        </div>
    );
}
