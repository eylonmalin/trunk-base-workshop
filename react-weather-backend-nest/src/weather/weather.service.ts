import {HttpService, Injectable, Query} from '@nestjs/common';
import appConfig from '../config';
import { secrets } from '../secrets';
import { AxiosRequestConfig } from 'axios';
import { FavoritesService } from '../favorites/favorites.service';
import {createRequestConfigWithProxy} from "../utils/proxy";


@Injectable()
export class WeatherService {
  private requestConfig: AxiosRequestConfig;

  constructor(
      private httpService: HttpService,
      private favoritesService: FavoritesService,
    ) {
    this.requestConfig = createRequestConfigWithProxy();
  }

  async getWeather(city? : string): Promise<any> {
    city = this.getAndStoreLastCity(city);
    const url = `${appConfig.weatherUrl}?q=${city}`;
    return await this.httpGet(url);
  }


  async getWeatherByCoord(lat:number, lon:number) {
    const url = `${appConfig.weatherUrl}?lat=${lat}&lon=${lon}`;
    return await this.httpGet(url);
  }

  async getForecast(city? : string): Promise<any> {
    city = this.getAndStoreLastCity(city);
    const url = `${appConfig.forecastUrl}?q=${city}`;
    return await this.httpGet(url);
  }

  async getForecastByCoord(lat: number, lon: number) {
    const url = `${appConfig.forecastUrl}?lat=${lat}&lon=${lon}`;
    return await this.httpGet(url);
  }

  private getAndStoreLastCity(city?: string) {
    if (city) {
      this.favoritesService.setLastCity(city);
      return city;
    } else {
      return this.favoritesService.getLastCity();
    }
  }

  private async httpGet(url: string): Promise<any> {
    const result = await this.httpService
        .get(`${url}${this.unitsAndAppPostfix()}`, this.requestConfig)
        .toPromise();
    return result.data;
  }

  private unitsAndAppPostfix() {
    return `&units=metric&APPID=${secrets.appId}`;
  }


}
