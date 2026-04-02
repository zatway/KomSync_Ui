import type { Env } from "./vite-env";

/** Единая точка конфигурации URL: API-сегменты и пути SPA. */
export const env: Env = {
    VITE_API_BASE_URL: "http://localhost:5237/api/v1",
    VITE_API_BASE_URL_SIGNALR_HUB: "/hubs/notifications",

    API_AUTH_PATH: "/auth",
    API_PROJECTS_PATH: "/projects",
    API_TASK_PATH: "/Task",
    API_TASK_COMMENTS_PATH: "/TaskComments",
    API_ADMIN_PATH: "/admin",
    API_ORGANIZATION_PATH: "/Organization",
    API_PROFILE_PATH: "/profile",

    PROJECT_TASK_STATUS_COLUMNS_SUFFIX: "/task-status-columns",
    PROJECTS_HISTORY_SUFFIX: "/history",
    PROJECTS_COMMENTS_SUFFIX: "/comments",
    PROJECT_COMMENT_BY_ID_PREFIX: "/comments",

    PROFILE_ME_SUFFIX: "/me",
    PROFILE_ME_AVATAR_SUFFIX: "/me/avatar",
    PROFILE_UPDATE_SUFFIX: "/update-profile",

    API_DEPARTMENTS_PATH: "/departments",
    API_POSITIONS_PATH: "/positions",

    ROUTE_LOGIN: "/login",
    ROUTE_REGISTER: "/register",
    ROUTE_PROJECTS: "/projects",
    ROUTE_PROJECT_CREATE: "/projects/create",
    ROUTE_TASKS: "/tasks",
    ROUTE_KNOWLEDGE: "/knowledge",
    ROUTE_ADMIN: "/admin",
    ROUTE_PROFILE: "/profile",

    AUTH_REGISTER_REL: "/register",
    AUTH_LOGIN_REL: "/login",
    AUTH_LOGOUT_REL: "/logout",
    AUTH_REFRESH_REL: "/refresh",
};

(function () {
    const ev1 =
        import.meta.env.MODE === "development"
            ? env.VITE_API_BASE_URL
            : eval('"PROD_ENV_VITE_SERVICES_HOST"');
    env.VITE_API_BASE_URL =
        ev1 === "" ? `${globalThis.location.protocol}//${globalThis.location.hostname}` : ev1;
})();

/** Полный URL хаба SignalR (вне префикса `/api/v1`). */
export function getSignalRNotificationsHubUrl(): string {
    try {
        const api = new URL(env.VITE_API_BASE_URL);
        const origin = `${api.protocol}//${api.host}`;
        return `${origin}${env.VITE_API_BASE_URL_SIGNALR_HUB}`;
    } catch {
        return `${globalThis.location.origin}${env.VITE_API_BASE_URL_SIGNALR_HUB}`;
    }
}
