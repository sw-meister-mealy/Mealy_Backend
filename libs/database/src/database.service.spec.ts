import { ConfigModule, ConfigService } from '@app/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [{
        inject: [ConfigService],
        provide: DatabaseService,
        useFactory(config: ConfigService) {
          return new DatabaseService(config.mongodbURI).connect();
        },
      }],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await service.close();
  });
});
