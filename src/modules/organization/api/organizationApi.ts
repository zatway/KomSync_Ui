import {api} from "../../../shared/lib";
import {DepartmentsDto} from "@/types/dto/organization/DepartmentsDto";
import {PositionsDto} from "@/types/dto/organization/PositionsDto";
import {AddedDepartmentRequest} from "@/types/dto/organization/AddedDepartmentRequest";
import {AddedPositionRequest} from "@/types/dto/organization/AddedPositionRequest";

export const organizationApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getDepartments: builder.query<DepartmentsDto[], void>({
            query: () => '/departments',
            providesTags: ['Organization'],
        }),

        getPosition: builder.query<PositionsDto[], void>({
            query: () => '/positions',
            providesTags: ['Organization'],
        }),

        addedDepartments: builder.mutation<AddedDepartmentRequest, string>({
            query: (body) => ({
                url: '/departments',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Organization'],
        }),

        addedPositions: builder.mutation<AddedPositionRequest, string>({
            query: (body) => ({
                url: '/positions',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Organization'],
        }),
    }),
})

export const {
    useGetDepartmentsQuery,
    useGetPositionQuery,
} = organizationApi
