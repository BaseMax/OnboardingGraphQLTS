import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment';

@Injectable()
export class EmailService {
  constructor(
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}
  async sendVerifyEmail(_email: string, token: string) {
    // FIXME: sending mail should implement - good provider needed
    const domain = this.environmentConfigService.getAppDomain();
    const _url = `${domain}/verify-email/${token}`;
    return true;
  }
}
