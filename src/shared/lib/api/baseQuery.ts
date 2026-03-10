import { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import axios from 'axios'
import { env } from '../../../env'

const axiosInstance = axios.create({
    baseURL: env.VITE_API_BASE_URL,
    timeout: 30000,
    headers: {
        Accept: 'application/json',
    },
})

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const axiosBaseQuery = (): BaseQueryFn<
    AxiosRequestConfig | string,
    unknown,
    unknown,
    Partial<AxiosRequestConfig>
> =>async (args, _api, extraOptions) => {
    try {
        const config: AxiosRequestConfig =
            typeof args === 'string'
                ? { url: args }
                : { ...args }

        const fullConfig: AxiosRequestConfig = {
            ...config,
            baseURL: env.VITE_API_BASE_URL,
            ...extraOptions,
        }

        const result = await axiosInstance(fullConfig)

        if (result.status === 204) {
            return { data: undefined }
        }

        return { data: result.data }
    } catch (err) {
        const error = err as AxiosError

        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            // _api.dispatch(logout())
            // window.location.href = '/login'
        }

        return {
            error: {
                status: error.response?.status,
                data: error.response?.data || error.message,
            },
        }
    }
}
