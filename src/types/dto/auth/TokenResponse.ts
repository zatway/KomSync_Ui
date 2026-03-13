import {UserRole} from "@/types/dto/enums/UserRole";

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    role: UserRole;
    accessTokenExpiredAt: Date;
    refreshTokenExpiredAt: Date;
    userId: string;
}
