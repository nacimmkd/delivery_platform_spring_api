import { useState } from "react";
import SignupForm from "@/features/auth/components/SignupForm/SignupForm.tsx";
import Container from "@/shared/components/container/Container.tsx";
import useRegister from "@/features/auth/hooks/useRegister.ts";
import useAuth from "@/features/auth/hooks/useAuth.ts";
import type { UserCreateRequest } from "@/shared/types";
import {useNavigate} from "react-router-dom";
import { paths } from "@/app/routes/paths.ts";


export default function SignupPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState<UserCreateRequest>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const { register, isLoading, error } = useRegister();
    const { loginWithGoogle } = useAuth();

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { user, error: registerError } = await register(form);

        if (user || registerError?.code === "USER_NOT_VERIFIED") {
            navigate(paths.verify_email, {state: { email : form.email }});
        }
    }

    function handleGoogleClick() {
        loginWithGoogle();
    }


    return (
        <Container align="center" flex="1" padding={20} maxWidth={1200} margin="0 auto">
            <SignupForm
                form={form}
                isLoading={isLoading}
                error={error}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                onGoogleClick={handleGoogleClick}
            />
        </Container>
    );
}