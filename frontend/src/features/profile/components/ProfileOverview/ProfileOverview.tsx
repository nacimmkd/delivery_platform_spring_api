
import { useRef } from "react";
import { Camera, Car, Package, Star } from "lucide-react";
import styles from "./ProfileOverview.module.css";
import Icon from "@/shared/components/icon/Icon.tsx";
import Text from "@/shared/components/text/Text.tsx";
import Tag from "@/shared/components/tag/Tag.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import type { ProfileDto } from "@/shared/types";

type ProfileOverviewProps = {
    profile: ProfileDto;
    editableAvatar?: boolean;
    isUploadingAvatar?: boolean;
    onAvatarSelected?: (file: File) => void;
};

export default function ProfileOverview({
    profile,
    editableAvatar = false,
    isUploadingAvatar = false,
    onAvatarSelected,
}: ProfileOverviewProps) {
    const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ");
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) onAvatarSelected?.(file);
        e.target.value = "";
    }

    return (
        <div className={styles.container}>
            <div className={styles.banner} aria-hidden="true" />

            <div className={styles.avatarWrapper}>
                <Icon className={styles.avatar} src={profile.avatarUrl ?? "/avatar.png"} size={104} label={fullName} />

                {isUploadingAvatar && (
                    <div className={styles.avatarOverlay}><Spinner /></div>
                )}

                {editableAvatar && !isUploadingAvatar && (
                    <button
                        type="button"
                        className={styles.avatarEditButton}
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="Changer la photo de profil"
                    >
                        <Camera size={15} />
                    </button>
                )}

                {editableAvatar && (
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className={styles.hiddenInput}
                        onChange={handleFileChange}
                    />
                )}
            </div>

            <div className={styles.body}>
                <Text tag="h1" weight="bold" size={1.5} animate="fadeIn">{fullName || "Utilisateur"}</Text>

                {profile.avgRating || profile.reviewCount ? (
                    <Tag
                        icon={<Star size={13} fill="currentColor" />}
                        value={`${profile.avgRating?.toFixed(1) ?? "-"} · ${profile.reviewCount ?? 0} avis`}
                        variant="accent"
                    />
                ) : (
                    <Text muted size={0.85}>Pas encore d'avis</Text>
                )}

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <div className={styles.statIcon}><Car size={16} /></div>
                        <Text tag="p" weight="bold" className={styles.statValue}>{profile.completedTrips ?? 0}</Text>
                        <Text tag="span" muted className={styles.statLabel}>Trajets</Text>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.stat}>
                        <div className={styles.statIcon}><Package size={16} /></div>
                        <Text tag="p" weight="bold" className={styles.statValue}>{profile.sentParcels ?? 0}</Text>
                        <Text tag="span" muted className={styles.statLabel}>Colis livrés</Text>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.stat}>
                        <div className={styles.statIcon}><Star size={16} /></div>
                        <Text tag="p" weight="bold" className={styles.statValue}>{profile.reviewCount ?? 0}</Text>
                        <Text tag="span" muted className={styles.statLabel}>Avis</Text>
                    </div>
                </div>
            </div>
        </div>
    );
}
