import { Env } from './vite-env';

export const env: Env = {
    VITE_API_BASE_URL: 'http://localhost:5237/api/v1',
    VITE_API_BASE_URL_SIGNALR_HUB: '/_/hubs/client',

    AUTH_URL: '/auth',
    AUTH_LOGIN_URL: '/login',
    AUTH_REGISTER_URL: '/register',
    AUTH_LOGOUT_URL: '/logout',
    AUTH_REFRESH_URL: '/refresh',

    PROJECTS_URL: '/projects',
    PROJECTS_HISTORY_URL: '/history',
    PROJECTS_COMMENTS_URL: '/comments',

    PROFILE_URL: '/profile',
    PROFILE_ME_AVATAR_URL: '/me/avatar',
    PROFILE_ME_URL: '/me',
    PROFILE_UPDATE_PROFILE_URL:  '/update-profile',
};

(function () {
    const ev1 = import.meta.env.MODE === 'development' ? env.VITE_API_BASE_URL : eval('"PROD_ENV_VITE_SERVICES_HOST"');
    // const protocol = '5555';
    env.VITE_API_BASE_URL = ev1 === '' ? `${globalThis.location.protocol}//${globalThis.location.hostname}` : ev1;
})();
