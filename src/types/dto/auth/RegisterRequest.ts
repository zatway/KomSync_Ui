import {UserRole} from "../enams/UserRole.ts";

export interface RegisterRequest {
    fullName: string,
    email: string,
    password: string,
    role: UserRole,
    position: string,
    department: string
    externalProvider: string,
}
