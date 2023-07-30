import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendEmail(_email: string) {
    // FIXME: sending mail should implement - good provider needed
    return true;
  }
}
