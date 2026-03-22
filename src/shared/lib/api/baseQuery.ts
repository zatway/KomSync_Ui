import {BaseQueryFn} from '@reduxjs/toolkit/query'
import type {AxiosRequestConfig, AxiosError} from 'axios'

import axios from 'axios'
import {env} from "@/env";

export const axiosInstance = axios.create({
    baseURL: env.VITE_API_BASE_URL,
    timeout: 30000,
    headers: {
        Accept: 'application/json',
    },
})

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

type AxiosBaseQueryArgs = {
    url: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
}

type AxiosBaseQueryError = {
    status?: number
    data: unknown
}

export const axiosBaseQuery =
    (): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =>
        async ({url, method = 'GET', data, params}) => {
            try {
                const result = await axiosInstance({
                    url,
                    method,
                    data,
                    params,
                })

                return {
                    data: result.data,
                }
            } catch (err) {
                const error = err as AxiosError

                if (error.response?.status === 401) {
                    localStorage.removeItem('token')
                    // dispatch(logout())
                }

                return {
                    error: {
                        status: error.response?.status,
                        data: error.response?.data ?? error.message,
                    },
                }
            }
        }
