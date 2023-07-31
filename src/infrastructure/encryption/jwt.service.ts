import { IJwtPayload, IJwtService } from '@domain';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { EnvironmentConfigService } from '../environment';
import { JwtService as JWT } from '@nestjs/jwt';

@Injectable()
export class JwtService implements IJwtService {
  constructor(
    private readonly configureService: EnvironmentConfigService,
    private readonly jwt: JWT,
  ) {}

  public generateAccessToken(data: IJwtPayload): Promise<string> {
    const accessTokenSecret = this.configureService.getJwtSecret();
    const accessTokenExpireIn = this.configureService.getJwtExpirationTime();
    return this.jwt.signAsync(data, {
      secret: accessTokenSecret,
      expiresIn: accessTokenExpireIn,
    });
  }

  public generateRefreshToken(data: IJwtPayload): Promise<string> {
    const refreshTokenSecret = this.configureService.getJwtRefreshSecret();
    const refreshTokenExpireIn =
      this.configureService.getJwtRefreshExpirationTime();
    return this.jwt.signAsync(data, {
      secret: refreshTokenSecret,
      expiresIn: refreshTokenExpireIn,
    });
  }

  public generateAccessAndRefreshToken(data: IJwtPayload) {
    const accessToken = this.generateAccessToken(data);
    const refreshToken = this.generateAccessToken(data);
    return { accessToken, refreshToken };
  }

  public verifyAccessToken(token: string): string | JwtPayload {
    const accessTokenSecret = this.configureService.getJwtSecret();
    return this.jwt.verifyAsync(token, { secret: accessTokenSecret });
  }

  public verifyRefreshToken(token: string): string | JwtPayload {
    const refreshTokenSecret = this.configureService.getJwtRefreshSecret();
    return this.jwt.verifyAsync(token, { secret: refreshTokenSecret });
  }

  public generateEmailToken(data: IJwtPayload) {
    const emailSecret = this.configureService.getEmailSecret();
    const emailTokenExpireIn = this.configureService.getEmailExpirationTime();

    return this.jwt.signAsync(data, {
      secret: emailSecret,
      expiresIn: emailTokenExpireIn,
    });
  }
  public verifyEmailToken(token) {
    const emailSecret = this.configureService.getEmailSecret();

    return this.jwt.verifyAsync(token, { secret: emailSecret });
  }
}
