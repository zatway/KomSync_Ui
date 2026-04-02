import { api } from '../../../shared/lib'
import { DepartmentsDto } from '@/types/dto/organization/DepartmentsDto'
import { PositionsDto } from '@/types/dto/organization/PositionsDto'
import { AddedDepartmentRequest } from '@/types/dto/organization/AddedDepartmentRequest'
import { AddedPositionRequest } from '@/types/dto/organization/AddedPositionRequest'
import { env } from '@/env'

export const organizationApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getDepartments: builder.query<DepartmentsDto[], void>({
            query: () => ({ url: env.API_DEPARTMENTS_PATH, method: 'GET' }),
            providesTags: ['Organization'],
        }),
        getPosition: builder.query<PositionsDto[], void>({
            query: () => ({ url: env.API_POSITIONS_PATH, method: 'GET' }),
            providesTags: ['Organization'],
        }),
        addedDepartments: builder.mutation<AddedDepartmentRequest, string>({
            query: (name) => ({ url: env.API_DEPARTMENTS_PATH, method: 'POST', data: { name } }),
            invalidatesTags: ['Organization'],
        }),
        addedPositions: builder.mutation<AddedPositionRequest, string>({
            query: (name) => ({ url: env.API_POSITIONS_PATH, method: 'POST', data: { name } }),
            invalidatesTags: ['Organization'],
        }),
    }),
})

export const { useGetDepartmentsQuery, useGetPositionQuery } = organizationApi

