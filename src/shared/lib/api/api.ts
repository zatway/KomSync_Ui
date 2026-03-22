import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './baseQuery'

export const api = createApi({
    reducerPath: 'api',

    baseQuery: axiosBaseQuery(),

    refetchOnFocus: true,
    refetchOnReconnect: true,

    tagTypes: [
        'Auth',
        'Project',
        'Task',
        'TaskComment',
        'Organization',
        'ProjectComments',
    ],

    endpoints: () => ({}),
})

export default api
