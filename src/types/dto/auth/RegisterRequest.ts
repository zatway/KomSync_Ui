import {UserRole} from "@/types/dto/enums/UserRole";

export interface RegisterRequest {
    fullName: string,
    email: string,
    password: string,
    role: UserRole,
    positionId: string,
    departmentId: string,
}
