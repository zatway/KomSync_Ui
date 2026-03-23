export type Env = {
    VITE_API_BASE_URL_SIGNALR_HUB: string;
    VITE_API_BASE_URL: string;

    AUTH_URL: string;
    AUTH_LOGIN_URL: string;
    AUTH_REGISTER_URL: string;
    AUTH_LOGOUT_URL: string;
    AUTH_REFRESH_URL: string;

    PROJECTS_URL: string;
    PROJECTS_HISTORY_URL: string;
    PROJECTS_COMMENTS_URL: string;

    PROFILE_URL: string;
    PROFILE_ME_AVATAR_URL: string;
    PROFILE_ME_URL: string;
    PROFILE_UPDATE_PROFILE_URL: string;
};

export {};

declare global {
    interface Window {
        env: {
            VITE_SERVICES_HOST: string;
        };
    }
}
