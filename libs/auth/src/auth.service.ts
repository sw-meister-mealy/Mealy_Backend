import { ConfigService } from '@app/config';
import { User, UserService } from '@app/user';
import { Inject, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import { TokenPayload } from './class/token-payload.class';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;
  private readonly secret: Buffer;

  constructor(config: ConfigService) {
    this.secret = config.jwtSecret ? Buffer.from(config.jwtSecret) : randomBytes(16);
  }

  public async getToken({ username, password }: {
    username: string;
    password: string;
  }): Promise<string> {
    const query = await this.userService.getUser({
      username: {
        $eq: username,
      },
    });

    if (!query) {
      return null;
    }

    if (!Buffer.from(query.password).compare(Buffer.from(password))) {
      return null;
    }

    return this.sign({
      id: query.studentId,
    });
  }

  public async auth(token: string): Promise<User> {
    const { id } = this.verify(token);

    return this.userService.getUser({
      studentId: {
        $eq: id,
      },
    });
  }

  private sign(user: TokenPayload): string {
    return sign(user, this.secret, {
      expiresIn: '1y',
      issuer: 'Mealy',
    });
  }

  private verify(token: string): TokenPayload {
    return verify(token, this.secret, {
      issuer: 'Mealy',
    }) as unknown as TokenPayload;
  }
}
