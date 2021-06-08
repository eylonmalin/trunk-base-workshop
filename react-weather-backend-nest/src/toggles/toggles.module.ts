import { Module } from '@nestjs/common';
import { TogglesService } from './toggles/toggles.service';

@Module({
  providers: [TogglesService],
  exports: [TogglesService]
})
export class TogglesModule {}
