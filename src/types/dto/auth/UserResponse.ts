import {UserRole} from "@/types/dto/enums/UserRole";

export interface UserResponse {
    avatar?: string; // base64
    fullName: string;
    email: string;
    role: UserRole;
    departmentName: string;
    positionName: string;
}
