export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredAt: Date;
    refreshTokenExpiredAt: Date;
}
