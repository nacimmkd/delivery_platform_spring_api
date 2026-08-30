import { useState } from "react";
import mediaService from "@/features/media/services/media.service.ts";

export default function useAvatarUpload(onUploaded: (avatarKey: string, previewUrl: string) => void) {

    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function uploadAvatar(file: File) {
        setIsUploading(true);
        setError(null);
        const previewUrl = URL.createObjectURL(file);
        try {
            const { key } = await mediaService.uploadToStorage(file);
            onUploaded(key, previewUrl);
        } catch {
            setError("L'envoi de la photo a échoué. Réessayez.");
            URL.revokeObjectURL(previewUrl);
        } finally {
            setIsUploading(false);
        }
    }

    return { uploadAvatar, isUploading, error };
}
