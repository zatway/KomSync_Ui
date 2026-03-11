import { UserRole } from "@/types/dto";

export interface RegisterRequest {
    fullName: string,
    email: string,
    password: string,
    role: UserRole,
    position: string,
    department: string
    externalProvider: string,
}
