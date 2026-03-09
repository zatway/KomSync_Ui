import { Env } from './vite-env';

export const env: Env = {
    VITE_API_BASE_URL: 'http://localhost:5237',
    VITE_API_BASE_URL_SIGNALR_HUB: '/_/hubs/client',
};

(function () {
    const ev1 = import.meta.env.MODE === 'development' ? env.VITE_API_BASE_URL : eval('"PROD_ENV_VITE_SERVICES_HOST"');
    // const protocol = '5555';
    env.VITE_API_BASE_URL = ev1 === '' ? `${globalThis.location.protocol}//${globalThis.location.hostname}` : ev1;
})();
