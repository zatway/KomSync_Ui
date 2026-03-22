import {api, authLocalService, hasValue} from '../../../shared/lib'
import {TokenResponse} from "@/types/dto/auth/TokenResponse";
import {LoginRequest} from "@/types/dto/auth/LoginRequest";
import {RegisterRequest} from "@/types/dto/auth/RegisterRequest";
import {RefreshTokenRequest} from "@/types/dto/auth/RefreshTokenRequest";
import {localStorageCore} from "@/shared/lib/storageHelper/localStorageCore";
import {UserResponse} from "@/types/dto/auth/UserResponse";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<void, RegisterRequest>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
        }),

        login: builder.mutation<TokenResponse, LoginRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
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

        getMeInfo: builder.query<UserResponse, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
            }),
            // providesTags: (_, __, projectId) => [{ type: "ProjectHistory", id: projectId }],
        }),

        refresh: builder.mutation<TokenResponse, RefreshTokenRequest>({
            query: (body) => ({
                url: '/auth/refresh',
                method: 'POST',
                body,
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
            query: (body) => ({
                url: '/auth/logout',
                method: 'POST',
                body,
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
