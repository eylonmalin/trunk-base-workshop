import { HttpModule, Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [HttpModule, FavoritesModule],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
