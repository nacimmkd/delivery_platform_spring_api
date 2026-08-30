import { useState } from "react";
import { KeyRound, Phone, ShieldCheck, User } from "lucide-react";
import Text from "@/shared/components/text/Text.tsx";
import Container from "@/shared/components/container/Container.tsx";
import Spinner from "@/shared/components/spinner/Spinner.tsx";
import Button from "@/shared/components/button/Button.tsx";
import Input from "@/shared/components/input/Input.tsx";
import Select from "@/shared/components/select/Select.tsx";
import SelectItem from "@/shared/components/select/SelectItem.tsx";
import Error from "@/shared/components/error/Error.tsx";
import Confirmation from "@/shared/components/confirmation/Confirmation.tsx";
import ProfileOverview from "@/features/profile/components/ProfileOverview/ProfileOverview.tsx";
import SectionCard from "@/features/profile/components/SectionCard/SectionCard.tsx";
import ReviewsNavCard from "@/features/reviews/components/ReviewsNavCard/ReviewsNavCard.tsx";
import useMyProfileQuery from "@/features/profile/hooks/useMyProfileQuery.ts";
import useUpdateProfile from "@/features/profile/hooks/useUpdateProfile.ts";
import useAvatarUpload from "@/features/profile/hooks/useAvatarUpload.ts";
import usePasswordReset from "@/features/auth/hooks/usePasswordReset.ts";
import authStore from "@/features/auth/store/auth.store.ts";
import type { AppError } from "@/shared/types/AppError";
import type { ProfileDto, ProfileUpdateRequest } from "@/shared/types";

function toUpdateRequest(profile: ProfileDto): ProfileUpdateRequest {
    return {
        firstName: profile.firstName ?? "",
        lastName: profile.lastName ?? "",
        phone: profile.phone ?? undefined,
        country: profile.country ?? "",
    };
}

const COUNTRY_CODES = [
    { code: "+33", label: "France (+33)" },
    { code: "+32", label: "Belgique (+32)" },
    { code: "+41", label: "Suisse (+41)" },
    { code: "+49", label: "Allemagne (+49)" },
    { code: "+34", label: "Espagne (+34)" },
    { code: "+39", label: "Italie (+39)" },
    { code: "+44", label: "Royaume-Uni (+44)" },
    { code: "+1", label: "États-Unis / Canada (+1)" },
    { code: "+212", label: "Maroc (+212)" },
    { code: "+213", label: "Algérie (+213)" },
    { code: "+216", label: "Tunisie (+216)" },
];

function splitPhone(phone?: string): { countryCode: string; nationalNumber: string } {
    if (!phone) return { countryCode: "+33", nationalNumber: "" };
    const match = [...COUNTRY_CODES].sort((a, b) => b.code.length - a.code.length)
        .find((c) => phone.startsWith(c.code));
    if (match) return { countryCode: match.code, nationalNumber: phone.slice(match.code.length) };
    return { countryCode: "+33", nationalNumber: phone.replace(/^\+/, "") };
}

function combinePhone(countryCode: string, nationalNumber: string): string | undefined {
    const digits = nationalNumber.replace(/\D/g, "").replace(/^0+/, "");
    return digits ? `${countryCode}${digits}` : undefined;
}

type ProfileInfoCardProps = {
    profile: ProfileDto;
    onSave: (data: ProfileUpdateRequest) => Promise<boolean>;
    isSaving: boolean;
    error: AppError | null;
};

function ProfileInfoCard({ profile, onSave, isSaving, error }: ProfileInfoCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState<ProfileUpdateRequest>(() => toUpdateRequest(profile));

    async function handleSave() {
        const success = await onSave(form);
        if (success) setIsEditing(false);
    }

    function handleCancel() {
        setForm(toUpdateRequest(profile));
        setIsEditing(false);
    }

    return (
        <SectionCard
            icon={<User size={18} />}
            title="Informations personnelles"
            action={!isEditing && (
                <Button label="Modifier" variant="ghost" size="sm" onClick={() => setIsEditing(true)} />
            )}
        >
            {!isEditing && (
                <Container gap={12}>
                    <Container direction="row" justify="space-between">
                        <Text muted>Prénom</Text>
                        <Text weight="semibold">{profile.firstName || "-"}</Text>
                    </Container>
                    <Container direction="row" justify="space-between">
                        <Text muted>Nom</Text>
                        <Text weight="semibold">{profile.lastName || "-"}</Text>
                    </Container>
                    <Container direction="row" justify="space-between">
                        <Text muted>Pays</Text>
                        <Text weight="semibold">{profile.country || "-"}</Text>
                    </Container>
                </Container>
            )}

            {isEditing && (
                <Container gap={14}>
                    <Input
                        label="Prénom"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        disabled={isSaving}
                    />
                    <Input
                        label="Nom"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        disabled={isSaving}
                    />
                    <Input
                        label="Pays"
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        disabled={isSaving}
                    />

                    <Error error={error} />

                    <Container direction="row" gap={10}>
                        <Button label="Annuler" variant="ghost" fullWidth onClick={handleCancel} disabled={isSaving} />
                        <Button label="Enregistrer" variant="main" fullWidth onClick={handleSave} loading={isSaving} />
                    </Container>
                </Container>
            )}
        </SectionCard>
    );
}

