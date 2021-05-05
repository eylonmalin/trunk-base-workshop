import {FavoritesService, FavoritesServiceNY} from './favorites.service';

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

describe('FavoritesServiceNY', () => {
    const NY = 'New York';
    let service: FavoritesServiceNY;

    beforeEach(async () => {
        service = new FavoritesServiceNY();
    });

    it.each([['Jerusalem'], ['Eilat']])(
        'should return always New York',
        (city: string) => {
            service.setLastCity(city);
            expect(service.getLastCity()).toEqual(NY);
        },
    );

    it('should return default city - New York', () => {
        expect(service.getLastCity()).toEqual(NY);
    });
});

