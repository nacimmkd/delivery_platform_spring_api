import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "@/features/auth/components/LoginForm/LoginForm.tsx";
import Container from "@/shared/components/container/Container.tsx";
import useAuth from "@/features/auth/hooks/useAuth.ts";
import { paths } from "@/app/routes/paths.ts";
import type { AuthRequest } from "@/shared/types";
import * as React from "react";
import { AppError } from "@/shared/types/AppError.ts";

export default function LoginPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const from = location.state?.from ?? paths.home;
    const { login, loginWithGoogle, isLoading, error } = useAuth();

    const [form, setForm] = useState<AuthRequest>({ email: "", password: "" });
    const [ notice ] = useState<string | null>(() => location.state?.notice ?? null);
    const [ oauthError ] = useState<AppError | null>(() => readOAuthError(searchParams));


    useEffect(() => {
        if (searchParams.get("status") === "success") {
            navigate(paths.home, { replace: true });
            return;
        }
        if (searchParams.has("status")) {
            navigate(paths.login, { replace: true });
        }
    }, [navigate, searchParams]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const err: AppError | null = await login(form);
        if (!err) {
            navigate(from, { replace: true });
            return;
        }
        if (err.code === "USER_NOT_VERIFIED") {
            navigate(paths.verify_email, { state: { email: form.email } });
        }
    }

    return (
        <Container align="center" flex="1" padding={20} maxWidth={1200} margin="0 auto">
            <LoginForm
                form={form}
                isLoading={isLoading}
                error={error ?? oauthError}
                notice={notice}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                onGoogleClick={loginWithGoogle}
            />
        </Container>
    );
}

function readOAuthError(searchParams: URLSearchParams): AppError | null {
    if (searchParams.get("status") !== "error") return null;
    return new AppError({ message: "La connexion Google a échoué." });
}