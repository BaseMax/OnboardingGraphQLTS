import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyToken(token);
  }
}
