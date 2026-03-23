import {api, authLocalService, hasValue} from '../../../shared/lib'
import {TokenResponse} from "@/types/dto/auth/TokenResponse";
import {LoginRequest} from "@/types/dto/auth/LoginRequest";
import {RegisterRequest} from "@/types/dto/auth/RegisterRequest";
import {RefreshTokenRequest} from "@/types/dto/auth/RefreshTokenRequest";
import {localStorageCore} from "@/shared/lib/storageHelper/localStorageCore";
import {env} from '@/env';

const getUrl = (endUrl: string) => `${env.AUTH_URL}${endUrl}`;

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<void, RegisterRequest>({
            query: (data) => ({
                url: getUrl(env.AUTH_REGISTER_URL),
                method: 'POST',
                data,
            }),
        }),

        login: builder.mutation<TokenResponse, LoginRequest>({
            query: (data) => ({
                url: getUrl(env.AUTH_LOGIN_URL),
                method: 'POST',
                data,
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    authLocalService.setTokenData(data)
                    // localStorage.setItem('token', data.accessToken)
                    // dispatch(setUser(data.user))
                } catch {
                }
            },
        }),

        refresh: builder.mutation<TokenResponse, RefreshTokenRequest>({
            query: (data) => ({
                url: getUrl(env.AUTH_REFRESH_URL),
                method: 'POST',
                data,
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    if (!hasValue(data)) window.location.href = '/login';
                    authLocalService.setRefreshData(data)
                } catch {
                }
            },
        }),

        logout: builder.mutation<void, void>({
            query: (data) => ({
                url: getUrl(env.AUTH_LOGOUT_URL),
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Project', 'Task', 'TaskComment'],

            // Самое важное — полностью очищаем кэш
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    await queryFulfilled // ждём успешного ответа от сервера
                    // dispatch(logoutFromUserSlice()) — если есть
                    // window.location.href = '/login' — можно здесь или в компоненте
                } finally {
                    localStorageCore.clear();
                    dispatch(api.util.resetApiState())
                    window.location.href = '/login'
                }
            },
        }),
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation,
} = authApi
