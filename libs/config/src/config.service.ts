import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private env: Record<string, string> = {};

  constructor() {
    this.env = process.env;
  }

  public get port(): string {
    return this.env.PORT || '3000';
  }

  public get host(): string {
    return this.env.HOST;
  }
}

export const config: ConfigService = new ConfigService();
