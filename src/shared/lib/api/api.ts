import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './baseQuery'

export const api = createApi({
    reducerPath: 'api',

    baseQuery: axiosBaseQuery(),

    // Если позже захочешь добавить refetch на фокус / reconnect / etc.
    // refetchOnMountOrArgChange: 30,
    // refetchOnFocus: true,
    // refetchOnReconnect: true,

    tagTypes: [
        'Auth',
        'Project',
        'Task',
        'TaskComment',
        // добавляй свои теги по мере необходимости
    ],

    endpoints: () => ({}), // пока пусто — будем добавлять в отдельных файлах
})

export default api
