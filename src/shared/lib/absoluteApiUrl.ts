import { env } from "@/env";

/** Превращает относительный путь API (`/api/v1/...`) в полный URL бэкенда (для ссылок скачивания). */
export function toAbsoluteApiUrl(pathOrUrl: string): string {
    if (!pathOrUrl) return pathOrUrl;
    if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
    try {
        const origin = new URL(env.VITE_API_BASE_URL).origin;
        const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
        return `${origin}${path}`;
    } catch {
        return pathOrUrl;
    }
}
