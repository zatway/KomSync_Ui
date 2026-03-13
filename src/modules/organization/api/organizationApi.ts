import {api} from "../../../shared/lib";
import {DepartmentsDto} from "@/types/dto/organization/DepartmentsDto";
import {PositionsDto} from "@/types/dto/organization/PositionsDto";

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
    }),
})

export const {
    useGetDepartmentsQuery,
    useGetPositionQuery,
} = organizationApi
