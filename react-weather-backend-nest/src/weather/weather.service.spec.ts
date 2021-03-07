import { WeatherService } from './weather.service';
import { HttpService } from '@nestjs/common';
import axios from 'axios';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    service = new WeatherService(new HttpService(axios));
  });

  it('should get weather', async () => {
    await expect(service.getWeather('lod')).resolves.toHaveProperty('coord', {
      lon: 34.8953,
      lat: 31.9514,
    });
  });

  it('should get weather of last city', async () => {
    const a = await service.getWeather('lod');
    await expect(service.getWeather()).resolves.toHaveProperty('name', 'Lod');
  });

  it('should get forcast', async () => {
    await expect(service.getForcast('lod')).resolves.toHaveProperty(
      'city',
      expect.objectContaining({ name: 'Lod' }),
    );
  });

  it('should get forcast of last city', async () => {
    service.getForcast('lod');
    await expect(service.getForcast()).resolves.toHaveProperty(
      'city',
      expect.objectContaining({ name: 'Lod' }),
    );
  });
});
