import { ConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { MealService } from './meal.service';

describe('MealService', () => {
  let service: MealService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule],
      providers: [MealService, HttpService, {
        provide: 'AXIOS_INSTANCE_TOKEN',
        useValue: axios.create(),
      }],
    }).compile();

    service = module.get<MealService>(MealService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
