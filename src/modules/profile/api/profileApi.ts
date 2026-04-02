import { api } from '../../../shared/lib'
import { env } from '@/env'
import { UserResponse } from '@/types/dto/auth/UserResponse'

const getUrl = (endUrl: string) => `${env.API_PROFILE_PATH}${endUrl}`

export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMeInfo: builder.query<UserResponse, void>({
            query: () => ({
                url: getUrl(env.PROFILE_ME_SUFFIX),
                method: 'GET',
            }),
            providesTags: ['Profile'],
        }),
        getMeAvatar: builder.query<Blob, void>({
            query: () => ({
                url: getUrl(env.PROFILE_ME_AVATAR_SUFFIX),
                method: 'GET',
                responseType: 'blob',
            }),
            providesTags: ['Profile'],
        }),
        updateProfile: builder.mutation<
            boolean,
            {
                avatarFile?: File | null
                fullName?: string | null
                email?: string | null
                isDeletedAvatar?: boolean | null
                departmentId?: string | null
                positionId?: string | null
            }
        >({
            query: (arg) => {
                const fd = new FormData()
                if (arg.avatarFile) fd.append('AvatarFile', arg.avatarFile)
                if (arg.fullName != null) fd.append('FullName', arg.fullName)
                if (arg.email != null) fd.append('Email', arg.email)
                if (arg.isDeletedAvatar != null) fd.append('idDeletedAvatar', String(arg.isDeletedAvatar))
                if (arg.departmentId != null) fd.append('DepartmentId', arg.departmentId)
                if (arg.positionId != null) fd.append('PositionId', arg.positionId)
                return {
                    url: getUrl(env.PROFILE_UPDATE_SUFFIX),
                    method: 'POST',
                    data: fd,
                }
            },
            invalidatesTags: ['Profile'],
        }),
    }),
})

export const { useGetMeInfoQuery, useGetMeAvatarQuery, useUpdateProfileMutation } = profileApi

