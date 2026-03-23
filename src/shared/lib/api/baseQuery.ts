import {BaseQueryFn} from '@reduxjs/toolkit/query'
import type {AxiosRequestConfig, AxiosError} from 'axios'

import axios from 'axios'
import {env} from "@/env";

export const axiosInstance = axios.create({
    baseURL: env.VITE_API_BASE_URL,
    timeout: 30000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    transformRequest: [(data) => {
        return JSON.stringify(data);
    }],
})

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken')

    if (token) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`
    }

    return config
})

type AxiosBaseQueryArgs = {
    url: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    responseType?: AxiosRequestConfig['responseType']
}

type AxiosBaseQueryError = {
    status?: number
    data: unknown
}

export const axiosBaseQuery =
    (): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =>
        async ({url, method = 'GET', data, params, responseType}) => {
            try {
                const result = await axiosInstance({
                    url,
                    method,
                    data,
                    params,
                    responseType,
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
