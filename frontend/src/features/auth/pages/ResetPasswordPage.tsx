
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "@/app/routes/paths.ts";
import usePasswordReset from "@/features/auth/hooks/usePasswordReset.ts";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm/ResetPasswordForm.tsx";
import Container from "@/shared/components/container/Container.tsx";

export default function ResetPasswordPage() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [email, setEmail] = useState("");
    const [requestSent, setRequestSent] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    const { requestPasswordReset, resetPassword, isLoading, error } = usePasswordReset();

    async function handleRequestSubmit(e: React.FormEvent) {
        e.preventDefault();
        const success = await requestPasswordReset({ email });
        if (success) setRequestSent(true);
    }

    async function handleResetSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!token) return;

        const success = await resetPassword({ token, newPassword });
        if (success) {
            navigate(paths.login, {
                state: { notice: "Mot de passe réinitialisé. Connectez-vous." },
            });
        }
    }

    return (
        <Container align="center" flex="1" padding={20} maxWidth={1200} margin="0 auto">
            <ResetPasswordForm
                token={token}
                email={email}
                onEmailChange={(e) => setEmail(e.target.value)}
                onRequestSubmit={handleRequestSubmit}
                requestSent={requestSent}
                newPassword={newPassword}
                onPasswordChange={setNewPassword}
                onResetSubmit={handleResetSubmit}
                isLoading={isLoading}
                error={error}
            />
        </Container>
    );
}