import {api} from '../../../shared/lib'
import {env} from '@/env';
import {UserResponse} from "@/types/dto/auth/UserResponse";

const getUrl = (endUrl: string) => `${env.PROFILE_URL}${endUrl}`;

export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMeInfo: builder.query<UserResponse, void>({
            query: () => ({
                url: getUrl(env.PROFILE_ME_URL),
                method: 'GET',
            }),
        }),

        getMeAvatar: builder.query<Blob, void>({
            query: () => ({
                url: getUrl(env.PROFILE_ME_AVATAR_URL),
                method: 'GET',
                responseType: 'blob',
            }),
        }),

        // updateProfile: builder.mutation<TokenResponse, RefreshTokenRequest>({
        //     query: (data) => ({
        //         url: getUrl(env.AUTH_REFRESH_URL),
        //         method: 'POST',
        //         data,
        //     }),
        //     async onQueryStarted(_, {queryFulfilled}) {
        //         try {
        //             const {data} = await queryFulfilled
        //             if (!hasValue(data)) window.location.href = '/login';
        //             authLocalService.setRefreshData(data)
        //         } catch {
        //         }
        //     },
        // }),
    }),
})

export const {
    useGetMeInfoQuery,
    useGetMeAvatarQuery,
} = profileApi
