import { Module } from '@nestjs/common';
import {IFavoritesService, FavoritesService, FAVORITES_SERVICE} from './favorites.service';

@Module({
  providers: [
    {
      provide: FAVORITES_SERVICE,
      useClass: FavoritesService,
    }
  ],
  exports: [FAVORITES_SERVICE],
})
export class FavoritesModule {}
