import { Injectable } from '@nestjs/common';
import { config as conf } from 'dotenv';

@Injectable()
export class ConfigService {
  private env: Record<string, string> = {};

  constructor() {
    conf();
    this.env = {
      ...process.env,
    };
  }

  public get port(): string {
    return this.env.PORT || '3000';
  }

  public get host(): string {
    return this.env.HOST;
  }

  public get apm(): string {
    return this.env.ES_APM;
  }

  public get nodeEnv(): string {
    return this.env.NODE_ENV || 'development';
  }

  public get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }
}

export const config: ConfigService = new ConfigService();
