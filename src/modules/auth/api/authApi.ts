import { api } from '../../../shared/lib'
import {
    LoginRequest,
    RegisterRequest,
    RefreshTokenRequest,
    RevokeTokenRequest,
    TokenResponse,
    RefreshTokenResponse,
} from '../../../types/dto'

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<TokenResponse, RegisterRequest>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
            // После регистрации можно сразу залогинить или ничего не инвалидировать
        }),

        login: builder.mutation<TokenResponse, LoginRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled
                    // localStorage.setItem('token', data.accessToken)
                    // dispatch(setUser(data.user))
                } catch {
                }
            },
        }),

        refresh: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
            query: (body) => ({
                url: '/auth/refresh',
                method: 'POST',
                body,
            }),
        }),

        logout: builder.mutation<void, RevokeTokenRequest>({
            query: (body) => ({
                url: '/auth/logout',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Project', 'Task', 'TaskComment'],

            // Самое важное — полностью очищаем кэш
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled // ждём успешного ответа от сервера
                    // dispatch(logoutFromUserSlice()) — если есть
                    // window.location.href = '/login' — можно здесь или в компоненте
                } finally {
                    localStorage.removeItem('token')
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
