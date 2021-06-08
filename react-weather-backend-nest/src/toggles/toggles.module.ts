import {HttpModule, Module} from '@nestjs/common';
import {TogglesService} from './toggles/toggles.service';

@Module({
  imports: [HttpModule],
  providers: [TogglesService],
  exports: [TogglesService]
})
export class TogglesModule {}
