/** Разбор ProblemDetails / ValidationProblemDetails с API ASP.NET Core и RTK Query */

type ProblemBody = {
    title?: string;
    detail?: string;
    errors?: Record<string, string[]>;
};

export type ApiErrorMessageOptions = {
    /** Вход / регистрация: 401 — неверные учётные данные */
    authContext?: boolean;
};

function extractStatusAndData(error: unknown): { status?: number; data?: unknown } {
    if (typeof error !== "object" || error === null) return {};
    const e = error as Record<string, unknown>;
    if (typeof e.status === "number") {
        return { status: e.status, data: e.data };
    }
    const nested = e.error;
    if (typeof nested === "object" && nested !== null) {
        const n = nested as Record<string, unknown>;
        if (typeof n.status === "number") {
            return { status: n.status, data: n.data };
        }
    }
    return {};
}

export function getApiErrorMessage(error: unknown, options?: ApiErrorMessageOptions): string {
    const { status, data } = extractStatusAndData(error);

    if (options?.authContext && status === 401) {
        return "Неверный email или пароль";
    }

    if (typeof data === "string" && data.trim()) return data;

    if (typeof data === "object" && data !== null) {
        const d = data as ProblemBody;
        if (typeof d.detail === "string" && d.detail.trim()) return d.detail;
        if (d.errors && typeof d.errors === "object") {
            const firstKey = Object.keys(d.errors)[0];
            const msgs = firstKey ? d.errors[firstKey] : undefined;
            if (msgs?.length) return msgs[0]!;
        }
        if (typeof d.title === "string" && d.title && !d.title.toLowerCase().includes("validation")) {
            return d.title;
        }
    }

    if (status === 401) return "Сессия истекла. Войдите снова";
    if (status === 403) return "Недостаточно прав";
    if (status === 404) return "Не найдено";
    if (status === 409) return "Конфликт данных";

    if (typeof error === "object" && error !== null && "message" in error) {
        const m = (error as { message?: string }).message;
        if (typeof m === "string" && m && m !== "Rejected") return m;
    }

    return "Произошла ошибка";
}

export function getApiValidationErrors(error: unknown): Record<string, string> | null {
    if (typeof error !== "object" || error === null) return null;
    const { data } = extractStatusAndData(error);
    if (typeof data !== "object" || data === null) return null;
    const errors = (data as ProblemBody).errors;
    if (!errors) return null;
    const flat: Record<string, string> = {};
    for (const [key, msgs] of Object.entries(errors)) {
        if (msgs?.[0]) flat[key] = msgs[0]!;
    }
    return Object.keys(flat).length ? flat : null;
}
