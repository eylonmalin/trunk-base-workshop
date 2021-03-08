import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(async () => {
    service = new FavoritesService();
  });

  it.each([['Jerusalem'], ['Eilat']])(
    'should return last city',
    (city: string) => {
      service.setLastCity(city);
      expect(service.getLastCity()).toEqual(city);
    },
  );

  it('should return default city - Arad', () => {
    expect(service.getLastCity()).toEqual('Arad,IL');
  });
});
