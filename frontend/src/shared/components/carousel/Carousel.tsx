import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Carousel.module.css";
import * as React from "react";

type ImageCarouselProps = {
    images: string[],
};

const PLACEHOLDER_IMAGE = "/colis.png";

export default function Carousel({ images }: ImageCarouselProps) {
    const [index, setIndex] = useState(0);
    const displayedImages = images && images.length > 0 ? images : [PLACEHOLDER_IMAGE];
    const hasMultiple = displayedImages.length > 1;

    function goTo(i: number) {
        setIndex((i + displayedImages.length) % displayedImages.length);
    }

    function handlePrev(e: React.MouseEvent) {
        e.stopPropagation();
        goTo(index - 1);
    }

    function handleNext(e: React.MouseEvent) {
        e.stopPropagation();
        goTo(index + 1);
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.track}
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {displayedImages.map((src, i) => (
                    <img
                        key={src}
                        src={src}
                        alt={"parcel_image"}
                        className={styles.slide}
                        loading={i === 0 ? "eager" : "lazy"}
                        onError={(e) => {
                            e.currentTarget.src = PLACEHOLDER_IMAGE;
                        }}
                    />
                ))}
            </div>
            {hasMultiple && (
                <>
                    <button
                        type="button"
                        className={`${styles.arrow} ${styles.arrow_left}`}
                        onClick={handlePrev}
                        aria-label="Image précédente"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        type="button"
                        className={`${styles.arrow} ${styles.arrow_right}`}
                        onClick={handleNext}
                        aria-label="Image suivante"
                    >
                        <ChevronRight size={18} />
                    </button>
                    <div className={styles.dots}>
                        {displayedImages.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`${styles.dot} ${i === index ? styles.dot_active : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goTo(i);
                                }}
                                aria-label={`Aller à l'image ${i + 1}`}
                                aria-current={i === index}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}