function ContactInfoCard({ profile, onSave, isSaving, error }: ProfileInfoCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [{ countryCode, nationalNumber }, setPhoneParts] = useState(() => splitPhone(profile.phone));

    async function handleSave() {
        const success = await onSave({ ...toUpdateRequest(profile), phone: combinePhone(countryCode, nationalNumber) });
        if (success) setIsEditing(false);
    }

    function handleCancel() {
        setPhoneParts(splitPhone(profile.phone));
        setIsEditing(false);
    }

    return (
        <SectionCard
            icon={<Phone size={18} />}
            title="Informations de contact"
            action={!isEditing && (
                <Button label="Modifier" variant="ghost" size="sm" onClick={() => setIsEditing(true)} />
            )}
        >
            {!isEditing && (
                <Container direction="row" justify="space-between">
                    <Text muted>Téléphone</Text>
                    <Text weight="semibold">{profile.phone || "-"}</Text>
                </Container>
            )}

            {isEditing && (
                <Container gap={14}>
                    <Container direction="row" gap={10} align="start">
                        <Container flex="0 0 190px">
                            <Select
                                label="Indicatif"
                                value={countryCode}
                                onChange={(value) => setPhoneParts((s) => ({ ...s, countryCode: value }))}
                                disabled={isSaving}
                            >
                                {COUNTRY_CODES.map((c) => (
                                    <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
                                ))}
                            </Select>
                        </Container>
                        <Container flex="1">
                            <Input
                                label="Numéro"
                                type="tel"
                                value={nationalNumber}
                                onChange={(e) => setPhoneParts((s) => ({ ...s, nationalNumber: e.target.value }))}
                                placeholder="6 12 34 56 78"
                                disabled={isSaving}
                            />
                        </Container>
                    </Container>

                    <Error error={error} />

                    <Container direction="row" gap={10}>
                        <Button label="Annuler" variant="ghost" fullWidth onClick={handleCancel} disabled={isSaving} />
                        <Button label="Enregistrer" variant="main" fullWidth onClick={handleSave} loading={isSaving} />
                    </Container>
                </Container>
            )}
        </SectionCard>
    );
}

export default function MyProfilePage() {
    const { profile, isLoading, isError } = useMyProfileQuery();
    const { updateProfile, isLoading: isSaving, error } = useUpdateProfile();
    const { requestPasswordReset, isLoading: isSendingReset } = usePasswordReset();
    const email = authStore((s) => s.user?.email);
    const [resetSent, setResetSent] = useState(false);
    const [isConfirmingReset, setIsConfirmingReset] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>();

    async function handleChangePassword() {
        if (!email) return;
        const success = await requestPasswordReset({ email });
        if (success) {
            setResetSent(true);
            setIsConfirmingReset(false);
        }
    }

    const { uploadAvatar, isUploading: isUploadingAvatar } = useAvatarUpload((avatarKey, previewUrl) => {
        if (!profile) return;
        setAvatarPreview(previewUrl);
        void updateProfile({ ...toUpdateRequest(profile), avatarKey });
    });

    if (isError) {
        return (
            <Container gap={30} maxWidth={800} margin="0 auto" padding={20}>
                <Text tag="p" align="center">Profil introuvable.</Text>
            </Container>
        );
    }

    if (isLoading || !profile) {
        return (
            <Container direction="row" align="center" justify="center" minHeight="40vh">
                <Spinner />
            </Container>
        );
    }

    const displayProfile = { ...profile, avatarUrl: avatarPreview ?? profile.avatarUrl };

    return (
        <Container maxWidth={980} margin="0 auto" padding={20} gap={28}>
            <Text tag="h1" weight="bold" size={2} animate="fadeIn">Mon profil</Text>

            <Container direction="row" gap={24} align="start" stackOnMobile>
                <Container style={{ flex: "1 1 300px" }}>
                    <ProfileOverview
                        profile={displayProfile}
                        editableAvatar
                        isUploadingAvatar={isUploadingAvatar}
                        onAvatarSelected={uploadAvatar}
                    />
                </Container>

                <Container gap={20} style={{ flex: "2 1 480px", minWidth: 0 }}>
                    <ProfileInfoCard
                        key={profile.profileId}
                        profile={profile}
                        onSave={(data) => updateProfile(data).then((res) => res !== null)}
                        isSaving={isSaving}
                        error={error}
                    />

                    <ContactInfoCard
                        key={`${profile.profileId}-contact`}
                        profile={profile}
                        onSave={(data) => updateProfile(data).then((res) => res !== null)}
                        isSaving={isSaving}
                        error={error}
                    />

                    <SectionCard icon={<ShieldCheck size={18} />} title="Sécurité">
                        {resetSent ? (
                            <Text muted>Un email vous a été envoyé pour réinitialiser votre mot de passe.</Text>
                        ) : (
                            <Button
                                label="Changer le mot de passe"
                                variant="secondary"
                                icon={<KeyRound size={18} />}
                                onClick={() => setIsConfirmingReset(true)}
                                style={{ alignSelf: "flex-start" }}
                            />
                        )}
                    </SectionCard>

                    <ReviewsNavCard
                        profileId={profile.profileId ?? ""}
                        reviewCount={profile.reviewCount}
                        avgRating={profile.avgRating}
                    />
                </Container>
            </Container>

            {isConfirmingReset && (
                <Confirmation
                    title="Changer le mot de passe ?"
                    description="Un email de réinitialisation sera envoyé à votre adresse."
                    confirmLabel="Envoyer l'email"
                    isLoading={isSendingReset}
                    onConfirm={handleChangePassword}
                    onClose={() => setIsConfirmingReset(false)}
                />
            )}
        </Container>
    );
}
