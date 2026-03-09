import axios, { AxiosError, AxiosInstance } from 'axios';

const createAxiosInstance = (baseURL: string): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        timeout: 30000,
        headers: {
            Accept: 'application/json',
        },
    });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
        (response) => response,

        async (error: AxiosError) => {
            const status = error.response?.status;

            if (status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }

            return Promise.reject(error);
        },
    );

    return instance;
};

export default createAxiosInstance;
