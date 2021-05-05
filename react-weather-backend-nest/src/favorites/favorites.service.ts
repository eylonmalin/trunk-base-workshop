import {Injectable} from '@nestjs/common';

export const FAVORITES_SERVICE = 'FAVORITES_SERVICE';

export interface IFavoritesService {
  setLastCity(city: string): void;

  getLastCity(): any;
}

@Injectable()
export class FavoritesService implements IFavoritesService {
  private lastCity: string = 'Arad,IL';

  setLastCity(city: string) {
    this.lastCity = city;
  }

  getLastCity() {
    return this.lastCity;
  }
}

@Injectable()
export class FavoritesServiceNY implements IFavoritesService {
  setLastCity(city: string) {
  }

  getLastCity() {
    return 'New York'
  }
}
