import { WeatherService } from './weather.service';
import { HttpService } from '@nestjs/common';
import axios from 'axios';
import { FavoritesService } from '../favorites/favorites.service';
import { instance, mock, verify, when } from 'ts-mockito';

describe('WeatherService', () => {
  let service: WeatherService;
  let favoritesServiceMock: FavoritesService;

  beforeEach(async () => {
    favoritesServiceMock = mock(FavoritesService);
    service = new WeatherService(
      new HttpService(axios),
      instance(favoritesServiceMock),
    );
  });

  it('should get weather', async () => {
    await expect(service.getWeather('lod')).resolves.toHaveProperty('coord', {
      lon: 34.8953,
      lat: 31.9514,
    });
  });

  it('get weather should store last city', async () => {
    await expect(service.getWeather('lod'));
    verify(favoritesServiceMock.setLastCity('lod')).once();
  });

  it('should get weather of last city', async () => {
    await service.getWeather('lod');
    when(favoritesServiceMock.getLastCity()).thenReturn('lod');
    await expect(service.getWeather()).resolves.toHaveProperty('name', 'Lod');
  });

  it('should get forecast', async () => {
    await expect(service.getForcast('lod')).resolves.toHaveProperty(
      'city',
      expect.objectContaining({ name: 'Lod' }),
    );
  });

  it('get forecast should store last city', async () => {
    await expect(service.getForcast('lod'));
    verify(favoritesServiceMock.setLastCity('lod')).once();
  });

  it('should get forecast of last city', async () => {
    await service.getForcast('lod');
    when(favoritesServiceMock.getLastCity()).thenReturn('lod');
    await expect(service.getForcast()).resolves.toHaveProperty(
      'city',
      expect.objectContaining({ name: 'Lod' }),
    );
  });
});
