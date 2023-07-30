import { IBcryptService, ICompareSchema } from '@domain';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements IBcryptService {
  public async hash(raw: string) {
    const salt = await this.generateSalt();
    return bcrypt.hash(raw, salt);
  }

  private generateSalt() {
    const saltRound = 10;
    return bcrypt.genSalt(saltRound);
  }

  public compare({ raw, hash }: ICompareSchema): Promise<boolean> {
    return bcrypt.compare(raw, hash);
  }
}
