import { JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  email: string;
}

export interface IJwtService {
  generateAccessToken: (data: IJwtPayload) => Promise<string>;
  generateRefreshToken: (data: IJwtPayload) => Promise<string>;
  generateAccessAndRefreshToken: (data: IJwtPayload) => {
    accessToken: Promise<string>;
    refreshToken: Promise<string>;
  };
  verifyAccessToken: (token: string) => string | JwtPayload;
  verifyRefreshToken: (token: string) => string | JwtPayload;
}
