import axiosInstanceCreator from './axiosInstance.ts';
import type {AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType} from 'axios';
import {env} from "../../../env.ts";

export interface RequestOptions<T = any> {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    headers?: Record<string, string>;
    body?: T;
    errorText?: string;
    showPopup?: boolean;
    isFormData?: boolean;
    responseType?: ResponseType;
    timeout?: number;
    signal?: AbortSignal;
}

export interface ApiResponse<T> {
    data?: T;
    error?: {
        displayText: string;
        status?: number;
        body?: unknown;
    };
}

class ApiService {
    private axios;

    constructor(baseURL: string) {
        this.axios = axiosInstanceCreator(baseURL);
    }

    private async request<TReq = any, TRes = any>(
        endpoint: string = '',
        options: RequestOptions<TReq> = {},
    ): Promise<ApiResponse<TRes>> {
        const {
            method = 'GET',
            headers = {},
            body,
            errorText,
            isFormData = false,
            responseType = 'json',
            ...axiosOptions
        } = options;

        let errorMessage = errorText ?? 'Произошла ошибка при выполнении запроса';

        try {
            let finalHeaders = { ...headers };
            let data: any = body;

            if (isFormData && body) {
                data = this.toFormData(body as Record<string, any>);
            } else if (body && !['GET', 'DELETE'].includes(method)) {
                finalHeaders['Content-Type'] = finalHeaders['Content-Type'] ?? 'application/json';
                data = body;
            }

            const config: AxiosRequestConfig = {
                url: endpoint,
                method,
                headers: finalHeaders,
                data,
                responseType,
                ...axiosOptions,
            };

            const response: AxiosResponse<TRes> = await this.axios(config);

            // 204 No Content → возвращаем пустой успешный ответ
            if (response.status === 204) {
                return { data: undefined as TRes };
            }

            return { data: response.data };
        } catch (err) {
            const error = err as AxiosError;

            const status = error.response?.status;
            let errorBody: unknown;

            if (status === 401) {
                // interceptor уже обработал редирект → сюда почти не попадём
                errorMessage = 'Сессия истекла. Перенаправление на страницу входа...';
            } else if (error.response?.data) {
                errorBody = error.response.data;
                if (errorBody && typeof errorBody === 'object') {
                    errorMessage =
                        // @ts-expect-error
                        (errorBody.message ?? errorBody.error ?? errorBody.title) || errorMessage;
                }
            } else if (error.request) {
                errorMessage = 'Нет ответа от сервера. Проверьте интернет-соединение.';
            }

            console.error(`[API] ${method} ${endpoint} → ${status || 'нет ответа'}`, {
                message: errorMessage,
                body: errorBody,
            });

            return {
                error: {
                    displayText: errorMessage,
                    status,
                    body: errorBody,
                },
            };
        }
    }

    private toFormData(obj: Record<string, any>): FormData {
        const formData = new FormData();

        Object.entries(obj).forEach(([key, value]) => {
            if (value === null || value === undefined) return;

            if (value instanceof File || value instanceof Blob) {
                formData.append(key, value);
            } else if (Array.isArray(value)) {
                value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
            } else if (value && typeof value === 'object') {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, String(value));
            }
        });

        return formData;
    }

    get<T>(endpoint: string, options?: Omit<RequestOptions, 'body'>) {
        return this.request<never, T>(endpoint, { method: 'GET', ...options });
    }

    post<TReq, TRes>(endpoint: string, body?: TReq, options?: RequestOptions<TReq>) {
        return this.request<TReq, TRes>(endpoint, { method: 'POST', body, ...options });
    }

    put<TReq, TRes>(endpoint: string, body?: TReq, options?: RequestOptions<TReq>) {
        return this.request<TReq, TRes>(endpoint, { method: 'PUT', body, ...options });
    }

    patch<TReq, TRes>(endpoint: string, body?: TReq, options?: RequestOptions<TReq>) {
        return this.request<TReq, TRes>(endpoint, { method: 'PATCH', body, ...options });
    }

    delete<T>(endpoint: string, options?: Omit<RequestOptions, 'body'>) {
        return this.request<never, T>(endpoint, { method: 'DELETE', ...options });
    }
}

const api = new ApiService(env.VITE_API_BASE_URL);

export default api;
