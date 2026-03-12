import {UserRole} from "@/types/dto/enums/UserRole";
import {TokenResponse} from "@/types/dto/auth/TokenResponse";
import { localStorageCore } from "../storageHelper/localStorageCore";

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ROLE_KEY = 'roles';
const ALLOW_NODES_KEY = 'allowNodes';
const EXPIRED_UTC_KEY = 'expiredUtc';
const SCOPES_KEY = 'scopes';
const ID = 'id';

const keys = [TOKEN_KEY, REFRESH_TOKEN_KEY, USER_ROLE_KEY, ALLOW_NODES_KEY, EXPIRED_UTC_KEY, SCOPES_KEY, ID];

export const authLocalService = {
    setToken: (token: string): void => {
        localStorageCore.setItem(TOKEN_KEY, token);
    },
    getToken: (): string | null => {
        return localStorageCore.getItem<string>(TOKEN_KEY);
    },
    setRefreshToken: (refreshToken: string): void => {
        localStorageCore.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },
    getRefreshToken: (): string | null => {
        return localStorageCore.getItem<string>(REFRESH_TOKEN_KEY);
    },
    getUserId: (): string | null => {
        return localStorageCore.getItem<string>(ID);
    },
    getExpiredUtc: (): string | null => {
        return localStorageCore.getItem<string>(EXPIRED_UTC_KEY);
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
    clearTokenData: (): void => {
        keys.forEach((key) => {
            localStorageCore.removeItem(key);
        });
    },
};
