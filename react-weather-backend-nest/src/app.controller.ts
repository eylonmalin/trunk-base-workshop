import {Controller, Get, Query} from '@nestjs/common';
import {WeatherService} from "./weather/weather.service";

@Controller()
export class AppController {

  private lastCity: string = 'Arad,IL'

  constructor(private readonly weatherService: WeatherService) {}

  @Get("/weather")
  async weather(@Query('city') city?:string): Promise<any> {
    const actualCity = this.getAndStoreLastCity(city);
    return this.weatherService.getWeather(actualCity);
  }

  private getAndStoreLastCity(city: string) {
    const actualCity = city ?? this.lastCity;
    this.lastCity = actualCity;
    return actualCity;
  }

  @Get("/forecast")
  async forecast(@Query('city') city?:string): Promise<any> {
    const actualCity = this.getAndStoreLastCity(city);
    return this.weatherService.getForcast(actualCity);
  }
}
