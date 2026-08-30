import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignupForm.module.css";
import { paths } from "@/app/routes/paths";
import Button from "@/shared/components/button/Button";
import Icon from "@/shared/components/icon/Icon";
import Input from "@/shared/components/input/Input";
import Text from "@/shared/components/text/Text";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import Divider from "@/shared/components/divider/Divider";
import Error from "@/shared/components/error/Error.tsx";
import Container from "@/shared/components/container/Container.tsx";
import type { UserCreateRequest } from "@/shared/types";
import type { AppError } from "@/shared/types/AppError";

type SignupFormProps = {
    form: UserCreateRequest;
    isLoading: boolean;
    error: AppError | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onGoogleClick: () => void;
};

export default function SignupForm({
    form,
    isLoading,
    error,
    onChange,
    onSubmit,
    onGoogleClick,
}: SignupFormProps) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Container variant="elevated" maxWidth={440} gap={22} className={styles.container}>

            <Error error={error} />

            <Container gap={0} className={styles.heading}>
                <Text tag="h1" weight="bold" size={2}>Create your account</Text>
                <Text tag="p" muted>Join Ecolis and start sending parcels</Text>
            </Container>

            <form className={styles.form} onSubmit={onSubmit}>

                <div className={styles.row}>
                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        label="First name"
                        placeholder="Nacim"
                        autoComplete="given-name"
                        required
                        onChange={onChange}
                        value={form.firstName}
                        error={error?.fields.firstName}
                    />
                    <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        label="Last name"
                        placeholder="Benali"
                        autoComplete="family-name"
                        required
                        onChange={onChange}
                        value={form.lastName}
                        error={error?.fields.lastName}
                    />
                </div>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="vous@exemple.com"
                    autoComplete="email"
                    required
                    onChange={onChange}
                    value={form.email}
                    error={error?.fields.email}
                />

                <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    onChange={onChange}
                    value={form.password}
                    error={error?.fields.password}
                    hint={<Text tag="small" muted>At least 8 characters</Text>}
                    suffix={
                        showPassword ? (
                            <EyeOff
                                size={18}
                                className={styles.toggle}
                                onClick={() => setShowPassword((v) => !v)}
                            />
                        ) : (
                            <Eye
                                size={18}
                                className={styles.toggle}
                                onClick={() => setShowPassword((v) => !v)}
                            />
                        )
                    }
                />

                <label className={styles.terms}>
                    <input className={styles.checkbox} type="checkbox" required />
                    <span>
                        I agree to the{" "}
                        <Link className={styles.link} to={""}>Terms</Link>
                        {" "}and{" "}
                        <Link className={styles.link} to={""}>Privacy Policy</Link>
                    </span>
                </label>

                <Button
                    label="Create account"
                    type="submit"
                    variant="main"
                    fullWidth
                    icon={<ArrowUpRight size={20} />}
                    iconPosition="right"
                    loading={isLoading}
                />

            </form>

            <Divider text="OR CONTINUE WITH" />

            <Button
                label="Google"
                variant="secondary"
                fullWidth
                onClick={onGoogleClick}
                icon={<Icon src="/google_logo.png" size={18} />}
                iconPosition="left"
            />

            <p className={styles.footer}>
                Already have an account? <Link className={styles.link} to={paths.login}>Sign in</Link>
            </p>

        </Container>
    );
}