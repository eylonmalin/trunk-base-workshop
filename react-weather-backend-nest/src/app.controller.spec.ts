import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

describe('AppController', () => {
  let weatherApp: INestApplication;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    weatherApp = app.createNestApplication();
    await weatherApp.init();
  });

  describe('root', () => {
    function commonAssertForWeather(res: request.Response) {
      expect(res.body).toHaveProperty('clouds');
      expect(res.body).toHaveProperty('coord');
      expect(res.body).toHaveProperty('weather');
    }

    it('/weather (GET) with city', async () => {
      //when
      const res: request.Response = await request(
        weatherApp.getHttpServer(),
      ).get(`/weather?city=Lod`);

      //then
      commonAssertForWeather(res);
    });

    it('/weather (GET) without city use New York', async () => {
      //given
      await request(weatherApp.getHttpServer()).get(`/weather?city=Lod`);

      //when
      const res: request.Response = await request(
        weatherApp.getHttpServer(),
      ).get(`/weather`);

      //then
      commonAssertForWeather(res);
      expect(res.body.name).toEqual('New York');
    });

    it('/weather (GET) without last city use default city New York', async () => {
      //when
      const res: request.Response = await request(
          weatherApp.getHttpServer(),
      ).get(`/weather`);

      expect(res.body.name).toEqual('New York');
      expect(res.body.coord).toEqual({ lon: -74.006, lat: 40.7143 });
    });

    it('/weatherByCoord (GET) with lat 31.771959 lon 35.217018 return Jerusalem', async () => {
      //when
      const res: request.Response = await request(
          weatherApp.getHttpServer(),
      ).get(`/weatherByCoord?lat=31.771959&lon=35.217018`);

      //then
      expect(res.body.name).toEqual('Jerusalem');
    });

    function commonAssertForForecast(res: request.Response) {
      expect(res.body).toHaveProperty('city');
      expect(res.body).toHaveProperty('list');
      expect(res.body).toHaveProperty('cod');
    }

    it('/forecast (GET) with city=Lod', async () => {
      //when
      const res: request.Response = await request(
        weatherApp.getHttpServer(),
      ).get(`/forecast?city=Lod`);

      //then
      commonAssertForForecast(res);
    });

    it('/forecast (GET) without city use New York', async () => {
      //given
      await request(weatherApp.getHttpServer()).get(`/forecast?city=Lod`);

      //when
      const res: request.Response = await request(
        weatherApp.getHttpServer(),
      ).get(`/forecast`);

      //then
      commonAssertForForecast(res);
      expect(res.body.city.name).toEqual('New York');
    });

    it('/forecast (GET) without last city use default city New York', async () => {
      //when
      const res: request.Response = await request(
          weatherApp.getHttpServer(),
      ).get(`/forecast`);

      expect(res.body.city.name).toEqual('New York');
      expect(res.body.city.country).toEqual('US');
    });

    it('/forecastByCoord (GET) with lat 31.771959 lon 35.217018 return Jerusalem', async () => {
      //when
      const res: request.Response = await request(
          weatherApp.getHttpServer(),
      ).get(`/forecastByCoord?lat=31.771959&lon=35.217018`);

      //then
      commonAssertForForecast(res);
      expect(res.body.city.name).toEqual('Jerusalem');
    });
  });
});
