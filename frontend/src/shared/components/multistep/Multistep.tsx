import styles from "./Multistep.module.css";
import Button from "@/shared/components/button/Button";
import Step from "./Step.tsx";

type StepDef = {
    label: string;
    content: React.ReactNode;
};

type MultistepProps = {
    steps: StepDef[];
    current: number;
    onNext?: () => void;
    onBack?: () => void;
    onFinish?: () => void;
    nextLabel?: string;
    backLabel?: string;
    finishLabel?: string;
    finishType?: "button" | "submit";
    nextDisabled?: boolean;
    isLoading?: boolean;
    className?: string;
};

export default function Multistep({
    steps,
    current,
    onNext,
    onBack,
    onFinish,
    nextLabel = "Suivant",
    backLabel = "Retour",
    finishLabel = "Terminer",
    finishType = "button",
    nextDisabled = false,
    isLoading = false,
    className = "",
}: MultistepProps) {
    const isFirst = current === 0;
    const isLast = current === steps.length - 1;

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.progress}>
                <span className={styles.track} />
                <span
                    className={styles.trackDone}
                    style={{ width: steps.length > 1 ? `calc((100% - 30px) * ${current / (steps.length - 1)})` : "0px" }}
                />
                {steps.map((step, i) => (
                    <Step key={step.label} index={i} label={step.label} isActive={i === current} isDone={i < current} />
                ))}
            </div>

            <div className={styles.content}>
                {steps[current]?.content}
            </div>

            <div className={styles.actions}>
                {!isFirst && (
                    <Button label={backLabel} variant="secondary" onClick={onBack} />
                )}
                <div className={styles.spacer} />
                {!isLast && (
                    <Button label={nextLabel} variant="main" onClick={onNext} disabled={nextDisabled} />
                )}
                {isLast && (
                    <Button
                        label={finishLabel}
                        type={finishType}
                        variant="main"
                        onClick={finishType === "submit" ? undefined : onFinish}
                        disabled={nextDisabled}
                        loading={isLoading}
                    />
                )}
            </div>
        </div>
    );
}
