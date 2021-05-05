import { Module } from '@nestjs/common';
import { FAVORITES_SERVICE, FavoritesServiceNY} from './favorites.service';

@Module({
  providers: [
    {
      provide: FAVORITES_SERVICE,
      useClass: FavoritesServiceNY,
    }
  ],
  exports: [FAVORITES_SERVICE],
})
export class FavoritesModule {}
