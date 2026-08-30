import { Navigate, Outlet, useLocation } from "react-router-dom";
import styles from "./RequireAuth.module.css";
import authStore from "@/features/auth/store/auth.store.ts";
import { paths } from "@/app/routes/paths.ts";
import Spinner from "@/shared/components/spinner/Spinner.tsx";

export default function RequireAuth() {
    const isAuthenticated = authStore((s) => s.isAuthenticated);
    const isInitializing = authStore((s) => s.isInitializing);
    const location = useLocation();

    if (isInitializing) {
        return (
            <div className={styles.container}>
                <Spinner/>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={paths.login} state={{ from: location }} replace />;
    }

    return <Outlet />;
}
