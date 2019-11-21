import { ConfigService } from '@app/config';
import { DatabaseService } from '@app/database';
import { Meal, MealTime } from '@app/meal';
import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Collection } from 'mongodb';
import { MealCrawlEnum } from './enum/meal-crawl.enum';

@Injectable()
export class MealService {
  private readonly meals: Collection<Meal>;
  private readonly neisKey: string;

  constructor(database: DatabaseService, config: ConfigService, private readonly httpService: HttpService) {
    this.meals = database.collection('meals');
    this.neisKey = config.neisKey;
  }

  public async getMeal(year: number, month: number, day?: number): Promise<Meal[]> {
    return (await this.getMonth(year, month)).sort((a, b) => a.day - b.day).filter((i) => !day || i.day === day);
  }

  private async getMealDataFromNeis(data: {
    ATPT_OFCDC_SC_CODE: string;
    SD_SCHUL_CODE: string;
    MMEAL_SC_CODE?: string;
    MLSV_YMD?: string;
    MLSV_FROM_YMD?: string;
    MLSV_TO_YMD?: string;
  }): Promise<Array<{
    MLSV_YMD: string;
    MMEAL_SC_CODE: string;
    MMEAL_SC_NM: MealCrawlEnum;
    DDISH_NM: string;
  }>> {
    const baseURL = 'https://open.neis.go.kr/hub/mealServiceDietInfo';
    let options = `&KEY=${this.neisKey}`;

    for (const i of Object.keys(data)) {
      options += `&${i}=${data[i]}`;
    }

    const payload = (await this.httpService.get(`${baseURL}?Type=json${options}`, {
      responseType: 'json',
    }).toPromise()).data;

    if (!payload.mealServiceDietInfo) {
      throw new InternalServerErrorException('Meal Fetch Failed');
    }

    return payload.mealServiceDietInfo[1].row;
  }

  private async getMonth(year: number, month: number): Promise<Meal[]> {
    const mealData: Meal[] = (await this.getMealDataFromNeis({
      ATPT_OFCDC_SC_CODE: 'G10',
      MLSV_YMD: `${year}${month}`,
      SD_SCHUL_CODE: '7430310',
    })).map<Meal>((i) => {
      return {
        day: parseInt(i.MLSV_YMD.substr(6, 2), 10),
        menu: i.DDISH_NM.split(/<br\/>/).map((j) => j.replace(/[*\d.]+/, '')),
        month: parseInt(i.MLSV_YMD.substr(4, 2), 10),
        time: (() => {
          switch (i.MMEAL_SC_CODE) {
            case '1':
              return MealTime.breakfast;
            case '2':
              return MealTime.lunch;
            case '3':
              return MealTime.dinner;
          }
        })(),
        year: parseInt(i.MLSV_YMD.substr(0, 4), 10),
      };
    });
    return mealData.map((i) => new Meal(i));
  }
}
