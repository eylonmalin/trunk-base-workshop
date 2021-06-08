import {Controller, Get, Query} from '@nestjs/common';
import {WeatherService} from "./weather/weather.service";
import {TogglesService} from "./toggles/toggles/toggles.service";

@Controller()
export class AppController {

  constructor(
      private readonly weatherService: WeatherService,
      private readonly togglesService: TogglesService
  ) {}

  @Get("/weather")
  async weather(@Query('city') city?:string): Promise<any> {
    return this.weatherService.getWeather(city);
  }

  @Get("/weatherByCoord")
  async weatherByCoord(@Query('lat') lat:number, @Query('lon') lon:number): Promise<any> {
    return this.weatherService.getWeatherByCoord(lat, lon);
  }

  @Get("/forecast")
  async forecast(@Query('city') city?:string): Promise<any> {
    return this.weatherService.getForecast(city);
  }

  @Get("/forecastByCoord")
  async forecastByCoord(@Query('lat') lat:number, @Query('lon') lon:number): Promise<any> {
    return this.weatherService.getForecast("Jerusalem");
  }

  @Get("/features")
  async features(): Promise<any> {
    return this.togglesService.getAllFeatures();
  }
}
