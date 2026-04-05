import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './baseQuery'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery(),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: [
        'Auth',
        'Profile',
        'Project',
        'ProjectHistory',
        'ProjectComment',
        'Task',
        'TaskComment',
        'Organization',
        'ProjectComments',
        'TaskStatusColumns',
        'Admin',
        'Knowledge',
    ],
    endpoints: () => ({}),
})

export default api

