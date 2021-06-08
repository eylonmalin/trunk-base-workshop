import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WeatherModule } from './weather/weather.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TogglesModule } from './toggles/toggles.module';

@Module({
  imports: [WeatherModule, FavoritesModule, TogglesModule],
  controllers: [AppController],
})
export class AppModule {}
