import {UserRole} from "@/types/dto/enums/UserRole";
import {TokenResponse} from "@/types/dto/auth/TokenResponse";
import { localStorageCore } from "../storageHelper/localStorageCore";

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ROLE_KEY = 'role';
const TOKEN_EXPIRED_UTC_KEY = 'accessTokenExpiredAt';
const REFRESH_TOKEN_EXPIRED_UTC_KEY = 'refreshTokenExpiredAt';
const USER_ID = 'userId';

const keys = [TOKEN_KEY, REFRESH_TOKEN_KEY, USER_ROLE_KEY, TOKEN_EXPIRED_UTC_KEY, REFRESH_TOKEN_EXPIRED_UTC_KEY, USER_ID];

export const authLocalService = {
    getToken: (): string | null => {
        return localStorageCore.getItem<string>(TOKEN_KEY);
    },
    getRefreshToken: (): string | null => {
        return localStorageCore.getItem<string>(REFRESH_TOKEN_KEY);
    },
    getUserId: (): string | null => {
        return localStorageCore.getItem<string>(USER_ID);
    },
    getAccessTokenExpiredUtc: (): string | null => {
        return localStorageCore.getItem<string>(TOKEN_EXPIRED_UTC_KEY);
    },
    getRefreshTokenExpiredUtc: (): string | null => {
        return localStorageCore.getItem<string>(REFRESH_TOKEN_EXPIRED_UTC_KEY);
    },
    setUserRole: (role: string | UserRole): void => {
        localStorageCore.setItem(USER_ROLE_KEY, role);
    },
    getUserRole: (): UserRole | null => {
        return localStorageCore.getItem<UserRole>(USER_ROLE_KEY);
    },
    hasAuthData: (): boolean => {
        return localStorageCore.hasItem(TOKEN_KEY) && localStorageCore.hasItem(REFRESH_TOKEN_KEY);
    },
    setTokenData: (identityData: TokenResponse) => {
        Object.entries(identityData).forEach(([key, value]) => {
            localStorageCore.setItem(key, value);
        });
    },
    setRefreshData: (data: Pick<TokenResponse, "refreshToken" | "refreshTokenExpiredAt">) => {
        localStorageCore.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
        localStorageCore.setItem(REFRESH_TOKEN_EXPIRED_UTC_KEY, String(data.refreshTokenExpiredAt));
    },
    clearTokenData: (): void => {
        keys.forEach((key) => {
            localStorageCore.removeItem(key);
        });
    },
};
