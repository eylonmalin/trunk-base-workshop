import {TogglesService} from './toggles.service';
import {HttpService} from "@nestjs/common";
import axios from "axios";

describe('TogglesService', () => {
  let service: TogglesService;

  beforeEach(async () => {
    service = new TogglesService(new HttpService(axios),);
  });

  it('should get features from unleash', async () => {
    const result = await service.getAllFeatures();
    expect(result).toEqual(
        expect.objectContaining({
          'tbw-true': true,
          'tbw-false': false,
        }));
  });
});
