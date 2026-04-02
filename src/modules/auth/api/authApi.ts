import { api, authLocalService, hasValue } from '../../../shared/lib'
import { TokenResponse } from '@/types/dto/auth/TokenResponse'
import { LoginRequest } from '@/types/dto/auth/LoginRequest'
import { RegisterRequest } from '@/types/dto/auth/RegisterRequest'
import { RefreshTokenRequest } from '@/types/dto/auth/RefreshTokenRequest'
import { localStorageCore } from '@/shared/lib/storageHelper/localStorageCore'
import { env } from '@/env'
import { AppRoutes } from '@/app/routes/AppRoutes'
import { parseAccessTokenClaims } from '@/shared/lib/auth/tokenClaims'

const getUrl = (endUrl: string) => `${env.API_AUTH_PATH}${endUrl}`

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<void, RegisterRequest>({
            query: (data) => ({
                url: getUrl(env.AUTH_REGISTER_REL),
                method: 'POST',
                data,
            }),
        }),
        login: builder.mutation<TokenResponse, LoginRequest>({
            query: (data) => ({
                url: getUrl(env.AUTH_LOGIN_REL),
                method: 'POST',
                data,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    authLocalService.setTokenData(data)
                    const claims = parseAccessTokenClaims(data.accessToken)
                    if (claims) {
                        if (claims.role) authLocalService.setUserRole(claims.role)
                        if (claims.userId) localStorageCore.setItem('userId', claims.userId)
                    }
                } catch {}
            },
        }),
        refresh: builder.mutation<TokenResponse, RefreshTokenRequest>({
            query: (data) => ({
                url: getUrl(env.AUTH_REFRESH_REL),
                method: 'POST',
                data,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (!hasValue(data)) window.location.href = AppRoutes.LOGIN
                    authLocalService.setRefreshData(data)
                } catch {}
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: getUrl(env.AUTH_LOGOUT_REL),
                method: 'POST',
            }),
            invalidatesTags: ['Project', 'Task', 'TaskComment'],
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled
                } finally {
                    localStorageCore.clear()
                    dispatch(api.util.resetApiState())
                    window.location.href = AppRoutes.LOGIN
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

