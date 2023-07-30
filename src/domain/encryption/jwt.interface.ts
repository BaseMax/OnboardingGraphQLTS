import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  email: string;
}

export interface IJwtService {
  generateAccessToken: (data: IJwtPayload) => string;
  generateRefreshToken: (data: IJwtPayload) => string;
  generateAccessAndRefreshToken: (data: IJwtPayload) => {
    accessToken: string;
    refreshToken: string;
  };
  verifyAccessToken: (token: string) => string | JwtPayload;
  verifyRefreshToken: (token: string) => string | JwtPayload;
}
