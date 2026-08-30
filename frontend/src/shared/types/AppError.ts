import axios from "axios";

export type ErrorCode =
    | "UNKNOWN_ERROR" | "UNEXPECTED" | "NETWORK_ERROR" | "TIMEOUT" | "CANCELED"
    | "VALIDATION_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | (string & {});

type AppErrorOptions = {
    code?: ErrorCode;
    status?: number;
    message?: string;
    path?: string;
    timestamp?: string;
    fields?: Record<string, string>;
    requestId?: string;
    cause?: unknown;
};

type RawApiError = {
    code: string;
    message: string;
    path?: string;
    timestamp?: string;
    errors?: { field: string; message: string }[];
};

/** Messages génériques affichés quand l'API ne fournit pas de message utilisateur. */
const DEFAULT_MESSAGES: Partial<Record<ErrorCode, string>> = {
    UNKNOWN_ERROR: "Un problème est survenu. Veuillez réessayer plus tard.",
    UNEXPECTED: "Un problème est survenu. Veuillez réessayer plus tard.",
    NETWORK_ERROR: "Vérifiez votre connexion internet.",
    TIMEOUT: "La requête a expiré. Veuillez réessayer.",
    CANCELED: "Requête annulée.",
};

export class AppError extends Error {
    readonly code: ErrorCode;
    readonly status: number;
    readonly path: string;
    readonly timestamp: string;
    readonly fields: Record<string, string>;
    readonly requestId?: string;

    constructor({
        code = "UNKNOWN_ERROR",
        status = 500,
        message = DEFAULT_MESSAGES[code] ?? DEFAULT_MESSAGES.UNKNOWN_ERROR!,
        path = "",
        timestamp = new Date().toISOString(),
        fields = {},
        requestId,
        cause,
    }: AppErrorOptions = {}) {
        super(message, { cause });
        this.name = "AppError";
        this.code = code;
        this.status = status;
        this.path = path;
        this.timestamp = timestamp;
        this.fields = fields;
        this.requestId = requestId;
    }

    get hasFieldErrors() { return Object.keys(this.fields).length > 0; }
    get isCanceled()     { return this.code === "CANCELED"; }
    get isAuthError()    { return this.status === 401 || this.status === 403; }
    get isRetryable()    { return this.status >= 500 || this.status === 429 || this.code === "TIMEOUT"; }

    /** Builds an AppError from whatever a failed request threw. */
    static from(err: unknown): AppError {
        if (err instanceof AppError) return err;
        if (axios.isCancel(err)) return new AppError({ code: "CANCELED", status: 0 });
        if (!axios.isAxiosError(err)) return new AppError({ code: "UNEXPECTED", cause: err });
        if (err.code === "ECONNABORTED") return new AppError({ code: "TIMEOUT", status: 0, cause: err });
        if (!err.response) return new AppError({ code: "NETWORK_ERROR", status: 0, cause: err });

        const { status, data, headers, config } = err.response;
        const requestId = headers?.["x-request-id"] as string | undefined;
        const path = config?.url ?? "";

        if (!data || typeof data !== "object" || !("code" in data)) {
            return new AppError({ status, path, requestId, cause: err });
        }

        const raw = data as RawApiError;
        const fields = Object.fromEntries(
            (raw.errors ?? []).map((e) => [e.field, e.message]),
        );

        return new AppError({
            code: raw.code,
            status,
            message: raw.message,
            path: raw.path ?? path,
            timestamp: raw.timestamp,
            fields,
            requestId,
            cause: err,
        });
    }
}

export const unknownError = (cause?: unknown) => new AppError({ code: "UNEXPECTED", cause });
