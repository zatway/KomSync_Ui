export interface LoginRequest {
    email: string;
    password: string;
    externalProvider?: string;
}
