export type Env = {
    VITE_API_BASE_URL_SIGNALR_HUB: string;
    VITE_API_BASE_URL: string;
};

export {};

declare global {
    interface Window {
        env: {
            VITE_SERVICES_HOST: string;
        };
    }
}
