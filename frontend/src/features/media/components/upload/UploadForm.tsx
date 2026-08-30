import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import styles from "./UploadForm.module.css";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";

export type UploadFormItem = {
    localId: string;
    previewUrl: string;
    isUploading?: boolean;
    errorMessage?: string;
};

type UploadFormProps = {
    scope?: string;
    max: number;
    remaining: number;
    isFull: boolean;
    items: UploadFormItem[];
    onAddFiles: (files: FileList) => void;
    onRemoveItem: (item: UploadFormItem) => void;
};

export default function UploadForm({ scope, max, remaining, isFull, items, onAddFiles, onRemoveItem }: UploadFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) onAddFiles(e.target.files);
        e.target.value = "";
    }

    return (
        <Container gap={14}>
            {scope && (
                <Container direction="row" justify="space-between" className={styles.label_row}>
                    <Text tag="span" weight="semibold" className={styles.label}>{scope}</Text>
                    <Text tag="span" muted size={0.85}>{items.length}/{max}</Text>
                </Container>
            )}
            {!isFull && (
                <button
                    type="button"
                    className={styles.dropzone}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <ImagePlus size={26} />
                    <Text tag="span" weight="semibold">Cliquer pour ajouter</Text>
                    <Text tag="span" muted size={0.8}>{remaining} photo{remaining > 1 ? "s" : ""} restante{remaining > 1 ? "s" : ""}</Text>
                </button>
            )}

            {items.length > 0 && (
                <div className={styles.image_grid}>
                    {items.map((item) => (
                        <div className={styles.image_tile} key={item.localId}>
                            <img src={item.previewUrl} alt="" className={styles.image_thumb} />

                            {item.isUploading && (<Spinner />)}

                            {item.errorMessage && (
                                <div
                                    className={`${styles.overlay} ${styles.overlay_error}`}
                                    title={item.errorMessage}
                                >
                                    <X size={18} />
                                </div>
                            )}

                            <button
                                type="button"
                                className={styles.remove_button}
                                onClick={() => onRemoveItem(item)}
                                aria-label="Supprimer la photo"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className={styles.hidden_input}
                onChange={handleFilesSelected}
            />
        </Container>
    );
}
