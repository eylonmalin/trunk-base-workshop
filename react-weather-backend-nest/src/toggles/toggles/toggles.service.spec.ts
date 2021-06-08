import { Test, TestingModule } from '@nestjs/testing';
import { TogglesService } from './toggles.service';

describe('TogglesService', () => {
  let service: TogglesService;

  beforeEach(async () => {
    service = new TogglesService();
  });

  it('should get features from unleash', () => {
    expect(service.getAllFeatures()).toEqual(
        expect.objectContaining({
          'tbw-true': true,
          'tbw-false': false
        }));
  });
});
